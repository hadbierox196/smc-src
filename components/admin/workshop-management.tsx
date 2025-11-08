"use client"

import { useState, useEffect } from "react"
import { ref, onValue, push, remove } from "firebase/database"

export default function WorkshopManagement({ db }: any) {
  const [workshopList, setWorkshopList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    ledBy: "",
    date: "",
    description: "",
    applyLink: "",
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const workshopsRef = ref(db, "workshops")
    onValue(workshopsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const workshopsList = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }))
        setWorkshopList(workshopsList)
      }
      setLoading(false)
    })
  }, [db])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddWorkshop = async () => {
    if (!formData.name || !formData.ledBy || !formData.date || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields" })
      return
    }

    try {
      await push(ref(db, "workshops"), {
        name: formData.name,
        ledBy: formData.ledBy,
        date: formData.date,
        description: formData.description,
        applyLink: formData.applyLink || "#",
      })
      setMessage({ type: "success", text: "Workshop added successfully!" })
      setFormData({ name: "", ledBy: "", date: "", description: "", applyLink: "" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error adding workshop: " + error.message })
    }
  }

  const handleDeleteWorkshop = async (workshopId: string) => {
    if (!confirm("Are you sure you want to delete this workshop?")) return
    try {
      await remove(ref(db, `workshops/${workshopId}`))
      setMessage({ type: "success", text: "Workshop deleted successfully!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error deleting workshop: " + error.message })
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Workshop Management</h2>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Workshop</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter workshop title"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Led By</label>
            <input
              type="text"
              name="ledBy"
              value={formData.ledBy}
              onChange={handleInputChange}
              placeholder="Instructor name"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter workshop description"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Apply Now Link</label>
            <input
              type="url"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleInputChange}
              placeholder="https://example.com/apply"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>
          <button
            onClick={handleAddWorkshop}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold"
          >
            Add Workshop
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <h3 className="text-xl font-bold mb-4 text-gray-800">Existing Workshops</h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading workshops...</p>
      ) : workshopList.length === 0 ? (
        <p className="text-center text-gray-500">No workshops found</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {workshopList.map((workshop) => (
            <div key={workshop.id} className="border-l-4 border-purple-600 bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-purple-600 mb-2">{workshop.name}</h3>
              <p className="text-sm text-gray-700">
                <strong>Led by:</strong> {workshop.ledBy}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Date:</strong> {workshop.date}
              </p>
              <p className="text-sm text-gray-700 mt-2">{workshop.description}</p>
              {workshop.applyLink && workshop.applyLink !== "#" && (
                <p className="text-sm mt-2">
                  <strong>Apply Link:</strong>{" "}
                  <a
                    href={workshop.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {workshop.applyLink}
                  </a>
                </p>
              )}
              <button
                onClick={() => handleDeleteWorkshop(workshop.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
