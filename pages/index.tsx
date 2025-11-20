import { useRouter } from "next/router";
import { Logo } from "../components/atoms/Logo/Logo";
import { Button } from "../components/atoms/Button/Button";

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="flex justify-center">
                        <Logo />
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Lunar Eclipse
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Your job application tracking system
                    </p>

                    <div className="mt-8 space-y-4">
                        <Button
                            onClick={() => router.push("/login")}
                            className="w-full"
                            type="primary"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => router.push("/register")}
                            className="w-full"
                            type="secondary"
                        >
                            Create Account
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
