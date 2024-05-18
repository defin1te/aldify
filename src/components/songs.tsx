import { db } from "@/db";

export const Songs = async () => {
  const songs = await db.song.findMany();

  return (
    <div className="w-full space-y-3">
      <h2 className="text-2xl font-bold">Songs</h2>
      {songs &&
        songs.map((song) => (
          <div key={song.id} className="border rounded-md p-3">
            <h3>song: {song.title}</h3>
            <p>duration: {song.duration / 60} minutes.</p>
          </div>
        ))}
    </div>
  );
};