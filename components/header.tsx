"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, LogOut, User } from "lucide-react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase-client"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = localStorage.getItem("userName") || user.email?.split("@")[0] || "User"
        setUserName(name)
        setIsLoggedIn(true)
      } else {
        setUserName("")
        setIsLoggedIn(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("userName")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("userProfile")
      setUserName("")
      setIsLoggedIn(false)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/design-mode/1762283287693.png" alt="SRC Logo" className="h-10 w-auto" />
            <span className="hidden sm:inline text-2xl font-heading font-bold text-primary"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {isLoggedIn && (
              <Link href="/#profile" className="text-foreground hover:text-primary transition flex items-center gap-1">
                <User size={18} />
                Profile
              </Link>
            )}
            <a href="#mission" className="text-foreground hover:text-primary transition">
              Mission
            </a>
            <a href="#news" className="text-foreground hover:text-primary transition">
              News
            </a>
            <a href="#collaborate" className="text-foreground hover:text-primary transition">
              Collaborate
            </a>
            <a href="#team" className="text-foreground hover:text-primary transition">
              Team
            </a>
          </nav>

          <button className="text-primary text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="pb-4 space-y-2 border-t border-primary pt-4">
            {isLoggedIn && (
              <Link href="/#profile" className="block py-2 text-foreground hover:text-primary">
                Profile
              </Link>
            )}
            <a href="#mission" className="block py-2 text-foreground hover:text-primary">
              Mission
            </a>
            <a href="#news" className="block py-2 text-foreground hover:text-primary">
              News
            </a>
            <a href="#collaborate" className="block py-2 text-foreground hover:text-primary">
              Collaborate
            </a>
            <a href="#team" className="block py-2 text-foreground hover:text-primary">
              Team
            </a>
            <div className="border-t border-primary pt-4 mt-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <p className="py-2 text-foreground font-semibold">Welcome, {userName}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="block px-4 py-2 text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth?tab=signup"
                    className="block px-4 py-2 bg-primary text-white border-2 border-primary rounded-full font-semibold hover:bg-purple-dark transition text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
