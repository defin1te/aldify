import { db } from "@/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Albums = async () => {
  const albums = await db.album.findMany({ include: { artist: true } });

  return (
    <div className="w-full space-y-3">
      <h2 className="text-2xl font-bold">Albums</h2>
      {albums &&
        albums.map((album) => (
          <div key={album.id} className="hover:bg-gray-800 hover:duration-300">
            <Link href={`/album/${album.id}`}>
              <div className="border border-gray-500 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{album.title}</h3>
                    <p>by {album.artist.name}</p>
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
