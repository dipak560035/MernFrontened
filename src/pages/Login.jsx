// import { useLoginMutation } from "@/services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/user/userSlice";


// export default function Login() {
//   const [login, { isLoading }] = useLoginMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await login(data).unwrap();
//       localStorage.setItem("token", res.token);
//       dispatch(setUser(res.user));
//       toast.success("Logged in");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} placeholder="Enter username" />
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} placeholder="Enter password" />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }





// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/user/userSlice";
// import { useLoginUserMutation } from "@/app/mainApi";

// export default function Login() {
//   const [loginUser, { isLoading }] = useLoginUserMutation(); // useLoginUserMutation
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       // backend expects { email, password }
//       const res = await loginUser({ email: data.email, password: data.password }).unwrap();

//       // Save token in localStorage
//       localStorage.setItem("token", res.token);

//       // Save user in redux state
//       dispatch(setUser({ user: res.user, token: res.token }));

//       toast.success("Logged in successfully!");
//       navigate("/"); // redirect to home
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input
//             type="email"
//             {...register("email", { required: true })}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input
//             type="password"
//             {...register("password", { required: true })}
//             placeholder="Enter your password"
//           />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }











// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/user/userSlice";
// import { useLoginUserMutation } from "@/app/mainApi";

// export default function Login() {
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await loginUser(data).unwrap();

//       // Save token to localStorage
//       localStorage.setItem("token", res.token);

//       // Save user to Redux store
//       dispatch(setUser(res.user));

//       toast.success("Logged in!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Username</Label>
//           <Input {...register("username")} placeholder="Enter username" />
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} placeholder="Enter password" />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }































// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/slices/userSlice";
// import { useLoginUserMutation } from "@/app/mainApi";

// export default function Login() {
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async ({ email, password }) => {
//     try {
//       const res = await loginUser({ email, password }).unwrap();

//       localStorage.setItem("token", res.token);
//       dispatch(setUser(res.user));

//       toast.success("Logged in!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input {...register("email")} type="email" placeholder="Enter email" />
//         </div>

//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input {...register("password")} type="password" placeholder="Enter password" />
//         </div>

//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>

//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }










// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/user/userSlice";
// import { useLoginUserMutation } from "@/app/mainApi";

// export default function Login() {
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await loginUser(data).unwrap();
//       localStorage.setItem("token", res.token);
//       dispatch(setUser(res.user));
//       toast.success("Logged in!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input {...register("email")} placeholder="Enter email" />
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} placeholder="Enter password" />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }









// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/slices/userSlice";
// import { useLoginUserMutation } from "@/app/mainApi";

// export default function Login() {
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const res = await loginUser(data).unwrap();

//   //     localStorage.setItem("token", res.token);
//   //     dispatch(setUser(res.user));

//   //     toast.success("Logged in!");
//   //     navigate("/");
//   //   } catch (err) {
//   //     toast.error(err?.data?.message || "Login failed");
//   //   }
//   // };


//   const onSubmit = async (data) => {
//   try {
//     const res = await loginUser(data).unwrap();

//     dispatch(
//       setUser({
//         user: res.user,
//         token: res.token,
//       })
//     );

//     toast.success("Logged in!");
//     navigate("/");
//   } catch (err) {
//     toast.error(err?.data?.message || "Login failed");
//   }
// };


//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Email</Label>
//           <Input type="email" {...register("email")} placeholder="Enter email" />
//         </div>
//         <div className="space-y-2">
//           <Label>Password</Label>
//           <Input type="password" {...register("password")} placeholder="Enter password" />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <p className="mt-4 text-sm">
//         No account? <Link to="/signup" className="text-primary">Sign up</Link>
//       </p>
//     </div>
//   );
// }














import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { useLoginUserMutation } from "@/app/mainApi";

export default function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();

      // dispatch user + token to Redux
      dispatch(
        setUser({
          user: res.user,
          token: res.token,
        })
      );

      toast.success("Logged in!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" {...register("email")} placeholder="Enter email" />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" {...register("password")} placeholder="Enter password" />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        No account? <Link to="/signup" className="text-primary">Sign up</Link>
      </p>
    </div>
  );
}
