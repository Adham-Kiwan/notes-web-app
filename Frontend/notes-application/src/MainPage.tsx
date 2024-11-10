import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import AddNote from "./AddNote";
import useStore from "./store";
import Note from "./Note"; // Assuming you have a Note component
import ConfirmDelete from "./ConfirmDelete"; // Import the ConfirmDelete component

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

  // Load the user name from local storage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }

    // Fetch notes when the component mounts
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

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("name"); // Remove name from local storage
    window.location.reload(); // Optionally reload to redirect to login page
  };

  // Function to handle delete note
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
            ); // Remove the deleted note from the state
            setIsConfirmingDelete(false); // Close the confirmation panel
            setNoteToDelete(null); // Reset the note to delete
            setNoteTitleToDelete(null); // Reset the note title to delete
          } else {
            console.error("Failed to delete note:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      }
    }
  };

  // Function to handle canceling the delete action
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false); // Close the confirmation panel
    setNoteToDelete(null); // Reset the note to delete
    setNoteTitleToDelete(null); // Reset the note title to delete
  };

  // Function to handle editing a note
  const handleEditNote = (note: any) => {
    setNoteToEdit(note); // Set the note to edit
    setIsEditingNote(true); // Set editing state to true
  };

  // Function to save the edited note
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
            // Refresh the notes after editing
          await handleFetchNotes();
            setIsEditingNote(false); // Close edit mode
            setNoteToEdit(null); // Reset the note being edited
          }
        } catch (error) {
          console.error("Error updating note:", error);
        }
      }
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setIsEditingNote(false); // Close edit mode
    setNoteToEdit(null); // Reset the note being edited
  };

  return (
    <div className="py-[70px] px-[150px] flex flex-col gap-[50px] items-center">
      {/* Header */}
      <div
        className={`w-[100%] ${isAddNoteVisible ? "blur-md opacity-20" : ""} ${
          isConfirmingDelete ? "blur-md opacity-20" : ""
        } ${isEditingNote ? "blur-md opacity-20" : ""}`}
      >
        <div className="flex w-[100%] justify-between px-[50px] py-[20px] rounded-[20px] bg-[#ffffff] items-center">
          <div className="flex items-center gap-[20px]">
            <img src="/avatar.png" alt="" />
            <h2 className="text-2xl font-bold">{userName}</h2>{" "}
            {/* Display user name */}
          </div>
          <div className="flex items-center gap-[20px]">
            <input
              className="focus:outline-none bg-[#E2E7E8] pr-[200px] rounded-[10px] pl-[40px] py-[10px]"
              placeholder="Search..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <Switch
              size="md"
              color="success"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            />
            <button
              className="p-[10px] rounded-[10px] bg-[#2563EB] flex justify-center items-center"
              onClick={toggleAddNote}
            >
              <img src="/plus.png" alt="" />
            </button>
            <button
              className="p-[8px] rounded-[10px] bg-[#ff3737] text-white"
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
          <p>No notes available</p>
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
        <div className="fixed w-[500px] flex flex-col items-center gap-[10px] bg-white p-[30px] rounded-lg">
          <h1>Edit Note</h1>
          <hr className="border-black w-full" />
          <input
            className="w-full focus:outline-none placeholder-gray-400"
            type="text"
            value={noteToEdit.title}
            onChange={(e) =>
              setNoteToEdit({ ...noteToEdit, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            className="w-full focus:outline-none resize-none placeholder-gray-400 px-[0px] pt-[30px] pb-[200px]"
            value={noteToEdit.content}
            onChange={(e) =>
              setNoteToEdit({ ...noteToEdit, content: e.target.value })
            }
            placeholder="Content"
          ></textarea>
          <div className="flex justify-between w-full">
            <button
              className="bg-[#2563EB] p-[10px] rounded-lg"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 p-[10px] rounded-lg"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
