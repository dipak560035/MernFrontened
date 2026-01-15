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







