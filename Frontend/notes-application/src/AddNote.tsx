import React from "react";
import useStore from "./store"; // Import the store

function AddNote() {
  const { toggleAddNote } = useStore();

  return (
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <div className="flex flex-col w-[500px] rounded-[20px] p-[20px] bg-[#ffffff]">
        <div className="flex justify-between">
          <input
            className="placeholder-gray-400 focus:outline-none w-[100%] px-[0px] py-[30px]"
            type="text"
            placeholder="Title"
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
          <input
            className="placeholder-gray-400 focus:outline-none px-[0px] pt-[30px] pb-[200px]"
            type="text"
            placeholder="Note..."
          />
          <div className="flex justify-end">
            <button className="px-[20px] py-[13px] rounded-[10px] text-white bg-[#2563EB]">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
