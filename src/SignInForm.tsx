"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { GitLogin } from "./GitHubButton";

export function SignInForm() {

  return (
    <div className="h-full w-full">
      <GitLogin />
    </div>
  );
}