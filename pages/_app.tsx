import type { AppProps } from "next/app";
import "../styles/global.css";
import { useEffect } from "react";
import { useAuthStore } from "../src/store/authStore";
import { authService } from "../utils/auth/auth";

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

    return <Component {...pageProps} />;
}

export default MyApp;
