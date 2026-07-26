import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://yooncarrot-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "윤동근 | 프론트엔드 개발자 포트폴리오",
  description:
    "구조로 푸는 상태 관리, 측정으로 증명하는 개발. 프론트엔드 개발자 윤동근의 포트폴리오입니다.",
  openGraph: {
    title: "윤동근 | 프론트엔드 개발자 포트폴리오",
    description:
      "구조로 푸는 상태 관리, 측정으로 증명하는 개발. 프론트엔드 개발자 윤동근의 포트폴리오입니다.",
    url: SITE_URL,
    siteName: "윤동근 포트폴리오",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "윤동근 포트폴리오 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eef1f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
