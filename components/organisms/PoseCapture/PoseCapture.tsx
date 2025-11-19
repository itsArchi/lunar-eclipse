import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

interface Props {
    requiredPoses?: ("one" | "two")[];
    countdownSeconds?: number;
    onCapture?: (dataUrl: string) => void;
}

type Landmark = { x: number; y: number; z?: number };

export default function PoseCapture({
    requiredPoses = ["one", "two"],
    countdownSeconds = 3,
    onCapture,
}: Props) {
    const webcamRef = useRef<Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isCameraReady, setIsCameraReady] = useState(false);
    const [faceDetected, setFaceDetected] = useState(false);
    const [currentPose, setCurrentPose] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState("Waiting for face...");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [poseIndex, setPoseIndex] = useState(0);
    const [mpReady, setMpReady] = useState(false);

    const getVideoElement = (): HTMLVideoElement | null =>
        webcamRef.current
            ? ((webcamRef.current as any).video as HTMLVideoElement)
            : null;

    function countExtendedFingers(landmarks: Landmark[]) {
        if (!landmarks || landmarks.length < 21) return 0;
        let extended = 0;
        const tips = [4, 8, 12, 16, 20];
        const pips = [3, 6, 10, 14, 18];
        for (let i = 0; i < tips.length; i++) {
            const tip = landmarks[tips[i]];
            const pip = landmarks[pips[i]];
            if (tip && pip && tip.y < pip.y) extended++;
        }
        return extended;
    }

    const toCanvas = (landmark: Landmark, width: number, height: number) => {
        return { x: landmark.x * width, y: landmark.y * height };
    };

    const drawConnectors = (
        ctx: CanvasRenderingContext2D,
        landmarks: Landmark[],
        connections: Array<[number, number]>,
        style?: { lineWidth?: number }
    ) => {
        ctx.save();
        ctx.lineWidth = style?.lineWidth ?? 2;
        ctx.strokeStyle = "#00FF00";
        for (const [i, j] of connections) {
            const a = landmarks[i];
            const b = landmarks[j];
            if (!a || !b) continue;
            const pa = toCanvas(a, ctx.canvas.width, ctx.canvas.height);
            const pb = toCanvas(b, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
        }
        ctx.restore();
    };

    const drawLandmarks = (
        ctx: CanvasRenderingContext2D,
        landmarks: Landmark[],
        style?: { radius?: number; lineWidth?: number }
    ) => {
        ctx.save();
        const r = style?.radius ?? 4;
        ctx.fillStyle = "#FF0000";
        ctx.lineWidth = style?.lineWidth ?? 1;
        for (const lm of landmarks) {
            const p = toCanvas(lm, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    };

    const loadScript = (src: string) =>
        new Promise<void>((resolve, reject) => {
            if (typeof window === "undefined") return reject("no window");
            if (document.querySelector(`script[src="${src}"]`))
                return resolve();
            const s = document.createElement("script");
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = (e) => reject(e);
            document.head.appendChild(s);
        });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const base = "https://cdn.jsdelivr.net/npm";
        const scripts = [
            `${base}/@mediapipe/hands/hands.js`,
            `${base}/@mediapipe/face_detection/face_detection.js`,
            `${base}/@mediapipe/camera_utils/camera_utils.js`,
        ];

        let cancelled = false;
        Promise.all(scripts.map(loadScript))
            .then(() => {
                if (!cancelled) setMpReady(true);
            })
            .catch((err) => {
                console.error("Failed to load mediapipe scripts:", err);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!mpReady) return;

        let camera: any = null;
        const video = getVideoElement();
        const canvas = canvasRef.current!;
        const ctx = canvas?.getContext("2d");
        if (!video || !canvas || !ctx) return;

        const fitToVideo = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };

        const HandsClass = (window as any).Hands;
        const FaceDetectionClass = (window as any).FaceDetection;
        const CameraClass = (window as any).Camera;
        const HAND_CONNECTIONS = (window as any).HAND_CONNECTIONS;

        if (!HandsClass || !FaceDetectionClass || !CameraClass) {
            console.error("Mediapipe globals missing:", {
                HandsClass,
                FaceDetectionClass,
                CameraClass,
            });
            return;
        }

        const faceDetector = new FaceDetectionClass({
            locateFile: (file: string) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetector.setOptions({
            model: "short",
            minDetectionConfidence: 0.6,
        });

        faceDetector.onResults((faceResults: any) => {
            if (faceResults.detections && faceResults.detections.length > 0) {
                setFaceDetected(true);
            } else {
                setFaceDetected(false);
                setStatusMessage("Face not detected");
                setCurrentPose(null);
                setCountdown(null);
            }
        });

        const hands = new HandsClass({
            locateFile: (file: string) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 2,
            minDetectionConfidence: 0.6,
            minTrackingConfidence: 0.5,
        });

        hands.onResults((handsResults: any) => {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (
                handsResults.multiHandLandmarks &&
                handsResults.multiHandLandmarks.length
            ) {
                for (const handLandmarks of handsResults.multiHandLandmarks) {
                    const landmarks = handLandmarks as Landmark[];

                    drawConnectors(
                        ctx,
                        landmarks,
                        HAND_CONNECTIONS as Array<[number, number]>,
                        { lineWidth: 2 }
                    );
                    drawLandmarks(ctx, landmarks, { radius: 3, lineWidth: 1 });

                    const extended = countExtendedFingers(landmarks);
                    if (extended === 1) {
                        setCurrentPose("one");
                        setStatusMessage("Detected: 1 finger");
                    } else if (extended === 2) {
                        setCurrentPose("two");
                        setStatusMessage("Detected: 2 fingers");
                    } else {
                        setCurrentPose(null);
                        setStatusMessage("Pose not matched");
                        setCountdown(null);
                    }
                }
            } else {
                setCurrentPose(null);
                setStatusMessage("No hand detected");
                setCountdown(null);
            }

            ctx.restore();
        });

        camera = new CameraClass(video, {
            onFrame: async () => {
                try {
                    await faceDetector.send({ image: video });
                    await hands.send({ image: video });
                } catch (err) {}
            },
            width: 640,
            height: 480,
        });

        camera.start().then(() => {
            fitToVideo();
            setIsCameraReady(true);
            setStatusMessage("Camera ready - please show your face");
        });

        return () => {
            camera?.stop?.();
            hands?.close?.();
            faceDetector?.close?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mpReady, webcamRef.current]);

    useEffect(() => {
        if (!faceDetected) return;
        const expected = requiredPoses[poseIndex];
        if (currentPose === expected) {
            if (countdown === null && !isCapturing) {
                setCountdown(countdownSeconds);
                setStatusMessage(
                    `Hold pose: capturing in ${countdownSeconds}s`
                );
            }
        } else {
            if (countdown !== null) setCountdown(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faceDetected, currentPose, poseIndex]);

    useEffect(() => {
        if (countdown === null) return;
        if (countdown <= 0) return;
        const timer = setTimeout(() => {
            if (countdown > 1) setCountdown((c) => (c ? c - 1 : null));
            else {
                setCountdown(0);
                setIsCapturing(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (!isCapturing) return;
        const takeScreenshot = () => {
            const screenshot = webcamRef.current?.getScreenshot();
            if (screenshot) onCapture?.(screenshot);
        };

        setTimeout(() => {
            takeScreenshot();

            const nextIndex = poseIndex + 1;
            if (nextIndex < requiredPoses.length) {
                setPoseIndex(nextIndex);
                setStatusMessage(
                    `Now: please do pose ${requiredPoses[nextIndex]}`
                );
            } else {
                setStatusMessage("All poses captured");
            }

            setIsCapturing(false);
            setCountdown(null);
            setCurrentPose(null);
        }, 300);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCapturing]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative bg-black/10 rounded-md overflow-hidden">
                <Webcam
                    audio={false}
                    mirrored
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full"
                    videoConstraints={{
                        facingMode: "user",
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className="mt-3">
                <div className="flex items-center gap-3">
                    <div>
                        <strong>Status:</strong> {statusMessage}
                    </div>
                    <div>
                        <strong>Face:</strong>{" "}
                        <span
                            className={
                                faceDetected ? "text-green-600" : "text-red-600"
                            }
                        >
                            {faceDetected ? "Detected" : "Not detected"}
                        </span>
                    </div>
                    <div>
                        <strong>Pose:</strong>{" "}
                        <span
                            className={
                                currentPose ? "text-green-600" : "text-gray-600"
                            }
                        >
                            {currentPose ?? "-"}
                        </span>
                    </div>
                </div>

                <div className="mt-2">
                    {countdown !== null && countdown > 0 && (
                        <div className="text-3xl font-bold text-center">
                            {countdown}
                        </div>
                    )}
                    {isCapturing && (
                        <div className="text-xl text-center">Capturing...</div>
                    )}
                </div>

                <div className="mt-3 flex gap-2">
                    <button
                        className="px-3 py-2 bg-slate-700 text-white rounded"
                        onClick={() => {
                            setPoseIndex(0);
                            setCountdown(null);
                            setIsCapturing(false);
                            setStatusMessage("Restarted - show your face");
                        }}
                    >
                        Restart
                    </button>

                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                            const screenshot =
                                webcamRef.current?.getScreenshot();
                            if (screenshot) onCapture?.(screenshot);
                        }}
                    >
                        Manual Capture
                    </button>
                </div>
            </div>
        </div>
    );
}
