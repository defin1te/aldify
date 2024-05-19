import { db } from "@/db";

export async function POST(request: Request) {
  const { rating, songId, userId } = await request.json();

  const response = await db.rating.upsert({
    where: {
      songId_userId: {
        songId,
        userId,
      },
    },
    update: {
      value: rating,
    },
    create: {
      value: rating,
      songId,
      userId,
    },
  });

  return Response.json({ rating: response });
}
