"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Lock, LogOut, Menu, X } from "lucide-react";

type TopNavbarProps = {
	user?: {
		id?: string | null;
		name?: string | null;
		username?: string | null;
		role?: string;
	};
};

const TopNavbar: FC<TopNavbarProps> = ({ user }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const userFullName = user?.name || user?.username || "User";

	const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

	const handleLogout = async () => {
		await signOut({
			redirect: true,
			callbackUrl: "/login",
		});
	};

	return (
		<header className="w-full bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center relative">
			{/* Left: Logo */}
			<div className="flex items-center space-x-3 h-full">
				<img
					src="/topnavbar-logo.jpg"
					alt="Company Logo"
					className="h-12.5 w-auto object-contain"
				/>
				<span className="text-lg">VMI Medical Clinic</span>
			</div>

			{/* Desktop */}
			<div className="hidden md:flex items-center space-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="p-0 outline-none focus:ring-0">
							<Avatar className="h-10 w-10">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt={userFullName}
								/>
								<AvatarFallback>
									{userFullName
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" className="w-64 p-1">
						{/* User Info */}
						<DropdownMenuItem className="p-3 cursor-default border-b">
							<User className="mr-3 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">{userFullName}</p>
								<p className="text-xs text-muted-foreground">
									{user?.role ?? "User"}
								</p>
							</div>
						</DropdownMenuItem>

						{/* Change password */}
						<DropdownMenuItem className="p-3 border-b cursor-pointer">
							<Lock className="mr-3 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Change Password</p>
								<p className="text-xs text-muted-foreground">
									Update your account password
								</p>
							</div>
						</DropdownMenuItem>

						{/* Logout */}
						<DropdownMenuItem
							className="p-3 cursor-pointer text-red-600"
							onClick={handleLogout}
						>
							<LogOut className="mr-3 h-5 w-5" />
							<div>
								<p className="font-medium">Sign out</p>
								<p className="text-xs text-red-400">Log out of your account</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Mobile Hamburger */}
			<Button
				variant="ghost"
				className="md:hidden p-2"
				onClick={toggleMobileMenu}
			>
				{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</Button>

			{/* Mobile Menu */}
			{mobileOpen && (
				<div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
					<nav className="flex flex-col p-4 space-y-3">
						<span className="font-bold">{userFullName}</span>

						<button className="flex items-center space-x-2">
							<Lock className="h-4 w-4" />
							<span>Change Password</span>
						</button>

						<button
							className="flex items-center space-x-2 text-red-600"
							onClick={handleLogout}
						>
							<LogOut className="h-4 w-4" />
							<span>Logout</span>
						</button>
					</nav>
				</div>
			)}
		</header>
	);
};

export default TopNavbar;
