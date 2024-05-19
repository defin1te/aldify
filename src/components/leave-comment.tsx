"use client";
import { useState } from "react";

type Props = { songId: number; userId: string };

export const LeaveComment = ({ songId, userId }: Props) => {
  const [text, setText] = useState("");

  const handleClick = async () => {
    setText("");
    const response = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ text, songId, userId }),
    });
    const data = await response.json();
  };

  return (
    <div className="flex">
      <input
        className="px-2 bg-gray-600"
        placeholder="write a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="px-2 bg-blue-500" onClick={handleClick}>
        submit
      </button>
    </div>
  );
};
