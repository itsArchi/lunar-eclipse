import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type UserRole = "admin" | "applicant";

export default function ProtectedRoute({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: UserRole;
}) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        if (
            !isLoading &&
            isAuthenticated &&
            requiredRole &&
            user?.role !== requiredRole
        ) {
            router.push("/unauthorized");
        }
    }, [isAuthenticated, isLoading, router, requiredRole, user?.role]);

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) return null;
    if (requiredRole && user?.role !== requiredRole)
        return <div>Unauthorized</div>;
    return <>{children}</>;
}
