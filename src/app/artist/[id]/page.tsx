import Link from "next/link";
import { db } from "@/db";
import { formatDuration } from "@/lib/utils";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const artist = await db.artist.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      albums: true,
      songs: true,
    },
  });

  if (!artist) {
    return (
      <div className="text-center">
        <p>artist with id {params.id} does not exist</p>
        <Link className="underline" href="/">
          go home
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="text-center">
        <Link className="underline" href="/">
          go home
        </Link>
      </div>

      <div className="flex items-center justify-center gap-3 my-6">
        <img
          className="w-16 h-16 rounded-md object-cover"
          src={artist.image}
          alt={artist.name}
        />
        <h3 className="text-xl font-bold">{artist.name}</h3>
      </div>

      <div className="grid grid-cols-2 divide-x">
        <div className="px-3">
          <h3 className="text-lg font-bold text-center">albums</h3>
          <div className="space-y-3">
            {artist.albums.map((album) => (
              <div key={album.id}>
                <Link className="underline" href={`/album/${album.id}`}>
                  {album.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="px-3">
          <h3 className="text-lg font-bold text-center">songs</h3>
          <div className="space-y-3">
            {artist.songs.map((song) => (
              <Link
                key={song.id}
                className="underline flex items-center justify-between"
                href={`/song/${song.id}`}
              >
                <span>{song.title}</span>
                <span>{formatDuration(song.duration)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
