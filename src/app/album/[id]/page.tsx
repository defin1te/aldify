import Link from "next/link";
import { db } from "@/db";
import { formatDuration } from "@/lib/utils";
import { GoHome } from "@/components/go-home";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const album = await db.album.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      artist: true,
      songs: true,
    },
  });

  if (!album) {
    return (
      <div className="text-center">
        <p>album with id {params.id} does not exist</p>
        <Link className="underline" href="/">
          go home
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="text-center">
        <GoHome />
      </div>

      <div className="flex items-center justify-center gap-3 my-6">
        <img
          className="w-16 h-16 rounded-md object-cover"
          src={album.image}
          alt={album.title}
        />
        <div>
          <h3 className="text-xl font-bold">{album.title}</h3>
          <div>
            by{" "}
            <Link className="underline" href={`/artist/${album.artist.id}`}>
              {album.artist.name}
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="px-3">
          <h3 className="text-lg font-bold text-center">songs</h3>
          <div className="space-y-3">
            {album.songs ? (
              album.songs.map((song) => (
                <Link
                  key={song.id}
                  className="underline flex items-center justify-between"
                  href={`/song/${song.id}`}
                >
                  <span>{song.title}</span>
                  <span>{formatDuration(song.duration)}</span>
                </Link>
              ))
            ) : (
              <div>No songs in this album</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
