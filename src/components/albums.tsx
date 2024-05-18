import { db } from "@/db";

export const Albums = async () => {
  const albums = await db.album.findMany({ include: { artist: true } });

  return (
    <div className="w-full space-y-3">
      <h2 className="text-2xl font-bold">Albums</h2>
      {albums &&
        albums.map((album) => (
          <div key={album.id} className="border rounded-md p-3">
            <h3>album: {album.title}</h3>
            <p>released: {new Date(album.releaseDate).toLocaleDateString()}</p>
            <p>artist: {album.artist.name}</p>
          </div>
        ))}
    </div>
  );
};
