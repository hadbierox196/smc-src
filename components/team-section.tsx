export default function TeamSection() {
  const teamMembers = [
    { name: "Member 1", description: "Role Description" },
    { name: "Member 2", description: "Role Description" },
    { name: "Member 3", description: "Role Description" },
  ]

  return (
    <section id="team" className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-3 border-primary rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">OUR TEAM</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="border-3 border-primary rounded-2xl overflow-hidden">
                <div className="h-32 bg-gradient-to-b from-blue-300 to-green-300" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-foreground/60">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
