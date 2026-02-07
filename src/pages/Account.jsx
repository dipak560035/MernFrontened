import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../store/slices/authSlice";
import { useLoginMutation, useRegisterMutation, useUpdateProfileMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User, Mail, Lock, LogOut, Camera } from "lucide-react";

// Schemas
const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const profileSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().test('len', 'Password must be at least 6 characters', val => !val || val.length >= 6),
});

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((s) => s.auth);
  
  // Mutations
  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [registerUser, { isLoading: registering }] = useRegisterMutation();

  // Forms
  const loginForm = useForm({ resolver: yupResolver(loginSchema) });
  const registerForm = useForm({ resolver: yupResolver(registerSchema) });
  
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegisterPass, setShowRegisterPass] = useState(false);

  // Login Handler
  const onLogin = async (v) => {
    try {
      const data = await login({ email: v.email, password: v.password }).unwrap();
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (e) {
      console.error("Login failed", e);
      toast.error(e?.data?.message || "Login failed");
    }
  };

  // Register Handler
  const onRegister = async (v) => {
    try {
      const data = await registerUser({ name: v.name, email: v.email, password: v.password }).unwrap();
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      toast.success("Registration successful");
      navigate("/");
    } catch (e) {
      console.error("Register failed", e);
      toast.error(e?.data?.message || "Registration failed");
    }
  };

  if (token && user) {
    return <ProfileView user={user} />;
  }

  return (
    <>
      <PageHero title="My Account" />
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* LOGIN FORM */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Log In</h3>
            <form className="space-y-4" onSubmit={loginForm.handleSubmit(onLogin)}>
              <div>
                <label className="block text-sm font-medium mb-1">Email address</label>
                <Input placeholder="Enter your email" {...loginForm.register("email")} />
                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.email?.message}</p>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                    <Input
                      type={showLoginPass ? "text" : "password"}
                      placeholder="Enter your password"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500 hover:text-black"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                    >
                      {showLoginPass ? "Hide" : "Show"}
                    </button>
                </div>
                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password?.message}</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="remember" {...loginForm.register("remember")} />
                <label htmlFor="remember">Remember me</label>
              </div>

              <Button type="submit" disabled={loggingIn}>
                {loggingIn ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </div>

          {/* REGISTER FORM */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Register</h3>
            <form className="space-y-4" onSubmit={registerForm.handleSubmit(onRegister)}>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input placeholder="Enter your username" {...registerForm.register("name")} />
                <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.name?.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email address</label>
                <Input placeholder="Enter your email" {...registerForm.register("email")} />
                <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.email?.message}</p>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                    <Input
                      type={showRegisterPass ? "text" : "password"}
                      placeholder="Enter your password"
                      {...registerForm.register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500 hover:text-black"
                      onClick={() => setShowRegisterPass(!showRegisterPass)}
                    >
                      {showRegisterPass ? "Hide" : "Show"}
                    </button>
                </div>
                <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.password?.message}</p>
              </div>

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

function ProfileView({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const form = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    },
  });

  // Reset form when user changes (e.g. after update)
  useEffect(() => {
    form.reset({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
    });
    // Reset file selection on user change/refresh
    setTimeout(() => {
      setSelectedFile(null);
      setPreviewURL(null);
    }, 0);
  }, [user, form]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size too large (max 5MB)");
        return;
      }
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (v) => {
    try {
      const formData = new FormData();
      formData.append("name", v.name);
      formData.append("email", v.email);
      if (v.password) {
        formData.append("password", v.password);
      }
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      
      const data = await updateProfile(formData).unwrap();
      
      // If backend returns the updated user object directly or in a property
      const updatedUser = data.user || data; 
      
      // Preserve existing token
      const currentToken = localStorage.getItem('token');
      
      dispatch(loginSuccess({ token: currentToken, user: updatedUser }));
      
      toast.success("Profile updated successfully");
      form.setValue("password", ""); // Clear password field
      // Don't clear previewURL immediately so user sees the new image, 
      // but useEffect will handle it if user object updates.
    } catch (e) {
      console.error("Update failed", e);
      toast.error(e?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    try {
      // ensure guest storage cleared
      localStorage.removeItem("cart");
    } catch { void 0; }
    navigate("/account");
    toast.success("Logged out");
  };

  return (
    <>
      <PageHero title="My Profile" />
      <Container className="py-16">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
            {/* Sidebar / Info Card */}
            <div className="md:col-span-1">
                <div className="bg-white border rounded-lg p-6 text-center space-y-4 shadow-sm">
                    <div className="relative h-24 w-24 mx-auto">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center border">
                            {previewURL ? (
                                <img src={previewURL} alt="Preview" className="h-full w-full object-cover" />
                            ) : user.avatar ? (
                                <img src={`${BASE_URL}${user.avatar}`} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <User size={48} className="text-neutral-400" />
                            )}
                        </div>
                        <label 
                            htmlFor="avatar-upload" 
                            className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full cursor-pointer hover:bg-neutral-800 transition-colors shadow-sm"
                            title="Change Profile Picture"
                        >
                            <Camera size={14} />
                            <input 
                                type="file" 
                                id="avatar-upload" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-neutral-500 text-sm">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-neutral-100 text-xs font-medium rounded-full uppercase">
                            {user.role || "User"}
                        </span>
                    </div>
                    <div className="pt-4 border-t w-full">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <div className="md:col-span-2">
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                    <User size={16} /> Username
                                </label>
                                <Input {...form.register("name")} placeholder="Your name" />
                                <p className="text-red-500 text-xs">{form.formState.errors.name?.message}</p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                    <Mail size={16} /> Email Address
                                </label>
                                <Input {...form.register("email")} placeholder="Your email" />
                                <p className="text-red-500 text-xs">{form.formState.errors.email?.message}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                <Lock size={16} /> New Password (Optional)
                            </label>
                            <Input 
                                type="password" 
                                {...form.register("password")} 
                                placeholder="Leave blank to keep current password" 
                            />
                            <p className="text-neutral-500 text-xs">Minimum 6 characters if changing</p>
                            <p className="text-red-500 text-xs">{form.formState.errors.password?.message}</p>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                                {isLoading ? "Saving Changes..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </Container>
    </>
  );
}
