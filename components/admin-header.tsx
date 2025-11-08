"use client"

export default function AdminHeader({ activeTab, setActiveTab }: any) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">Admin Dashboard</h1>
      <div className="flex gap-3 flex-wrap justify-center">
        {[
          { id: "users", label: "Manage Users" },
          { id: "news", label: "Manage News" },
          { id: "workshops", label: "Manage Workshops" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id ? "bg-white text-purple-600" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
