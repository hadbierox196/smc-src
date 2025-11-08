import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const firebaseConfig = {
  apiKey: "AIzaSyDF2wmnHZWwLsJ3H20FMdnyNSVE7UNPGUE",
  authDomain: "srcsms-fbe25.firebaseapp.com",
  databaseURL: "https://srcsms-fbe25-default-rtdb.firebaseio.com",
  projectId: "srcsms-fbe25",
  storageBucket: "srcsms-fbe25.appspot.com",
  messagingSenderId: "1085257788571",
  appId: "1:1085257788571:web:19f9d4f327868d1cdfaa3e",
  measurementId: "G-HJD1DPLCXR",
}

export const metadata: Metadata = {
  title: "SRC - Sargodha Medical College Research Society",
  description: "A student-led research society based in Sargodha Medical College",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout firebaseConfig={firebaseConfig}>{children}</ClientLayout>
      </body>
    </html>
  )
}
