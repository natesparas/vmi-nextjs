// app/(app)/layout.tsx
import TopNavbar from "@/app/components/navbar/TopNavbar";
import HorizontalMenu from "@/app/components/navbar/HorizontalMenu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TopNavbar />
			<HorizontalMenu />
			<main className="p-6">{children}</main>
		</>
	);
}
