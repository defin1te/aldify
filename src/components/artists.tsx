import { db } from "@/db";

export const Artists = async () => {
  const artists = await db.artist.findMany();

  return (
    <div className="w-full space-y-3">
      <h2 className="text-2xl font-bold">Artists</h2>
      {artists &&
        artists.map((artist) => (
          <div key={artist.id} className="border rounded-md p-3">
            <h3>name: {artist.name}</h3>
          </div>
        ))}
    </div>
  );
};
