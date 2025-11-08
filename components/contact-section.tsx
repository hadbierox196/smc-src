"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Message sent successfully!")
    setFormData({ name: "", email: "", message: "" })
    setLoading(false)
  }

  return (
    <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Contact Info */}
        <div className="bg-foreground text-white rounded-3xl p-8">
          <h2 className="text-3xl font-heading font-bold mb-6">Contact</h2>
          <div className="space-y-3">
            <p className="text-lg">
              <span className="font-semibold">Email:</span> official.srcsmc@gmail.com
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> (048) 9232004
            </p>
            <p className="text-lg">
              <span className="font-semibold">Address:</span> 2P3F+H7J, Faisalabad Rd, Sargodha
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border-3 border-primary rounded-3xl p-8">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-3 border-primary rounded-2xl px-6 py-3 bg-foreground/5 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Your email"
              className="w-full border-3 border-primary rounded-2xl px-6 py-3 bg-foreground/5 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <textarea
              placeholder="Your message"
              className="w-full border-3 border-primary rounded-2xl px-6 py-4 bg-foreground/5 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary text-white border-3 border-primary rounded-full font-heading font-bold text-lg hover:bg-purple-dark transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
