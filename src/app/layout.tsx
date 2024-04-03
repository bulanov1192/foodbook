import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import LogOutBtn from "@/components/LogOutBtn";
import Link from "next/link";
import CollapsibleMenu from "@/components/menu/menu";

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

  const user = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <CollapsibleMenu user={user} />
          <main className="flex-1 px-6 py-14">{children}</main>
        </div>
      </body>
    </html>
  );
}
