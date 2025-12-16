"use client";

import logo from "@/public/topnavbar-logo.jpg";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get("callbackUrl") || "/dashboard";

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// Call NextAuth signIn
		const res = await signIn("credentials", {
			redirect: false, // manual redirect
			username,
			password,
		});

		if (res?.error) {
			setError("Invalid username or password");
			setLoading(false);
			return;
		}

		// Success → redirect to callbackUrl
		router.push(callbackUrl);
	};

	return (
		<Card className="w-full max-w-md shadow-lg">
			<CardHeader className="text-center space-y-4">
				<div className="flex justify-center">
					<Image
						src={logo}
						alt="vmi-logo"
						width={100}
						height={100}
						className="object-contain"
					/>
				</div>
				<CardTitle className="text-2xl">VMI Medical Clinic</CardTitle>
				<CardDescription>Sign in to your account</CardDescription>
				{error && <p className="text-red-500">{error}</p>}
			</CardHeader>

			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-1">
						<Label htmlFor="email">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Login"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
