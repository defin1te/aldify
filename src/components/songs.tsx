import Link from "next/link";
import { db } from "@/db";
import { formatDuration } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";

export const Songs = async () => {
  const songs = await db.song.findMany();

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Songs</h2>
        <Link
          href="/search"
          className="flex items-center gap-2 px-2 border rounded-md hover:bg-gray-800 hover:duration-300"
        >
          <Search width={16} height={16} />
          Search
        </Link>
      </div>
      {songs &&
        songs.map((song) => (
          <div key={song.id} className="hover:bg-gray-800 hover:duration-300">
            <Link href={`/song/${song.id}`}>
              <div className="border border-gray-500 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{song.title}</h3>
                    <p>duration: {formatDuration(song.duration)}</p>
                  </div>
                </div>
                <ArrowRight />
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
