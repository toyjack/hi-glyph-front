"use client";
import "./globals.css";

import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="winter">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <title>hi glyph</title>
      </head>
      <body className="bg-base-200">
        <div className="container mx-auto ">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
