import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/global.css";
import { useEffect } from "react";
import { useAuthStore } from "../src/store/authStore";
import { authService } from "../utils/auth/auth";
import ToastProvider from "../components/atoms/Toast/Toast";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        checkAuth();

        const {
            data: { subscription },
        } = authService.onAuthChange((user) => {
            setUser(user);
        });

        return () => subscription.unsubscribe();
    }, [checkAuth, setUser]);

    return (
        <>
            <Component {...pageProps} />;
            <ToastProvider />
        </>
    );
}

export default MyApp;
