import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import JobListApplicantLayout from "../../components/templates/JobListApplicantLayout/JobListApplicantLayout";
import JobListAdminLayout from "../../components/templates/JobListAdminLayout/JobListAdminLayout";
import ProtectedRoute from "../api/auth/ProtectedRoute";

type UserRole = "admin" | "applicant";

const JobListPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { userRole, isLoading } = useMemo(() => {
        if (status === "loading") {
            return { userRole: undefined, isLoading: true };
        }

        if (status === "unauthenticated") {
            return { userRole: undefined, isLoading: false };
        }

        const role = session?.user?.role as UserRole | undefined;
        return {
            userRole:
                role === "admin" || role === "applicant" ? role : undefined,
            isLoading: false,
        };
    }, [status, session]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userRole) {
        return <div>Unauthorized access</div>;
    }

    return (
        <ProtectedRoute requiredRole={userRole}>
            {userRole === "admin" ? (
                <JobListAdminLayout />
            ) : (
                <JobListApplicantLayout />
            )}
        </ProtectedRoute>
    );
};

export default JobListPage;
