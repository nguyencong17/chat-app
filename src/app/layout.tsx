import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_component/Sidebar";
import Header from "./_component/Header";
import Footer from "./_component/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <div className="mx-auto container 2xl:container px-4 max-h-screen">
          <div className="flex gap-8">
            <div className="h-screen w-[202px]">
              <Sidebar/>
            </div>
            <div className="flex-1 relative">
              <Header/>
              <div className="absolute left-0 right-0 top-[70px] bottom-[70px] bg-white shadow-lg rounded-md">
              {children}
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}