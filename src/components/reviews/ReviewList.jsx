import StarRating from "../common/StarRating";

export default function ReviewList({ reviews = [], rating = 0, numReviews = 0 }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarRating value={rating} />
          <span className="text-sm text-neutral-600">{numReviews} reviews</span>
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className="rounded-md bg-neutral-100 px-4 py-3 text-sm text-neutral-700">No reviews yet</div>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r._id || r.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-neutral-900">{r.user?.name || r.name || "User"}</div>
                <StarRating value={r.rating} size={16} />
              </div>
              <p className="mt-2 text-sm text-neutral-700">{r.comment}</p>
              <div className="mt-2 text-xs text-neutral-500">
                {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
