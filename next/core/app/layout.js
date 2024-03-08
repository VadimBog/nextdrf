'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { UserProvider } from './context';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "PUMBA Online Store",
// };

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <UserProvider >
            <Navbar />
            <div className="pt-36">
              {children}
            </div>
          </UserProvider >
        </body>
      </html>
  );
}
