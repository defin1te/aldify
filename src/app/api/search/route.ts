import { db } from "@/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")!;

  const songs = await db.song.findMany({
    where: {
      title: {
        search: q,
      },
    },
  });

  return Response.json({ songs });
}
