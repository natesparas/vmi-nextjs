// lib/authOptions.ts
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) return null;

				// Simulate user lookup (replace with DB)
				const user = {
					id: "1",
					username: "admin",
					password: "admin",
					role: "admin",
				};

				if (
					credentials.username === user.username &&
					credentials.password === user.password
				) {
					return { id: user.id, username: user.username, role: user.role };
				}
				return null;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		session({ session, token }) {
			session.user.id = token.sub as string;
			session.user.role = token.role as string;
			return session;
		},
	},
	pages: {
		signIn: "/login", // custom login page
	},
};
