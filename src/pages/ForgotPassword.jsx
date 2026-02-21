// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useForgotPasswordMutation } from "../services/api";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Link } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const v = email.trim();
//     if (!v || !v.includes("@")) {
//       toast.error("Please enter a valid email");
//       return;
//     }
//     try {
//       await forgotPassword({ email: v }).unwrap();
//       toast.success("Reset link sent to your email");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to send reset link");
//     }
//   };

//   return (
//     <>
//       <PageHero title="Forgot Password" />
//       <Container className="py-16">
//         <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold text-center">Reset your password</h2>
//           <p className="mb-6 text-sm text-neutral-600 text-center">
//             Enter your email address and we’ll send you a reset link.
//           </p>
//           <form onSubmit={onSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-1">
//                 Email address
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 aria-required="true"
//               />
//             </div>
//             <Button type="submit" disabled={isLoading} className="w-full">
//               {isLoading ? "Sending..." : "Send Reset Link"}
//             </Button>
//             {isSuccess && (
//               <div role="alert" className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
//                 Reset link sent to your email
//               </div>
//             )}
//             <div className="text-center text-sm">
//               <Link to="/account" className="text-neutral-700 hover:text-black">
//                 Back to Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </>
//   );
// }











import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForgotPasswordMutation } from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || !v.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      await forgotPassword({ email: v }).unwrap();
      toast.success("Reset link sent to your email");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <>
      <PageHero title="Forgot Password" />
      <Container className="py-16">
        <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-center">Reset your password</h2>
          <p className="mb-6 text-sm text-neutral-600 text-center">
            Enter your email address and we’ll send you a reset link.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            {isSuccess && (
              <div role="alert" className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Reset link sent to your email
              </div>
            )}

            <div className="text-center text-sm">
              <Link to="/account" className="text-neutral-700 hover:text-black">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

