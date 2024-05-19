import { db } from "@/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Artists = async () => {
  const artists = await db.artist.findMany();

  return (
    <div className="w-full space-y-3">
      <h2 className="text-2xl font-bold">Artists</h2>
      {artists &&
        artists.map((artist) => (
          <div key={artist.id} className="hover:bg-gray-800 hover:duration-300">
            <Link href={`/artist/${artist.id}`}>
              <div className="border border-gray-500 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <h3 className="text-lg font-bold">{artist.name}</h3>
                </div>
                <ArrowRight />
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
