"use client";
import { type Song } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const { songs } = await response.json();
      setSongs(songs);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full">
        <input
          placeholder="enter song name"
          className="px-2 py-1 bg-gray-600 w-full rounded-l-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-2 py-1 bg-blue-500 disabled:bg-blue-500/40 rounded-r-md"
          onClick={handleClick}
          disabled={query === ""}
        >
          search
        </button>
      </div>

      {loading && (
        <div className="my-3 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {songs && (
        <div className="my-6 space-y-3">
          <h3 className="text-lg font-bold">Results</h3>
          {songs.length > 0 ? (
            songs.map((song) => (
              <div
                key={song.id}
                className="border border-gray-500 rounded-md p-2"
              >
                <b>{song.title}</b>
              </div>
            ))
          ) : (
            <div>no songs found</div>
          )}
        </div>
      )}
    </div>
  );
};
