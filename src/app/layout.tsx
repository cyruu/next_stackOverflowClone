"use client";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/materialUI/theme";
import Navbar from "@/app/components/Navbar";
import { store } from "./slices/store";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <Suspense fallback={<div>Loading...</div>}>
            <body className={inter.className}>
              <Navbar />
              {children}
            </body>
          </Suspense>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
