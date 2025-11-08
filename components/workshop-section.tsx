"use client"

import { useState, useEffect } from "react"
import { database } from "@/lib/firebase-client"
import { ref, onValue } from "firebase/database"

interface Workshop {
  id: string
  name: string
  ledBy: string
  description: string
  applyLink?: string
}

export default function WorkshopSection() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])

  useEffect(() => {
    const workshopRef = ref(database, "workshops")
    onValue(workshopRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const workshopList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
        }))
        setWorkshops(workshopList)
      } else {
        setWorkshops([])
      }
    })
  }, [])

  const handleApplyClick = (applyLink: string | undefined) => {
    if (applyLink) {
      window.open(applyLink, "_blank")
    }
  }

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-4 border-primary rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-5 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">WORKSHOP</h2>
          </div>

          {workshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">No Current Workshops</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="border-4 border-primary rounded-3xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{workshop.name}</h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      Led by
                      <br />
                      <span className="font-semibold">{workshop.ledBy}</span>
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">{workshop.description}</p>
                  </div>
                  <button
                    onClick={() => handleApplyClick(workshop.applyLink)}
                    className="mt-6 px-6 py-2 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
