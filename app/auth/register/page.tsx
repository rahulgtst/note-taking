"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export function verifyEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export default function SignUpPage() {
    const router = useRouter();
    const [formState, setFormState] = useState<{
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    }>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);

    function handleUpdate(payload: Record<string, string>) {
        setFormState((prev) => ({ ...prev, ...payload }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (verifyEmail(formState.email) === false) {
            setError("Invalid email address. Please check your email");
            return;
        }
        if (formState.password !== formState.confirmPassword) {
            setError("Passwords are not matching. Please check.");
            return;
        }
        try {
            await api.post("/auth/signup", {
                username: formState.username,
                email: formState.email,
                password: formState.password,
            });
            router.push("/signin");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

                {error && (
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        value={formState.username}
                        onChange={(e) => handleUpdate({ username: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => handleUpdate({ email: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={formState.password}
                        onChange={(e) => handleUpdate({ password: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={formState.confirmPassword}
                        onChange={(e) => handleUpdate({ confirmPassword: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
                >
                    Create Account
                </button>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
