"use client";

interface NoteCardProps {
    note: any;
    onEdit: (note: any) => void;
    onDelete: (note: any) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{note.note_title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {note.note_content}
            </p>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => onEdit(note)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(note)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
