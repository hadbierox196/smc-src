"use client"

import { useState } from "react"

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the society even about",
      answer:
        "SRC is a student-led research society dedicated to fostering research, innovation, and academic excellence.",
    },
    {
      question: "How can I join SRC?",
      answer: "You can join by signing up on our website and completing the membership form.",
    },
    {
      question: "When are workshops held?",
      answer: "Workshops are held regularly. Check the workshop section for current schedules.",
    },
    {
      question: "How do I collaborate on projects?",
      answer: "Use our collaboration feature to post your ideas and connect with other members.",
    },
  ]

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-3 border-primary rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-3 border-primary rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-primary/5 transition"
                >
                  <span className="text-lg font-semibold text-foreground text-left">{faq.question}</span>
                  <span className="text-2xl text-primary">{expandedIndex === index ? "−" : "+"}</span>
                </button>
                {expandedIndex === index && (
                  <div className="px-6 py-4 bg-primary/5 border-t-3 border-primary">
                    <p className="text-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
