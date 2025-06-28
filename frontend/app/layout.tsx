import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkinSense - AI-Powered Skin Lesion Analysis",
  description:
    "Upload skin lesion images for instant AI-powered classification and chat with our expert assistant about your results.",
  keywords: "skin lesion, AI analysis, dermatology, melanoma detection, skin cancer screening",
  authors: [{ name: "SkinAI Team" }],
  openGraph: {
    title: "SkinAI - AI-Powered Skin Lesion Analysis",
    description: "Get instant AI-powered skin lesion classification with expert chat assistance.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
