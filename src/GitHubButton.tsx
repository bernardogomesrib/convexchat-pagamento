import { useAuthActions } from "@convex-dev/auth/react";
import React from "react";

export function GitLogin() {
    const { signIn } = useAuthActions();
    return (
        <button className="auth-button" onClick={() => void signIn("google")}>Login com Google</button>
    );
}