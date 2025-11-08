"use client"

import { useState, useEffect } from "react"
import { ref, onValue, update, remove } from "firebase/database"

export default function UserManagement({ db }: any) {
  const [users, setUsers] = useState<any[]>([])
  const [editingUser, setEditingUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const usersRef = ref(db, "users")
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const usersList = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }))
        setUsers(usersList)
      }
      setLoading(false)
    })
  }, [db])

  const handleEdit = (user: any) => {
    setEditingUser(user)
  }

  const handleUpdate = async () => {
    if (!editingUser) return
    try {
      await update(ref(db, `users/${editingUser.id}`), {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        batch: editingUser.batch,
        smcId: editingUser.smcId,
      })
      setMessage({ type: "success", text: "User updated successfully!" })
      setEditingUser(null)
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error updating user: " + error.message })
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await remove(ref(db, `users/${userId}`))
      setMessage({ type: "success", text: "User deleted successfully!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: "Error deleting user: " + error.message })
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="border-l-4 border-purple-600 bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-purple-600 mb-2">{user.name}</h3>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Batch:</strong> {user.batch}
              </p>
              <p className="text-sm text-gray-700">
                <strong>SMC ID:</strong> {user.smcId}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Edit User</h3>
          <div className="space-y-4">
            {["name", "email", "role", "batch", "smcId"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                  {field === "smcId" ? "SMC ID" : field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={editingUser[field] || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, [field]: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleUpdate}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold"
              >
                Update User
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
