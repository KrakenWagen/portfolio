import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Felix Bernal | Software Engineer</title>
        <meta name="description" content="Portfolio of Felix Bernal, Software Engineer" />
        <meta property="og:title" content="Felix Bernal | Software Engineer"/>
        <meta property="og:description" content="Portfolio of Felix Bernal, Software Engineer"/>
        <meta property="og:image" content="https://www.felixbernal.es/images/preview.jpg"/>
        <meta property="og:url" content="https://www.felixbernal.es/"/>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
