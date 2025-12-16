// proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
	const session = await auth();
	const { pathname } = req.nextUrl;

	// Public routes
	const publicRoutes = ["/login"];

	// Allow public routes
	if (publicRoutes.includes(pathname)) {
		// If already logged in, redirect away from login
		if (session) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}
		return NextResponse.next();
	}

	// Block ALL other routes if not authenticated
	if (!session) {
		const loginUrl = new URL("/login", req.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Protect everything except:
		 * - /login
		 * - next internals
		 * - static files
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
