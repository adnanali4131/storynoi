import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "Storynoi | landing page",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta_sans.className}>{children}</body>
    </html>
  );
}
