"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth, database } from "@/lib/firebase-client"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { ref, set, get } from "firebase/database"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    year: "",
    smcId: "",
    role: "",
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        router.push("/")
      } else {
        setIsAuthenticated(false)
      }
      setIsCheckingAuth(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)

      const userRef = ref(database, `users/${userCredential.user.uid}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userProfile = snapshot.val()
        localStorage.setItem("userProfile", JSON.stringify(userProfile))
        localStorage.setItem("userEmail", userProfile.email)
      }
      router.push("/")
    } catch (error) {
      alert("Login failed: " + (error as any).message)
    }
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password)

      const userProfile = {
        name: signupForm.name,
        email: signupForm.email,
        batch: signupForm.batch,
        year: signupForm.year,
        smcId: signupForm.smcId,
        role: signupForm.role,
      }

      const userRef = ref(database, `users/${userCredential.user.uid}`)
      await set(userRef, userProfile)

      localStorage.setItem("userProfile", JSON.stringify(userProfile))
      localStorage.setItem("userEmail", signupForm.email)
      router.push("/")
    } catch (error) {
      alert("Signup failed: " + (error as any).message)
    }
    setLoading(false)
  }

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Checking authentication...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        {isLogin ? (
          <div className="border-3 border-primary rounded-3xl p-8 bg-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <h1 className="text-3xl font-heading font-bold text-foreground">LOGIN</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-3 border-primary rounded-2xl px-6 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border-3 border-primary rounded-2xl px-6 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>

              <p className="text-center text-foreground">
                Need an account.{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary font-heading font-bold hover:underline"
                >
                  SIGN UP
                </button>
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-white border-3 border-primary text-primary rounded-2xl font-heading font-bold text-lg hover:bg-primary hover:text-white transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>
          </div>
        ) : (
          <div className="border-3 border-primary rounded-3xl p-8 bg-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <h1 className="text-3xl font-heading font-bold text-foreground">SIGN UP</h1>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "email", label: "E-mail", type: "email" },
                { key: "password", label: "Password", type: "password" },
                { key: "batch", label: "Batch", type: "text" },
                { key: "year", label: "Year", type: "text" },
                { key: "smcId", label: "SMC ID", type: "text" },
                { key: "role", label: "Role", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-foreground mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.label}
                    className="w-full border-3 border-primary rounded-2xl px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={(signupForm as any)[field.key]}
                    onChange={(e) => setSignupForm({ ...signupForm, [field.key]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary border-3 border-primary text-white rounded-2xl font-heading font-bold text-lg hover:bg-purple-dark transition disabled:opacity-50 mt-6"
              >
                {loading ? "Signing up..." : "SIGN UP"}
              </button>

              <p className="text-center text-foreground text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary font-heading font-bold hover:underline"
                >
                  LOGIN
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
