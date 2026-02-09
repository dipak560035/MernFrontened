import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/button";
import Input from "../ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCreateReviewMutation } from "../../services/api";

export default function ReviewForm({ productId }) {
  const token = useSelector((s) => s.auth.token);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const r = Number(rating);
    const c = comment.trim();
    if (!r || r < 1 || r > 5 || !c) {
      toast.error("Please select rating and write a comment");
      return;
    }
    try {
      await createReview({ id: productId, body: { rating: r, comment: c } }).unwrap();
      toast.success("Review submitted");
      setRating("");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  if (!token) {
    return (
      <div className="rounded-md bg-neutral-100 px-4 py-3 text-sm">
        Please login to write a review.{" "}
        <Link to="/account" className="underline">Login</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="h-10 w-full rounded-md border px-3"
            required
          >
            <option value="">Select...</option>
            {[1,2,3,4,5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
































// import { useState } from "react";
// import { useSelector } from "react-redux";
// import Button from "../ui/button";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import { useCreateReviewMutation, useProductByIdQuery } from "../../services/api";

// export default function ReviewForm({ productId }) {
//   const token = useSelector((s) => s.auth.token);
//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");

//   // RTK Query mutation
//   const [createReview, { isLoading }] = useCreateReviewMutation();

//   // Optional: refetch product data to show updated reviews immediately
//   const { refetch: refetchProduct } = useProductByIdQuery(productId);

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const r = Number(rating);
//     const c = comment.trim();

//     if (!r || r < 1 || r > 5 || !c) {
//       toast.error("Please select a rating (1-5) and write a comment");
//       return;
//     }

//     try {
//       await createReview({ id: productId, body: { rating: r, comment: c } }).unwrap();
//       toast.success("Review submitted successfully ✅");
//       setRating("");
//       setComment("");

//       // Refetch product to update reviews immediately
//       refetchProduct();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to submit review ❌");
//       console.error(err);
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-md bg-neutral-100 px-4 py-3 text-sm">
//         Please login to write a review.{" "}
//         <Link to="/account" className="underline text-blue-600">Login</Link>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={onSubmit} className="mt-6 space-y-4">
//       {/* Rating Selector */}
//       <div>
//         <label className="block text-sm mb-1">Rating</label>
//         <select
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           className="h-10 w-full rounded-md border px-3"
//           required
//         >
//           <option value="">Select rating...</option>
//           {[1, 2, 3, 4, 5].map((n) => (
//             <option key={n} value={n}>{n}</option>
//           ))}
//         </select>
//       </div>

//       {/* Comment Box */}
//       <div>
//         <label className="block text-sm mb-1">Comment</label>
//         <textarea
//           rows={4}
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Write your review..."
//           className="w-full rounded-md border px-3 py-2"
//           required
//         />
//       </div>

//       {/* Submit Button */}
//       <Button type="submit" disabled={isLoading}>
//         {isLoading ? "Submitting..." : "Submit Review"}
//       </Button>
//     </form>
//   );
// }
