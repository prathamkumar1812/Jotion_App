import type { Metadata } from "next";
import {Toaster} from "sonner"
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme_providers";
import { ConvexClientProvider } from "@/components/providers/conver_provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zotion",
  description: "Make Notes with Zotion",
  icons:{
    icon:[
       {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.png",
        href: "/favicon-dark.png",
       }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>

      <EdgeStoreProvider>
        <ThemeProvider
         attribute="class"
         defaultTheme="light"
         storageKey="Zotion-theme"
         
         disableTransitionOnChange>
          <Toaster position="bottom-center" />
          <ModalProvider/>
        {children}
        </ThemeProvider>
        </EdgeStoreProvider>
        </ConvexClientProvider>
       
        </body>
    </html>
  );
}
