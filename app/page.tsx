"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import NoteCard from "@/components/NoteCard";
import Modal from "@/components/Modal";

export default function HomePage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete" | null>(null);
  const [activeNote, setActiveNote] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const username = 'Rahul';

  async function fetchNotes() {
    setLoading(true);
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function openCreateModal() {
    setModalMode("create");
    setTitle("");
    setContent("");
    setActiveNote(null);
    setIsModalOpen(true);
  }

  function openEditModal(note: any) {
    setModalMode("edit");
    setTitle(note.note_title);
    setContent(note.note_content);
    setActiveNote(note);
    setIsModalOpen(true);
  }

  function openDeleteModal(note: any) {
    setModalMode("delete");
    setActiveNote(note);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (modalMode === "create") {
        await api.post("/notes", {
          note_title: title,
          note_content: content,
        });
      } else if (modalMode === "edit" && activeNote) {
        await api.put(`/notes/${activeNote.note_id}`, {
          note_title: title,
          note_content: content,
        });
      }
      setIsModalOpen(false);
      fetchNotes();
    } catch (err) {
      console.error("Save failed", err);
    }
  }

  async function handleDelete() {
    try {
      if (activeNote) {
        await api.delete(`/notes/${activeNote.note_id}`);
      }
      setIsModalOpen(false);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-sm">HomePage/Notes</span>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome {username}</h1>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + New Note
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((n) => (
              <NoteCard
                key={n.note_id}
                note={n}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen && (modalMode === "create" || modalMode === "edit")}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Create Note" : "Edit Note"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isModalOpen && modalMode === "delete"}
        onClose={() => setIsModalOpen(false)}
        title="Delete Note"
      >
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{activeNote?.note_title}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
