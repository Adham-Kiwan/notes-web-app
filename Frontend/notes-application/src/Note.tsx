import React, { useState } from "react";
import axios from "axios";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
  onDelete: (noteId: number) => void;
  onEdit: (note: { id: number; title: string; content: string }) => void;
}

function Note({ note, onDelete, onEdit }: NoteProps) {
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleEditClick = () => {
    onEdit(note);
  };

  const handleShareClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:2000/notes/${note.id}/share`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = response.data.url;
      setShareableUrl(url);
      navigator.clipboard.writeText(url);

      // Show the copied message
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error generating shareable link:", error);
      alert("Failed to generate shareable link.");
    }
  };

  return (
    <div className="text-white flex flex-col w-[600px] max-w-full px-[50px] py-[20px] rounded-[15px] bg-[#2563EB] mb-4 sm:px-6 sm:py-4">
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl">{note.title}</h3>
        <div className="flex items-center gap-[20px]">
          <img
            className="cursor-pointer"
            src="/share.png"
            alt="Share"
            onClick={handleShareClick}
          />
          <img
            className="cursor-pointer"
            src="/edit.png"
            alt="Edit"
            onClick={handleEditClick}
          />
          <img
            className="cursor-pointer"
            src="/trash.png"
            alt="Delete"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      <hr className="border-[#000000] my-[20px]" />
      <div>{note.content}</div>

      {/* Display copied message */}
      {showCopiedMessage && (
        <div style={copiedMessageStyle}>Link copied to clipboard!</div>
      )}
    </div>
  );
}

// Style for the copied message
const copiedMessageStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "8px 16px",
  backgroundColor: "#2563EB",
  color: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  textAlign: "center",
  fontSize: "14px",
};

export default Note;
