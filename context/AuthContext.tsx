import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    name: string;
    role: "admin" | "applicant";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email: string, password: string) => {
        // Simple demo login - replace with your actual login logic
        if (email === "demo@example.com" && password === "password") {
            const demoUser = {
                id: "demo-user-123",
                email: "demo@example.com",
                name: "Demo User",
                role: "applicant" as const,
            };
            setUser(demoUser);
            return true;
        }
        return false;
    };

    const logout = async () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
