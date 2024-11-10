import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import AddNote from "./AddNote";
import useStore from "./store";
import Note from "./Note"; // Assuming you have a Note component

function MainPage() {
  const { isAddNoteVisible, toggleAddNote } = useStore();
  const [userName, setUserName] = useState("");
  const [notes, setNotes] = useState<any[]>([]); // Use proper type for notes

  // Load the user name from local storage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }

    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:2000/notes", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched notes:", data); // Log the response

            if (data && Array.isArray(data.notes)) {
              setNotes(data.notes); // Safely set notes if the response is valid
            } else {
              console.error("Response doesn't contain notes");
              setNotes([]); // Set to empty array in case of error
            }
          } else {
            console.error("Failed to fetch notes:", response.statusText);
            setNotes([]); // Set to empty array if request fails
          }
        } catch (error) {
          console.error("Error fetching notes:", error);
          setNotes([]); // Set to empty array in case of network or other errors
        }
      }
    };

    fetchNotes();
  }, []); // Empty dependency array ensures this runs once when component mounts

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("name"); // Remove name from local storage
    window.location.reload(); // Optionally reload to redirect to login page
  };

  // Function to fetch notes
  const handleFetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:2000/notes", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
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

  return (
    <div className="py-[70px] px-[150px] flex flex-col gap-[50px] items-center">
      {/* Header */}
      <div className={`w-[100%] ${isAddNoteVisible ? "blur-md opacity-20" : ""}`}>
        <div className="flex w-[100%] justify-between px-[50px] py-[20px] rounded-[20px] bg-[#ffffff] items-center">
          <div className="flex items-center gap-[20px]">
            <img src="/avatar.png" alt="" />
            <h2 className="text-2xl font-bold">{userName}</h2> {/* Display user name */}
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
              className="p-[10px] rounded-[10px] bg-[#FF0000] text-white"
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
      <div className={`w-[100%] ${isAddNoteVisible ? "blur-md opacity-20" : ""}`}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note key={note.id} note={note} />
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
