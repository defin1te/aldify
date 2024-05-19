import Link from "next/link";
import { db } from "@/db";
import { Rating } from "@/components/ui/rating";
import { auth } from "@/auth";
import { Comments } from "@/components/comments";

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
    <div>
      <div className="text-center">
        <Link className="underline" href="/">
          go home
        </Link>
      </div>

      <hr className="my-3" />

      <div>
        <h3>song: {song?.title}</h3>
        <p>duration: {song.duration / 60} minutes.</p>
      </div>

      <hr className="my-3" />

      <div>
        <p>artist: {song.artist.name}</p>
        <p>album: {song.album.title}</p>
      </div>

      <hr className="my-3" />

      {session?.user?.id ? (
        <div>
          <h3>rate the song:</h3>
          <Rating
            songId={song.id}
            userId={session.user.id}
            variant="yellow"
            rating={await getOverallRating(song.id)}
            totalStars={5}
            showText={false}
          />
        </div>
      ) : (
        <p>sign in to rate the song</p>
      )}

      <hr className="my-3" />

      {session?.user?.id ? (
        <Comments songId={song.id} userId={session.user.id} />
      ) : (
        <p>sign in to see comments</p>
      )}
    </div>
  );
}
