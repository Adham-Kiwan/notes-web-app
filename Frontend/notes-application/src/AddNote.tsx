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
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <div className="flex flex-col w-[500px] rounded-[20px] p-[20px] bg-[#ffffff]">
        <div className="flex justify-between">
          <input
            className="placeholder-gray-400 focus:outline-none w-[100%] px-[0px] py-[30px]"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center">
            <img
              className="cursor-pointer w-[20px]"
              src="/cross.png"
              alt=""
              onClick={toggleAddNote} // Close modal on cross icon click
            />
          </div>
        </div>
        <hr className="border-black" />
        <div className="flex flex-col gap-[10px]">
          <textarea
            className="resize-none placeholder-gray-400 focus:outline-none px-[0px] pt-[30px] pb-[200px]"
            placeholder="Note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="px-[20px] py-[13px] rounded-[10px] text-white bg-[#2563EB]"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddNote;
