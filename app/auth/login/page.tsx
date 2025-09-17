"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.post("/auth/login", {
                user_email: email,
                password,
            });
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>

                {error && (
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <a href="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
