export default function MissionSection() {
  return (
    <section id="mission" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-3 border-primary rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">OUR MISSION & GOAL</h2>
          </div>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Fostering a culture of research, innovation, and academic excellence. Equip future healthcare professionals
            with the skills, ethics, and confidence to lead impactful research in medicine and public health.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["DIRECTORS", "HEADS", "SUB-HEAD", "MEMBERS"].map((role) => (
              <div key={role} className="border-3 border-primary rounded-2xl p-4 text-center">
                <p className="font-heading font-bold text-foreground mb-3">{role}</p>
                <div className="w-8 h-2 bg-primary mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
