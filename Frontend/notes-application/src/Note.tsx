import React from "react";

interface NoteProps {
  note: {
    title: string;
    content: string;
  };
}

function Note({ note }: NoteProps) {
  return (
    <div className="text-white flex flex-col w-[600px] px-[50px] py-[20px] rounded-[15px] bg-[#2563EB] mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl">{note.title}</h3>
        <div className="flex items-center gap-[20px]">
          <img className="cursor-pointer" src="/share.png" alt="" />
          <img className="cursor-pointer" src="/edit.png" alt="" />
          <img className="cursor-pointer" src="/trash.png" alt="" />
        </div>
      </div>
      <hr className="border-[#000000] my-[20px]" />
      <div>{note.content}</div>
    </div>
  );
}

export default Note;
