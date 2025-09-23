import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "윤동근 | 포트폴리오",
  description: "개발자 윤동근의 포트폴리오입니다.",
  openGraph: {
    title: "윤동근 | 포트폴리오",
    description: "개발자 윤동근의 포트폴리오입니다.",
    url: "https://yooncarrot-portfolio.vercel.app", // 실제 배포 도메인
    siteName: "윤동근 포트폴리오",
    images: [
      {
        url: "/personal/thumbnail.png", // OG 이미지 경로
        width: 1200,
        height: 630,
        alt: "윤동근 포트폴리오 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
