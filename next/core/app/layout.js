import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { UserProvider } from './userContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PUMBA Online Store",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider >
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="pt-36">
            {children}
          </div>
        </body>
      </html>
    </UserProvider >
  );
}
