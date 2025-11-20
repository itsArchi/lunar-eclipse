import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import JobListApplicantLayout from "../../components/templates/JobListApplicantLayout/JobListApplicantLayout";
import JobListAdminLayout from "../../components/templates/JobListAdminLayout/JobListAdminLayout";

type UserRole = "admin" | "applicant";

const JobListPage = () => {
    const router = useRouter();

    const { user, isAuthenticated, isLoading } = useAuthStore((s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        isLoading: s.isLoading,
    }));

    const { userRole, loading } = useMemo(() => {
        if (isLoading) {
            return { userRole: undefined, loading: true };
        }

        if (!isAuthenticated) {
            return { userRole: undefined, loading: false };
        }

        const role = user?.role as UserRole | undefined;
        return {
            userRole:
                role === "admin" || role === "applicant" ? role : undefined,
            loading: false,
        };
    }, [isLoading, isAuthenticated, user]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userRole) {
        return <div>Unauthorized access</div>;
    }

    return userRole === "admin" ? (
        <JobListAdminLayout />
    ) : (
        <JobListApplicantLayout />
    );
};

export default JobListPage;
