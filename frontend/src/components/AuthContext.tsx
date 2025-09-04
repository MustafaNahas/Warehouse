import React, { createContext, useContext, useEffect, useState,useMemo  } from "react";
import axios from "axios";

const API_AUTH_STATUS = "/api/auth/status";

interface AuthUser {
    login: string;
    avatarUrl?: string;
    email?: string;
    htmlUrl?: string;
}

interface AuthContextProps {
    user: AuthUser | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const value = useMemo(() => ({ user, loading, setUser }), [user, loading]);
    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const res = await axios.get(API_AUTH_STATUS, { withCredentials: true });
                if (active && res.data?.authenticated) setUser(res.data.user);
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
