import { Manrope } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/navigation/AnnouncementBar";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import OtpLoginModal from "@/components/auth/OtpLoginModal";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Clothing Store",
  description: "A modern clothing store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <AnnouncementBar />
        <Navbar />
        {children}
        <OtpLoginModal/>
        <Footer />
      </body>
    </html>
  );
}
