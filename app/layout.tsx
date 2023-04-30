import Client from "./components/Client";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Airbnb",
  description: "Vacation Homes & Condo Rentals",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Client>
          <Modal />
          <Navbar />
        </Client>
        {children}
      </body>
    </html>
  );
}
