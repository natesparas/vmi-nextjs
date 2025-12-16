"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Home,
	Store,
	CreditCard,
	Box,
	Stethoscope,
	Users,
	Settings,
	Activity,
	Database,
	ChevronDown,
} from "lucide-react";

const HorizontalMenu: FC = () => {
	const pathname = usePathname();

	const menuItems = [
		{ label: "Dashboard", href: "/dashboard", icon: <Home className="h-4 w-4" /> },
		{ label: "Store", href: "/store", icon: <Store className="h-4 w-4" /> },
		{
			label: "Transaction",
			href: "/transaction",
			icon: <CreditCard className="h-4 w-4" />,
		},
		{ label: "Products", href: "/products", icon: <Box className="h-4 w-4" /> },
		{
			label: "Patient Data",
			href: "/patient_data",
			icon: <Database className="h-4 w-4" />,
		},
        {
			label: "Consulation",
			href: "/consulation",
			icon: <Stethoscope className="h-4 w-4" />,
		},
	];

	const labTestItems = [
		{
			label: "Hematology",
			href: "/labtest/hematology",
			icon: <Activity className="h-4 w-4" />,
		},
		{
			label: "Urinalysis",
			href: "/labtest/urinalysis",
			icon: <Activity className="h-4 w-4" />,
		},
	];

	const maintenanceItems = [
		{
			label: "Category",
			href: "/maintenance/category",
			icon: <Settings className="h-4 w-4" />,
		},
		{
			label: "User",
			href: "/maintenance/user",
			icon: <Users className="h-4 w-4" />,
		},
	];

	const isActive = (href: string) => pathname === href;

	return (
		<nav className="w-full bg-white px-6 py-2 flex items-center space-x-3 border-b border-gray-200 overflow-x-auto">
			{/* Main Menu Items */}
			{menuItems.map((item) => (
				<Link
					key={item.label}
					href={item.href}
					className={`flex items-center px-5 py-3 rounded-md text-base font-medium space-x-2
            ${
							isActive(item.href)
								? "bg-yellow-400"
								: "text-slate-900 hover:bg-slate-100"
						}`}
				>
					{item.icon}
					<span>{item.label}</span>
				</Link>
			))}

			{/* Lab Test Dropdown */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className={`flex items-center px-5 py-3 rounded-md text-base font-medium space-x-2
              ${
								pathname.startsWith("/labtest")
									? "bg-yellow-400"
									: "text-slate-900 hover:bg-slate-100"
							}`}
					>
						<Stethoscope className="h-4 w-4" />
						<span>Lab Test</span>
						<ChevronDown className="ml-1 h-3 w-3" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-44">
					{labTestItems.map((item) => (
						<DropdownMenuItem key={item.label} asChild>
							<Link href={item.href} className="flex items-center space-x-2">
								{item.icon}
								<span>{item.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Maintenance Dropdown */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className={`flex items-center px-5 py-3 rounded-md text-base font-medium space-x-2
              ${
								pathname.startsWith("/maintenance")
									? "bg-yellow-400"
									: "text-slate-900 hover:bg-slate-100"
							}`}
					>
						<Settings className="h-4 w-4" />
						<span>Maintenance</span>
						<ChevronDown className="ml-1 h-3 w-3" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-44">
					{maintenanceItems.map((item) => (
						<DropdownMenuItem key={item.label} asChild>
							<Link href={item.href} className="flex items-center space-x-2">
								{item.icon}
								<span>{item.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
};

export default HorizontalMenu;
