import { AuthProvider } from "../context/AuthContext";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/global.css";
import { ToastProvider } from "../components/atoms/Toast/Toast";
import { useAuthStore } from "../src/store/authStore";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Session } from "next-auth";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        checkAuth();
    }, [checkAuth, setUser]);

    return (
        <SessionProvider session={session}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
            <ToastProvider />
        </SessionProvider>
    );
}

export default MyApp;
