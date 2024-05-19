import Link from "next/link";
import { db } from "@/db";
import { Rating } from "@/components/ui/rating";
import { auth } from "@/auth";
import { Comments } from "@/components/comments";
import { formatDuration } from "@/lib/utils";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const session = await auth();
  const song = await db.song.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      album: true,
      artist: true,
    },
  });

  const getOverallRating = async (songId: number) => {
    const ratings = await db.rating.findMany({
      where: { songId },
    });

    if (!ratings.length) return 0;

    const total = ratings.reduce((sum, rating) => sum + rating.value, 0);
    return total / ratings.length;
  };

  if (!song) {
    return (
      <div className="text-center">
        <p>song with id {params.id} does not exist</p>
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

      <div className="flex items-center justify-between mt-3 mb-6">
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-16 rounded-md object-cover"
            src={song.image}
            alt={song.title}
          />
          <div>
            <h3 className="text-xl font-bold">{song.title}</h3>
            <div>
              by{" "}
              <Link href={`/artist/${song.artist.id}`} className="underline">
                {song.artist.name}
              </Link>
            </div>
          </div>
        </div>

        <p>{formatDuration(song.duration)}</p>
      </div>

      <div className="my-3">
        album:{" "}
        <Link href={`/album/${song.album.id}`} className="underline">
          {song.album.title}
        </Link>
      </div>

      <div className="my-3">
        {session?.user?.id ? (
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Rating</h3>
            <Rating
              songId={song.id}
              userId={session.user.id}
              variant="yellow"
              rating={await getOverallRating(song.id)}
              totalStars={5}
            />
          </div>
        ) : (
          <p>sign in to rate the song</p>
        )}
      </div>

      {session?.user?.id ? (
        <Comments songId={song.id} userId={session.user.id} />
      ) : (
        <p>sign in to see comments</p>
      )}
    </>
  );
}
