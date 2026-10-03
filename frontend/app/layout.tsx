import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Notificate } from "@/shared/ui/Notificate";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: "https://perecrut-tz2d.vercel.app",
  title: {
    default: "Perecrut",
    template: "%s | Perecrut",
  },
  description:
    "Interviewly is a smart interview scheduler that helps teams schedule interviews, coordinate with hiring managers, and create a seamless candidate experience — all in one place.",
  keywords: ["HR", "Recruters", "Interviews"],
  authors: [{ name: "Simfart", url: "https://github.com/Simfort" }],
  creator: "David / Simfart",
  publisher: "Simfart",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className}`}>
        <Header />
        <Notificate />
        {children}
        <Footer />
      </body>
    </html>
  );
}
