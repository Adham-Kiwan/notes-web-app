import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import AddNote from "./AddNote";
import useStore from "./store";
import Note from "./Note"; // Assuming you have a Note component
import ConfirmDelete from "./ConfirmDelete"; // Import the ConfirmDelete component
import { div } from "framer-motion/client";

function MainPage() {
  const { isAddNoteVisible, toggleAddNote } = useStore();
  const [userName, setUserName] = useState("");
  const [notes, setNotes] = useState<any[]>([]); // Use proper type for notes
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [noteTitleToDelete, setNoteTitleToDelete] = useState<string | null>(
    null
  ); // State for note title
  const [isEditingNote, setIsEditingNote] = useState(false); // Track if editing is in progress
  const [noteToEdit, setNoteToEdit] = useState<any>(null); // Store note being edited
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Track theme state

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
    handleFetchNotes();
  }, []); // Empty dependency array ensures this runs once when component mounts

  // Function to fetch notes
  const handleFetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:2000/notes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data.notes); // Set the notes after fetching from backend
        } else {
          console.error("Failed to fetch notes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.reload();
  };

  const handleDeleteNote = async () => {
    if (noteToDelete !== null && noteTitleToDelete) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:2000/notes/${noteToDelete}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.id !== noteToDelete)
            );
            setIsConfirmingDelete(false);
            setNoteToDelete(null);
            setNoteTitleToDelete(null);
          } else {
            console.error("Failed to delete note:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
    setNoteToDelete(null);
    setNoteTitleToDelete(null);
  };

  const handleEditNote = (note: any) => {
    setNoteToEdit(note);
    setIsEditingNote(true);
  };

  const handleSaveEdit = async () => {
    if (noteToEdit) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:2000/notes/${noteToEdit.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: noteToEdit.title,
                content: noteToEdit.content,
              }),
            }
          );

          if (response.ok) {
            await handleFetchNotes();
            setIsEditingNote(false);
            setNoteToEdit(null);
          }
        } catch (error) {
          console.error("Error updating note:", error);
        }
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingNote(false);
    setNoteToEdit(null);
  };

  // Toggle theme state
  const handleThemeToggle = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`h-[100vh] lg:py-[70px] lg:px-[150px] xs:py-[20px] xs:px-[20px] flex flex-col gap-[50px] items-center ${
        isDarkTheme ? "bg-gray-100" : "bg-[#101927]"
      }`}
    >
      {/* Header */}
      <div
        className={`w-full rounded-[20px] ${
          isAddNoteVisible || isConfirmingDelete || isEditingNote
            ? "blur-md opacity-20"
            : ""
        } ${isDarkTheme ? "bg-[#101927] text-white" : "bg-white"}`}
      >
        <div className="flex flex-col md:flex-row w-full justify-between p-[20px] md:px-[50px] md:py-[20px] rounded-[20px] items-center gap-4">
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <img src="/avatar.png" alt="" className="w-[40px] h-[40px]" />
            <h2 className="text-xl md:text-2xl font-bold">{userName}</h2>
          </div>

          <div className="flex items-center w-full md:w-auto gap-[10px] md:gap-[20px]">
            <input
              className="w-full md:w-auto focus:outline-none bg-[#E2E7E8] rounded-[10px] px-[10px] md:px-[40px] py-[8px] md:py-[10px] text-black"
              placeholder="Search..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <Switch
              size="md"
              color="success"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              checked={isDarkTheme}
              onChange={handleThemeToggle}
            />
            <button
              className="p-[8px] rounded-[10px] bg-[#2563EB] flex justify-center items-center w-[40px] h-[40px]"
              onClick={toggleAddNote}
            >
              <img src="/plus.png" alt="" className="w-[20px] h-[20px]" />
            </button>
            <button
              className="xl:p-[8px] rounded-[10px] bg-[#ff3737] text-white text-sm sm:text-base md:p-[6px]"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Show AddNote modal if isAddNoteVisible is true */}
      {isAddNoteVisible && <AddNote onNoteCreated={handleFetchNotes} />}

      {/* Display the notes for the logged-in user */}
      <div
        className={`w-[100%] flex flex-col items-center ${
          isAddNoteVisible ? "blur-md opacity-20" : ""
        } ${isConfirmingDelete ? "blur-md opacity-20" : ""} ${
          isEditingNote ? "blur-md opacity-20" : ""
        }`}
      >
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={() => {
                setIsConfirmingDelete(true); // Show confirmation panel
                setNoteToDelete(note.id); // Set the note ID to delete
                setNoteTitleToDelete(note.title); // Set the note title to delete
              }}
              onEdit={handleEditNote} // Pass edit function to Note component
            />
          ))
        ) : (
          <p className={`${isDarkTheme ? "text-black" : "text-white"}`}>
            No notes available
          </p>
        )}
      </div>

      {/* Confirmation panel for deleting a note */}
      <ConfirmDelete
        isVisible={isConfirmingDelete}
        onConfirm={handleDeleteNote}
        onCancel={handleCancelDelete}
        noteTitle={noteTitleToDelete} // Pass the note title
      />

      {/* Edit Note Modal */}
      {isEditingNote && noteToEdit && (
        <div className="fixed flex inset-0 flex-col items-center gap-2 bg-black bg-opacity-50 px-4">
          <div className="flex flex-col items-center mt-[100px] w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl">
            <h1 className="pb-4 text-xl sm:text-2xl">Edit Note</h1>
            <hr className="border-black w-full mb-4" />
            <input
              className="w-full focus:outline-none placeholder-gray-400 mb-4 px-2 py-2 sm:py-3"
              type="text"
              value={noteToEdit.title}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              className="w-full focus:outline-none resize-none placeholder-gray-400 px-2 py-2 sm:py-3 mb-4"
              value={noteToEdit.content}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, content: e.target.value })
              }
              placeholder="Content"
            ></textarea>
            <div className="flex justify-between w-full gap-4">
              <button
                className="bg-[#2563eb] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
