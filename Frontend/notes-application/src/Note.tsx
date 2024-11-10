import React, { useState } from "react";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
  onDelete: (noteId: number) => void;
  onEdit: (note: { id: number; title: string; content: string }) => void; // New prop for handling note edit
}

function Note({ note, onDelete, onEdit }: NoteProps) {
  // Function to handle the deletion when the trash icon is clicked
  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleEditClick = () => {
    onEdit(note); // Trigger edit when the edit icon is clicked
  };

  return (
    <div className="text-white flex flex-col w-[600px] px-[50px] py-[20px] rounded-[15px] bg-[#2563EB] mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl">{note.title}</h3>
        <div className="flex items-center gap-[20px]">
          <img className="cursor-pointer" src="/share.png" alt="" />
          <img
            className="cursor-pointer"
            src="/edit.png"
            alt="Edit"
            onClick={handleEditClick} // Open the edit form
          />
          <img
            className="cursor-pointer"
            src="/trash.png"
            alt="Delete"
            onClick={handleDeleteClick} // Delete the note
          />
        </div>
      </div>
      <hr className="border-[#000000] my-[20px]" />
      <div>{note.content}</div>
    </div>
  );
}

export default Note;
