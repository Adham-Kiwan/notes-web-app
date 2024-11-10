import React from "react";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
  onDelete: (noteId: number) => void; // Prop to handle deleting a note
}

function Note({ note, onDelete }: NoteProps) {
  // Function to handle the deletion when the trash icon is clicked
  const handleDeleteClick = () => {
    onDelete(note.id); // Call the onDelete function with the note id
  };

  return (
    <div className="text-white flex flex-col w-[600px] px-[50px] py-[20px] rounded-[15px] bg-[#2563EB] mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl">{note.title}</h3>
        <div className="flex items-center gap-[20px]">
          <img className="cursor-pointer" src="/share.png" alt="" />
          <img className="cursor-pointer" src="/edit.png" alt="" />
          {/* Trash icon for deleting the note */}
          <img
            className="cursor-pointer"
            src="/trash.png"
            alt="Delete"
            onClick={handleDeleteClick} // Call handleDeleteClick when clicked
          />
        </div>
      </div>
      <hr className="border-[#000000] my-[20px]" />
      <div>{note.content}</div>
    </div>
  );
}

export default Note;
