// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/slices/authSlice";
// import { useLoginMutation, useRegisterMutation } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const loginSchema = yup.object({
//   email: yup.string().email().required(),
//   password: yup.string().min(6).required(),
// });
// const registerSchema = yup.object({
//   name: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).required(),
// });

// export default function Account() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [login, { isLoading: loggingIn }] = useLoginMutation();
//   const [registerUser, { isLoading: registering }] = useRegisterMutation();
//   const loginForm = useForm({ resolver: yupResolver(loginSchema) });
//   const registerForm = useForm({ resolver: yupResolver(registerSchema) });

//   const onLogin = async (v) => {
//     try {
//       const data = await login({ email: v.email, password: v.password }).unwrap();
//       dispatch(loginSuccess({ token: data.token, user: data.user }));
//       toast.success("Logged in");
//       navigate("/");
//     } catch (e) {
//       console.error("Login failed", e);
//       toast.error("Login failed");
//     }
//   };
//   const onRegister = async (v) => {
//     try {
//       const data = await registerUser({ name: v.name, email: v.email, password: v.password }).unwrap();
//       dispatch(loginSuccess({ token: data.token, user: data.user }));
//       toast.success("Registration successful");
//       navigate("/");
//     } catch (e) {
//       console.error("Register failed", e);
//       toast.error("Registration failed");
//     }
//   };

//   return (
//     <>
//       <PageHero title="My Account" />

//       <Container className="py-16">
//         <div className="grid gap-12 md:grid-cols-2">
//           <div>
//             <h3 className="mb-4 text-xl font-semibold">Log In</h3>
//             <form className="space-y-4" onSubmit={loginForm.handleSubmit(onLogin)}>
//               <Input placeholder="Username or email address" {...loginForm.register("email")} />
//               <Input type="password" placeholder="Password" {...loginForm.register("password")} />
//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" {...loginForm.register("remember")} />
//                 Remember me
//               </label>
//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" {...loginForm.register("admin")} />
//                 Login as Admin
//               </label>
//               <Button type="submit" disabled={loggingIn}>
//                 {loggingIn ? "Logging in..." : "Log In"}
//               </Button>
//             </form>
//           </div>
//           <div>
//             <h3 className="mb-4 text-xl font-semibold">Register</h3>
//             <form className="space-y-4" onSubmit={registerForm.handleSubmit(onRegister)}>
//               <Input placeholder="Username" {...registerForm.register("name")} />
//               <Input placeholder="Email address" {...registerForm.register("email")} />
//               <Input type="password" placeholder="Password" {...registerForm.register("password")} />
//               <p className="text-sm text-neutral-600">
//                 Your personal data will be used to support your experience throughout this website.
//               </p>
//               <Button type="submit" variant="outline" disabled={registering}>
//                 {registering ? "Registering..." : "Register"}
//               </Button>
//             </form>
//           </div>
//         </div>
//       </Container>
      
//     </>
//   );
// }













































import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { useLoginMutation, useRegisterMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  admin: yup.boolean(),
});

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [registerUser, { isLoading: registering }] = useRegisterMutation();

  const loginForm = useForm({ resolver: yupResolver(loginSchema) });
  const registerForm = useForm({ resolver: yupResolver(registerSchema) });
const [showLoginPass, setShowLoginPass] = useState(false);
const [showRegisterPass, setShowRegisterPass] = useState(false);

  const onLogin = async (v) => {
    try {
      // send admin flag to backend
      const data = await login({
        email: v.email,
        password: v.password,
        admin: v.admin || false,
      }).unwrap();

      // dispatch login to redux
      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user, // must include role from backend ('user' or 'admin')
        })
      );

      toast.success("Logged in");
      navigate("/");
    } catch (e) {
      console.error("Login failed", e);
      toast.error(e?.data?.message || "Login failed");
    }
  };

  const onRegister = async (v) => {
    try {
      const data = await registerUser({
        name: v.name,
        email: v.email,
        password: v.password,
      }).unwrap();

      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user, // role should default to 'user' from backend
        })
      );

      toast.success("Registration successful");
      navigate("/");
    } catch (e) {
      console.error("Register failed", e);
      toast.error(e?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <PageHero title="My Account" />

      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* LOGIN FORM */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Log In</h3>
            <form className="space-y-4" onSubmit={loginForm.handleSubmit(onLogin)}>
              <Input placeholder="Username or email address" {...loginForm.register("email")} />
              {/* <Input type="password" placeholder="Password" {...loginForm.register("password")} /> */}

   <div className="relative">
  <Input
    type={showLoginPass ? "text" : "password"}
    placeholder="Password"
    {...loginForm.register("password")}
  />

  <button
    type="button"
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
    onClick={() => setShowLoginPass(!showLoginPass)}
  >
    {showLoginPass ? "Hide" : "Show"}
  </button>
</div>


              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...loginForm.register("remember")} />
                Remember me
              </label>

              {/* <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...loginForm.register("admin")} />
                Login as Admin
              </label> */}

              <Button type="submit" disabled={loggingIn}>
                {loggingIn ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </div>

          {/* REGISTER FORM */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Register</h3>
            <form className="space-y-4" onSubmit={registerForm.handleSubmit(onRegister)}>
              <Input placeholder="Username" {...registerForm.register("name")} />
              <Input placeholder="Email address" {...registerForm.register("email")} />
              {/* <Input type="password" placeholder="Password" {...registerForm.register("password")} /> */}
<div className="relative">
  <Input
    type={showRegisterPass ? "text" : "password"}
    placeholder="Password"
    {...registerForm.register("password")}
  />

  <button
    type="button"
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
    onClick={() => setShowRegisterPass(!showRegisterPass)}
  >
    {showRegisterPass ? "Hide" : "Show"}
  </button>
</div>





              {/* <p className="text-sm text-neutral-600">
                Your personal data will be used to support your experience throughout this website.
              </p> */}

              <Button type="submit" variant="outline" disabled={registering}>
                {registering ? "Registering..." : "Register"}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
