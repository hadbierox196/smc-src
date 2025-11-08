"use client"

import { useEffect, useState } from "react"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export default function HeroSection() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("userName") || ""
    setUserName(name)
  }, [])

  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary"></h1>
            <div className="flex justify-center">
              <img src="/images/design-mode/1762283287693.png" alt="SRC Logo" className="h-56 w-auto" />
            </div>
          </div>

          {/* Left Content */}
          <div className="space-y-6 text-center">
            <p className="text-lg sm:text-xl text-foreground font-semibold">
              A student-led research society based in Sargodha Medical College
            </p>
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
              Fostering a culture of research, innovation, and academic excellence. Empowering future healthcare
              professionals with the skills and confidence to lead impactful research.
            </p>
            <div className="flex gap-4 pt-4 justify-center">
              <a
                href="https://www.instagram.com/src.smc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition"
              >
                <Instagram size={32} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition"
              >
                <Twitter size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
