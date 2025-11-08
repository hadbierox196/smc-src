"use client"

import { useState, useEffect } from "react"
import { ref, onValue, push, remove } from "firebase/database"

export default function NewsManagement({ db }: any) {
  const [newsList, setNewsList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const newsRef = ref(db, "news")
    onValue(newsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const newsList = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }))
        setNewsList(newsList)
      }
      setLoading(false)
    })
  }, [db])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e: any) => {
    const url = e.target.value
    setFormData({ ...formData, image: url })
    if (url) setImagePreview(url)
  }

  const handleAddNews = async () => {
    if (!formData.name || !formData.date || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields" })
      return
    }

    try {
      await push(ref(db, "news"), {
        name: formData.name,
        date: formData.date,
        description: formData.description,
        image: formData.image || "/news-collage.png",
      })
      setMessage({ type: "success", text: "News article added successfully!" })
      setFormData({ name: "", date: "", description: "", image: "" })
      setImagePreview("")
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error adding news: " + error.message })
    }
  }

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return
    try {
      await remove(ref(db, `news/${newsId}`))
      setMessage({ type: "success", text: "News article deleted successfully!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error deleting news: " + error.message })
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">News Management</h2>

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
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Article</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter news title"
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
              placeholder="Enter news description"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
            {imagePreview && (
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="mt-3 max-w-xs rounded-lg" />
            )}
          </div>
          <button
            onClick={handleAddNews}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold"
          >
            Add News Article
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <h3 className="text-xl font-bold mb-4 text-gray-800">Existing News</h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center text-gray-500">No news articles found</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {newsList.map((item) => (
            <div key={item.id} className="border-l-4 border-purple-600 bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-purple-600 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-700">
                <strong>Date:</strong> {item.date}
              </p>
              <p className="text-sm text-gray-700 mt-2">{item.description}</p>
              {item.image && (
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="mt-2 max-w-xs rounded-lg" />
              )}
              <button
                onClick={() => handleDeleteNews(item.id)}
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
