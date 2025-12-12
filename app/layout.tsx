import "./globals.css"
import TopNavbar from "@/app/components/navbar/TopNavbar"
import HorizontalMenu from "@/app/components/navbar/HorizontalMenu"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <TopNavbar />
        <HorizontalMenu />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
