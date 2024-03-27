import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import LogOutBtn from "@/components/LogOutBtn";
import Link from "next/link";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "FoodBook",
  description: "Organize your recipes and cookbooks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 py-4 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-bold">Foodbook</h1>
          </div>
          <div>
            {session ? (
              <LogOutBtn />
            ) : (
              <Link
                className="text-white text-sm font-medium py-2 px-4 rounded bg-blue-300 hover:bg-blue-400"
                href="/auth"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
