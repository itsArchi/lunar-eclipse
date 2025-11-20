import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type UserRole = "admin" | "applicant";

export default function ProtectedRoute({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: UserRole;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated" && requiredRole) {
            const userRole = session.user?.role as UserRole;
            if (userRole !== requiredRole) {
                router.push("/unauthorized");
            }
        }
    }, [session, status, router, requiredRole]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null;
    }

    const userRole = session.user?.role as UserRole;

    if (requiredRole && userRole !== requiredRole) {
        return <div>Unauthorized</div>;
    }

    return <>{children}</>;
}
