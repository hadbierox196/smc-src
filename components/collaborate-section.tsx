"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, X, Trash2 } from "lucide-react"
import { database } from "@/lib/firebase-client"
import { ref, onValue, push, remove } from "firebase/database"

interface Collaboration {
  id: string
  title: string
  name: string
  contact: string
  description: string
  expiresAt?: number
  createdBy?: string
}

export default function CollaborateSection() {
  const [collabs, setCollabs] = useState<Collaboration[]>([])
  const [showModal, setShowModal] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    duration: "1",
  })

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || ""
    setUserEmail(email)

    const collabRef = ref(database, "collaborations")
    onValue(collabRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const collabList = Object.entries(data)
          .map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }))
          .filter((item) => !item.expiresAt || item.expiresAt > Date.now())
        setCollabs(collabList)
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const durationMap = { "1": 86400000, "7": 604800000, "30": 2592000000 }
    const expiresAt = Date.now() + (durationMap[formData.duration as keyof typeof durationMap] || 86400000)

    const newCollab = {
      ...formData,
      contact: userEmail,
      expiresAt,
      createdBy: userEmail,
      createdAt: Date.now(),
    }

    const collabRef = ref(database, "collaborations")
    await push(collabRef, newCollab)

    setFormData({ title: "", name: "", description: "", duration: "1" })
    setShowModal(false)
  }

  const handleDelete = async (collabId: string) => {
    const collabRef = ref(database, `collaborations/${collabId}`)
    await remove(collabRef)
  }

  return (
    <section id="collaborate" className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Posts Section */}
        <div className="border-3 border-primary rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <h2 className="text-3xl font-heading font-bold text-foreground">COLLABORATE</h2>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-12 h-12 rounded-full bg-primary text-white hover:bg-purple-dark transition flex items-center justify-center"
            >
              <Plus size={32} />
            </button>
          </div>

          <p className="text-foreground/70 mb-8">Post your ideas and collaborate with others</p>

          {collabs.length === 0 ? (
            <p className="text-center text-foreground/50 py-8">No collaboration posts yet</p>
          ) : (
            <div className="space-y-6">
              {collabs.map((collab) => (
                <div key={collab.id} className="border-3 border-primary rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-foreground">{collab.title}</h3>
                    {userEmail === collab.createdBy && (
                      <button
                        onClick={() => handleDelete(collab.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete this post"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-foreground/60 text-sm mb-3">
                    {collab.name} • Contact: {collab.contact}
                  </p>
                  {collab.expiresAt && (
                    <p className="text-foreground/60 text-sm mb-3">
                      Time left: {Math.ceil((collab.expiresAt - Date.now()) / 86400000)} days
                    </p>
                  )}
                  <div className="border-3 border-primary rounded-xl p-4 bg-foreground/5">
                    <p className="text-foreground">{collab.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-3 border-primary">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-foreground">Add Collaboration</h3>
                <button onClick={() => setShowModal(false)} className="text-foreground hover:text-primary transition">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">TITLE</label>
                  <input
                    type="text"
                    placeholder="Project Title"
                    className="w-full border-3 border-primary rounded-full px-6 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">NAME</label>
                  <input
                    type="text"
                    placeholder="As It Appears on Your Profile"
                    className="w-full border-3 border-primary rounded-full px-6 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">SHORT DESCRIPTION</label>
                  <textarea
                    placeholder="Tell us about your project"
                    className="w-full border-3 border-primary rounded-2xl px-6 py-4 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">TIME DURATION</label>
                  <div className="flex flex-wrap gap-3">
                    {["1", "7", "30"].map((duration) => (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => setFormData({ ...formData, duration })}
                        className={`px-6 py-2 border-2 rounded-full font-semibold transition ${
                          formData.duration === duration
                            ? "border-primary bg-primary text-white"
                            : "border-primary text-primary hover:bg-primary/10"
                        }`}
                      >
                        {duration === "1" ? "1 Day" : duration === "7" ? "1 Week" : "1 Month"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white border-3 border-primary rounded-full font-heading font-bold text-lg hover:bg-purple-dark transition"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
