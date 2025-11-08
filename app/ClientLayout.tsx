"use client"

import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { useEffect } from "react"
import { initializeApp, getApps } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

interface ClientLayoutProps {
  children: React.ReactNode
  firebaseConfig: {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
}

export default function ClientLayout({ children, firebaseConfig }: ClientLayoutProps) {
  useEffect(() => {
    try {
      if (getApps().length === 0) {
        const app = initializeApp(firebaseConfig)
        const analytics = getAnalytics(app)
        ;(window as any).firebaseApp = app
      }
    } catch (error) {
      console.error("Firebase initialization error:", error)
    }
  }, []) // Empty dependency array - only run once on mount

  return (
    <>
      <div className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
      </div>
    </>
  )
}
