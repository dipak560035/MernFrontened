import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { useRegisterUserMutation } from "@/app/mainApi";

const schema = Yup.object({
  username: Yup.string().min(3, "Min 3 characters").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

export default function Signup() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, email, password }) => {
    try {
      const res = await registerUser({ username, email, password }).unwrap();

      localStorage.setItem("token", res.token);
      dispatch(setUser(res.user));

      toast.success("Signup successful 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Username</Label>
          <Input {...register("username")} />
          {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
      </p>
    </div>
  );
}









// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/user/userSlice";
// import { useRegisterUserMutation } from "@/app/mainApi";

// const schema = Yup.object({
//   username: Yup.string().min(3).required("Username is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords do not match")
//     .required("Confirm password is required"),
// });

// export default function Signup() {
//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async ({ username, email, password }) => {
//     try {
//       const res = await registerUser({ username, email, password }).unwrap();
//       localStorage.setItem("token", res.token);
//       dispatch(setUser(res.user));
//       toast.success("Signup successful 🎉");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} />
//           {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} />
//           {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} />
//           {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Confirm Password</Label>
//           <Input type="password" {...register("confirmPassword")} />
//           {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
//         </div>
//         <Button disabled={isLoading} type="submit" className="w-full">
//           {isLoading ? "Creating..." : "Create Account"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
//       </p>
//     </div>
//   );
// }























// import { useNavigate, Link } from "react-router
// -dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useRegisterUserMutation } from "@/app/mainApi";

// const schema = Yup.object({
//   username: Yup.string().min(3).required(),
//   email: Yup.string().email().required(),
//   password: Yup.string().min(6).required(),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords do not match")
//     .required(),
// });

// export default function Signup() {
//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();
  
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async ({ username, email, password }) => {
//     try {
//       await registerUser({ username, email, password }).unwrap();
//       toast.success("Account created! Please login.");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Create Account</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} />
//           {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} />
//           {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} />
//           {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Confirm Password</Label>
//           <Input type="password" {...register("confirmPassword")} />
//           {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
//         </div>

//         <Button disabled={isLoading} type="submit" className="w-full">
//           {isLoading ? "Creating..." : "Create Account"}
//         </Button>
//       </form>

//       <p className="mt-4 text-sm">
//         Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
//       </p>
//     </div>
//   );
// }






























// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/slices/userSlice";
// import { useRegisterUserMutation } from "@/app/mainApi"; // <-- ensure correct path

// const schema = Yup.object({
//   username: Yup.string().min(3).required("Username is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords do not match")
//     .required("Confirm password is required"),
// });

// export default function Signup() {
//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async ({ username, email, password }) => {
//     try {
//       const res = await registerUser({ username, email, password }).unwrap();

//       // store token locally
//       localStorage.setItem("token", res.token);

//       // save user to redux
//       dispatch(setUser(res.user));

//       toast.success("Signup successful 🎉");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Create Account</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} />
//           {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} />
//           {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} />
//           {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
//         </div>

//         <div className="space-y-2">
//           <Label>Confirm Password</Label>
//           <Input type="password" {...register("confirmPassword")} />
//           {errors.confirmPassword && (
//             <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
//           )}
//         </div>

//         <Button disabled={isLoading} type="submit" className="w-full">
//           {isLoading ? "Creating..." : "Create Account"}
//         </Button>
//       </form>

//       <p className="mt-4 text-sm">
//         Already have an account?{" "}
//         <Link to="/login" className="text-primary">
//           Sign in
//         </Link>
//       </p>
//     </div>
//   );
// }





















// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/slices/userSlice";
// import { useRegisterUserMutation } from "@/app/mainApi";

// const schema = Yup.object({
//   username: Yup.string().min(3).required(),
//   email: Yup.string().email().required(),
//   password: Yup.string().min(6).required(),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords do not match")
//     .required(),
// });

// export default function Signup() {
//   const [signup, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async ({ username, email, password }) => {
//     try {
//       const res = await signup({ username, email, password }).unwrap();
//       localStorage.setItem("token", res.token);
//       dispatch(setUser(res.user));
//       toast.success("Signup successful 🎉");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} />
//           {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} />
//           {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} />
//           {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
//         </div>
//         <div className="space-y-2">
//           <Label>Confirm Password</Label>
//           <Input type="password" {...register("confirmPassword")} />
//           {errors.confirmPassword && (
//             <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
//           )}
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Creating..." : "Create Account"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
//       </p>
//     </div>
//   );
// }











// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';   // ✅ integrate Yup
// import * as Yup from 'yup';                              // ✅ Yup validation
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { signup } from '../redux/slices/authSlice';
// import { ShoppingBag, LockKeyhole, LockKeyholeOpenIcon } from 'lucide-react'; // ✅ icons
// import { useState } from 'react';
// import toast from 'react-hot-toast';                     // ✅ toast notifications
// import { Spinner } from '@/components/ui/spinner';       // ✅ spinner

// // ✅ Yup schema for signup
// const signupSchema = Yup.object({
//   username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
//   email: Yup.string().email('Invalid email').optional(),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords do not match')
//     .required('Please confirm your password'),
// });

// export default function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);              // ✅ password toggle
//   const [loading, setLoading] = useState(false);        // ✅ loading state

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(signupSchema),                // ✅ hookform + Yup integration
//   });

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       await dispatch(signup(data)).unwrap();
//       toast.success('Signup successful 🎉');            // ✅ success toast
//       navigate('/');
//     } catch (err) {
//       toast.error(err?.message || 'Signup failed');     // ✅ error toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="space-y-1 text-center">
//           <div className="flex justify-center mb-4">
//             <div className="rounded-full bg-primary/10 p-3">
//               <ShoppingBag className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
//           <CardDescription className="text-base">
//             Sign up to start your shopping journey
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Username */}
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 placeholder="Choose a username"
//                 {...register('username')}
//                 className={errors.username ? 'border-destructive' : ''}
//               />
//               {errors.username && (
//                 <p className="text-sm text-destructive">{errors.username.message}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email (Optional)</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 {...register('email')}
//                 className={errors.email ? 'border-destructive' : ''}
//               />
//               {errors.email && (
//                 <p className="text-sm text-destructive">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password with toggle */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={show ? 'text' : 'password'}
//                   placeholder="Create a password"
//                   {...register('password')}
//                   className={errors.password ? 'border-destructive pr-9' : 'pr-9'}
//                 />
//                 <Button
//                   type="button"
//                   onClick={() => setShow(!show)}
//                   variant="ghost"
//                   size="icon"
//                   className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
//                 >
//                   {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}
//                   <span className="sr-only">Show password</span>
//                 </Button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-destructive">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 {...register('confirmPassword')}
//                 className={errors.confirmPassword ? 'border-destructive' : ''}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             {/* Submit button with spinner */}
//             {loading ? (
//               <Button type="button" disabled className="w-full" size="lg" variant="outline">
//                 <Spinner /> Creating Account...
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full" size="lg">
//                 Create Account
//               </Button>
//             )}
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <div className="text-sm text-center text-muted-foreground">
//             Already have an account?{' '}
//             <Link to="/login" className="text-primary font-medium hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }