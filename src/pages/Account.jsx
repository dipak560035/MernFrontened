import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Account() {
  const dispatch = useDispatch();
  const loginForm = useForm({ resolver: yupResolver(loginSchema) });
  const registerForm = useForm({ resolver: yupResolver(registerSchema) });

  const onLogin = (v) => {
    dispatch(loginSuccess({ token: "demo-token", user: { email: v.email, role: v.admin ? "admin" : "user" } }));
  };
  const onRegister = (v) => {
    dispatch(loginSuccess({ token: "demo-token", user: { email: v.email, role: "user" } }));
  };

  return (
    <>
      <PageHero title="My Account" />

      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Log In</h3>
            <form className="space-y-4" onSubmit={loginForm.handleSubmit(onLogin)}>
              <Input placeholder="Username or email address" {...loginForm.register("email")} />
              <Input type="password" placeholder="Password" {...loginForm.register("password")} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...loginForm.register("remember")} />
                Remember me
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...loginForm.register("admin")} />
                Login as Admin
              </label>
              <Button type="submit">Log In</Button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Register</h3>
            <form className="space-y-4" onSubmit={registerForm.handleSubmit(onRegister)}>
              <Input placeholder="Email address" {...registerForm.register("email")} />
              <Input type="password" placeholder="Password" {...registerForm.register("password")} />
              <p className="text-sm text-neutral-600">
                Your personal data will be used to support your experience throughout this website.
              </p>
              <Button type="submit" variant="outline">
                Register
              </Button>
            </form>
          </div>
        </div>
      </Container>
      
    </>
  );
}
