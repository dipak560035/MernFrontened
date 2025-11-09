// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AuthPage() {
//   const [formType, setFormType] = useState("none") // "none" | "login" | "signup"

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-gray-800">
//             {formType === "login"
//               ? "Welcome Back 👋"
//               : formType === "signup"
//               ? "Create an Account ✨"
//               : "Welcome to MyApp"}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {/* Landing view (buttons only) */}
//           {formType === "none" && (
//             <div className="flex flex-col gap-3">
//               <Button
//                 className="w-full font-medium"
//                 onClick={() => setFormType("login")}
//               >
//                 Login
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full font-medium"
//                 onClick={() => setFormType("signup")}
//               >
//                 Sign Up
//               </Button>
//             </div>
//           )}

//           {/* Login form */}
//           {formType === "login" && (
//             <form className="flex flex-col gap-4">
//               <div className="text-left">
//                 <Label>Email</Label>
//                 <Input type="email" placeholder="you@example.com" />
//               </div>
//               <div className="text-left">
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••" />
//               </div>

//               <Button type="submit" className="mt-2 w-full font-medium">
//                 Login
//               </Button>

//               <p className="text-center text-sm text-gray-500">
//                 Don’t have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setFormType("signup")}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </form>
//           )}

//           {/* Signup form */}
//           {formType === "signup" && (
//             <form className="flex flex-col gap-4">
//               <div className="text-left">
//                 <Label>Username</Label>
//                 <Input type="text" placeholder="dipak123" />
//               </div>
//               <div className="text-left">
//                 <Label>Email</Label>
//                 <Input type="email" placeholder="you@example.com" />
//               </div>
//               <div className="text-left">
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••" />
//               </div>

//               <Button type="submit" className="mt-2 w-full font-medium">
//                 Create Account
//               </Button>

//               <p className="text-center text-sm text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setFormType("login")}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Login
//                 </button>
//               </p>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }





















import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [formType, setFormType] = useState("none") // none | login | signup

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {formType === "login"
              ? "Login"
              : formType === "signup"
              ? "Sign Up"
              : "Welcome"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {formType === "none" && (
            <div className="flex flex-col gap-3">
              <Button onClick={() => setFormType("login")}>Login</Button>
              <Button variant="outline" onClick={() => setFormType("signup")}>
                Sign Up
              </Button>
            </div>
          )}

          {formType === "login" && (
            <form className="flex flex-col gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button type="submit" className="mt-2">Login</Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => setFormType("signup")}
                type="button"
              >
                Don’t have an account? Sign up
              </Button>
            </form>
          )}

          {formType === "signup" && (
            <form className="flex flex-col gap-4">
              <div>
                <Label>Username</Label>
                <Input type="text" placeholder="dipak123" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="dipak@example.com" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button type="submit" className="mt-2">Sign Up</Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => setFormType("login")}
                type="button"
              >
                Already have an account? Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


