// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useResetPasswordMutation } from "../services/api";
// import { useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { toast } from "sonner";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const p = password.trim();
//     const c = confirm.trim();
//     if (p.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
//     if (p !== c) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     try {
//       await resetPassword({ token, password: p }).unwrap();
//       toast.success("Password reset successful");
//       navigate("/account");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to reset password");
//     }
//   };

//   return (
//     <>
//       <PageHero title="Reset Password" />
//       <Container className="py-16">
//         <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold text-center">Create a new password</h2>
//           <form onSubmit={onSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-1">
//                 New password
//               </label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 aria-required="true"
//               />
//               <p className="mt-1 text-xs text-neutral-500">Minimum 6 characters</p>
//             </div>
//             <div>
//               <label htmlFor="confirm" className="block text-sm font-medium mb-1">
//                 Confirm password
//               </label>
//               <Input
//                 id="confirm"
//                 type="password"
//                 placeholder="••••••••"
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 aria-required="true"
//               />
//             </div>
//             <Button type="submit" disabled={isLoading} className="w-full">
//               {isLoading ? "Resetting..." : "Reset Password"}
//             </Button>
//             {isSuccess && (
//               <div role="alert" className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
//                 Password reset successfully
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
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useResetPasswordMutation } from "../services/api";

export default function ResetPassword() {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ token, password }).unwrap();
      toast.success("Password reset successful");
      navigate("/account"); // redirect to login
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <>
      <PageHero title="Reset Password" />
      <Container className="py-16">
        <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-center">Set a new password</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="text-center text-sm mt-4">
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