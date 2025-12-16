// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			username: string;
			role: string;
		};
	}

	interface User {
		id: string;
		username: string;
		role: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role: string;
	}
}
