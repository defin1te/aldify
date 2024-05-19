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

  console.log("created", review);

  return Response.json({ review });
}
