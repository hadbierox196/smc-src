"use client"

import { useState, useEffect } from "react"
import { Users, Briefcase } from "lucide-react"
import { onAuthStateChanged } from "firebase/auth"
import { ref, get } from "firebase/database"
import { auth, database } from "@/lib/firebase-client"

interface UserProfile {
  name: string
  email: string
  role: string
  batch: string
  smcId: string
}

export default function ProfileCard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userRef = ref(database, `users/${authUser.uid}`)
          const snapshot = await get(userRef)

          if (snapshot.exists()) {
            setUser(snapshot.val())
          }
        } catch (error) {
          console.error("[v0] Error fetching user profile:", error)
          // fallback to localStorage if Firebase fetch fails
          const storedUser = localStorage.getItem("userProfile")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading || !user) {
    return null
  }

  return (
    <section id="profile" className="bg-background py-12 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="bg-white border-3 border-primary rounded-3xl p-8 w-full max-w-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold font-heading mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-3xl font-heading font-bold text-primary">{user.name}</h2>
            <p className="text-foreground/70 text-lg">{user.email}</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 border-t border-primary/20 pt-6">
            <div className="flex items-center gap-4 p-4 bg-foreground/5 rounded-xl">
              <Users size={24} className="text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground/60">Role</p>
                <p className="text-lg font-semibold text-foreground">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-foreground/5 rounded-xl">
              <Users size={24} className="text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground/60">Batch</p>
                <p className="text-lg font-semibold text-foreground">{user.batch}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-foreground/5 rounded-xl">
              <Briefcase size={24} className="text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground/60">SMC ID</p>
                <p className="text-lg font-semibold text-foreground">{user.smcId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
