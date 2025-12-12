"use client";

import { FC, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Lock, LogOut, Menu, X } from "lucide-react";

const TopNavbar: FC = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const userFullName = "John Doe";

	const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

	return (
		<header className="w-full bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center relative">
			{/* Left Side: Logo + Company Name */}
			<div className="flex items-center space-x-3 h-full">
				<img src="/topnavbar-logo.jpg" alt="Company Logo" className="h-12.5 w-auto object-contain" />
				<span className="text-lg">VMI Medical Clinic</span>
			</div>

			{/* Desktop Menu + Avatar */}
			<div className="hidden md:flex items-center space-x-4">
				{/* Add additional nav links here if needed */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="p-0 outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
							<Avatar className="h-10 w-10">
								<AvatarImage src="https://github.com/shadcn.png" alt={userFullName} />
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
						<DropdownMenuItem className="p-3 rounded-none border-b hover:bg-muted/50 cursor-default">
							<User className="mr-3 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">{userFullName}</p>
								<p className="text-xs text-muted-foreground">Administrator</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem className="p-3 rounded-none border-b hover:bg-muted/50 cursor-pointer">
							<Lock className="mr-3 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Change Password</p>
								<p className="text-xs text-muted-foreground">Update your account password</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem className="p-3 rounded-none hover:bg-muted/50 cursor-pointer text-red-600">
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

			{/* Mobile Sidebar */}
			{mobileOpen && (
				<div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden">
					<nav className="flex flex-col p-4 space-y-2">
						<span className="font-bold">{userFullName}</span>
						<button className="flex items-center space-x-2">
							<Lock className="h-4 w-4" />
							<span>Forgot Password</span>
						</button>
						<button className="flex items-center space-x-2">
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
