"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
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
    <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-white/80" />
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> official.srcsmc@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-white/80" />
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> (048) 9232004
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-white/80" />
                <p className="text-lg">
                  <span className="font-semibold">Address:</span> 2P3F+H7J, Faisalabad Rd, Sargodha
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border-2 border-white/30 rounded-lg px-4 py-2 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full border-2 border-white/30 rounded-lg px-4 py-2 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <textarea
                placeholder="Your message"
                className="w-full border-2 border-white/30 rounded-lg px-4 py-2 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-24"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-white text-foreground border-2 border-white rounded-lg font-heading font-bold hover:bg-white/90 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">SRC</h3>
            <p className="text-white/80">A student-led research society at Sargodha Medical College</p>
          </div>
          <div>
            <h3 className="font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#mission" className="text-white/80 hover:text-white transition">
                  Mission
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/80 hover:text-white transition">
                  Team
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/src.smc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center space-y-2">
          <p className="text-white/60">
            &copy; 2025 SRC - Sargodha Medical College Research Society. All rights reserved.
          </p>
          <p className="text-white/60">
            Developed by{" "}
            <a
              href="https://hassan-farooq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition font-semibold"
            >
              Hassan Farooq
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
