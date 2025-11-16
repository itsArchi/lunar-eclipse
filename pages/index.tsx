import React from "react";
import { useRouter } from "next/router";

interface MainProps {
    children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Lunar Eclipse
                            </h1>
                        </div>
                        <nav className="flex space-x-4">
                            <>
                                <button
                                    onClick={() => router.push("/jobs")}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Jobs
                                </button>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Register
                                </button>
                            </>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome to Lunar Eclipse
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Your job application tracking system
                            </p>
                            <div className="space-x-4">
                                <button
                                    onClick={() => router.push("/login")}
                                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md text-lg font-medium"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-500 text-sm">
                        © 2024 Lunar Eclipse. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default function HomePage() {
    return <Main />;
}
