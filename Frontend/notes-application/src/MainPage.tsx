import React from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import AddNote from "./AddNote";
import useStore from "./store"; // Import the store

function MainPage() {
  const { isAddNoteVisible, toggleAddNote } = useStore();

  return (
    <div className="py-[70px] px-[150px] flex flex-col gap-[50px] items-center">
      {/* Header */}
      <div className={`w-[100%] ${isAddNoteVisible ? "blur-md opacity-20" : ""}`}>
        <div className="flex w-[100%] justify-between px-[50px] py-[20px] rounded-[20px] bg-[#ffffff] items-center">
          <div className="flex items-center gap-[20px]">
            <img src="/avatar.png" alt="" />
            <h2 className="text-2xl font-bold">Adham</h2>
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
              onClick={toggleAddNote} // Toggle AddNote modal visibility
            >
              <img src="/plus.png" alt="" />
            </button>
          </div>
        </div>
      </div>

      {/* Show AddNote modal if isAddNoteVisible is true */}
      {isAddNoteVisible && <AddNote />}
    </div>
  );
}

export default MainPage;
