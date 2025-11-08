import { Monitor, FileText } from "lucide-react"

export default function SpecialTools() {
  const tools = [
    { name: "E-RESOURCES", icon: Monitor, link: "#" },
    { name: "IRB FORM", icon: FileText, link: "#" },
  ]

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-3 border-primary rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">SPECIAL TOOLS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <a
                  key={tool.name}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-3 border-primary rounded-2xl p-8 text-center hover:bg-primary/5 transition cursor-pointer"
                >
                  <IconComponent size={60} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">{tool.name}</h3>
                  <p className="text-lg text-foreground font-semibold">Coming Soon</p>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
