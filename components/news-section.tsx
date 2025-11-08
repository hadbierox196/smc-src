"use client"

import { useState, useEffect } from "react"
import { database } from "@/lib/firebase-client"
import { ref, onValue } from "firebase/database"

interface News {
  id: string
  name: string
  date: string
  description: string
  image?: string
}

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newsRef = ref(database, "news")
    onValue(
      newsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const newsList = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }))
          setNews(newsList)
        } else {
          setNews([])
        }
        setLoading(false)
      },
      (error) => {
        console.error("Error loading news:", error)
        setLoading(false)
      },
    )
  }, [])

  return (
    <section id="news" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-4 border-primary rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-5 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">NEWS</h2>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">No News Updates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item.id} className="border-4 border-primary rounded-3xl overflow-hidden flex flex-col">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${item.image || "/news-collage.png"}')`,
                    }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-foreground/60 mb-3">{item.date}</p>
                    <p className="text-foreground text-sm leading-relaxed flex-grow">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
