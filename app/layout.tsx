import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="p-10 border-b border-gray-400">
          <nav className="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/users">Users</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
