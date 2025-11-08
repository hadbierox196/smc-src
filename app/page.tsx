"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProfileCard from "@/components/profile-card"
import MissionSection from "@/components/mission-section"
import NewsSection from "@/components/news-section"
import SpecialTools from "@/components/special-tools"
import CollaborateSection from "@/components/collaborate-section"
import WorkshopSection from "@/components/workshop-section"
import TeamSection from "@/components/team-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase-client"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      {isLoggedIn && <ProfileCard />}
      <MissionSection />
      <NewsSection />
      <SpecialTools />
      <CollaborateSection />
      <WorkshopSection />
      <TeamSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
