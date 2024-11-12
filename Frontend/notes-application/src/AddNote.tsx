import React, { useState } from "react";
import useStore from "./store"; // Import the store

interface AddNoteProps {
  onNoteCreated: () => void; // This is the prop to notify MainPage to refetch notes
}

function AddNote({ onNoteCreated }: AddNoteProps) {
  const { toggleAddNote } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(""); // To show success or error messages

  const handleSubmit = async () => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Note created successfully!");
        toggleAddNote(); // Close the modal after success
        onNoteCreated(); // Call onNoteCreated to refetch the notes
      } else {
        setMessage(data.error || "Failed to create note.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-50">
  <div className="flex flex-col w-[90%] sm:w-[500px] rounded-[20px] p-4 sm:p-[20px] bg-white">
    <div className="flex justify-between items-center">
      <input
        className="placeholder-gray-400 focus:outline-none w-full px-2 py-2 sm:px-0 sm:py-6 text-lg sm:text-base"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex items-center ml-2 sm:ml-0">
        <img
          className="cursor-pointer w-5 sm:w-[20px]"
          src="/cross.png"
          alt="Close"
          onClick={toggleAddNote} // Close modal on cross icon click
        />
      </div>
    </div>
    <hr className="border-gray-300 my-2 sm:my-4" />
    <div className="flex flex-col gap-3">
      <textarea
        className="resize-none placeholder-gray-400 focus:outline-none px-2 py-2 sm:px-0 sm:pt-6 sm:pb-48 text-base sm:text-lg"
        placeholder="Note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 sm:px-5 sm:py-3 rounded-md text-white bg-blue-600 text-sm sm:text-base"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
      {message && <p className="text-red-500 text-xs sm:text-sm mt-2">{message}</p>}
    </div>
  </div>
</div>

  );
}

export default AddNote;
