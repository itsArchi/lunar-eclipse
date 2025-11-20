import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/global.css";
import { ToastProvider } from "../components/atoms/Toast/Toast";
import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastProvider />
        </AuthProvider>
    );
}

export default MyApp;
