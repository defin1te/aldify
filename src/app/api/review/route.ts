import { db } from "@/db";

export async function POST(request: Request) {
  const { text, songId, userId } = await request.json();

  const review = await db.review.create({
    data: {
      text,
      songId,
      userId,
    },
  });

  return Response.json({ review });
}
