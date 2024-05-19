import { db } from "@/db";
import { LeaveComment } from "./leave-comment";
import Image from "next/image";

type Props = { songId: number; userId: string };

export const Comments = async ({ songId, userId }: Props) => {
  const reviews = await db.review.findMany({
    where: { songId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h3>comments</h3>
      <div className="my-3">
        <LeaveComment songId={songId} userId={userId} />
      </div>
      <div className="space-y-3">
        {reviews.length ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-500 rounded-md p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    alt="avatar"
                    width={32}
                    height={32}
                    src={
                      review.user!.image ||
                      "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                    }
                    className="w-8 h-8 border rounded-full"
                  />
                  <b>{review.user!.name}</b>
                </div>
                <div>{new Date(review.createdAt).toLocaleString()}</div>
              </div>
              {review.text}
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};
