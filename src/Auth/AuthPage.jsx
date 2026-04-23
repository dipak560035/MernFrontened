
// import { useState } from "react
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AuthPage() {
//   const [formType, setFormType] = useState("none") // none | login | signu

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <Card className="w-[350px]">
//         <CardHeader
//           <CardTitle className="text-center text-xl font-bold">
//             {formType === "login
//               ? "Login"
//               : formType === "signup"
//               ? "Sign Up"
//               : "Welcome"}
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {formType === "none" && (
//             <div className="flex flex-col gap-3">
//               <Button onClick={() => setFormType("login")}>Login</Button>
//               <Button variant="outline" onClick={() => setFormType("signup")}>
//                 Sign Up
//               </Button>
//             </div>
//           )}

//           {formType === "login" && (
//             <form className="flex flex-col gap-4">
//               <div>
//                 <Label>Email</Label>
//                 <Input type="email" placeholder="dipak@gmail.com" />
//               </div>
//               <div>
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••" />
//               </div>
//               <Button type="submit" className="mt-2">Login</Button>
//               <Button
//                 variant="ghost"
//                 className="text-sm"
//                 onClick={() => setFormType("signup")}
//                 type="button"
//               >
//                 Don’t have an account? Sign up
//               </Button>
//             </form>
//           )}

//           {formType === "signup" && (
//             <form className="flex flex-col gap-4">
//               <div>
//                 <Label>Username</Label>
//                 <Input type="text" placeholder="dipak123" />
//               </div>
//               <div>
//                 <Label>Email</Label>
//                 <Input type="email" placeholder="dipak@gmail.com" />
//               </div>
//               <div>
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••" />
//               </div>
//               <Button type="submit" className="mt-2">Sign Up</Button>
//               <Button
//                 variant="ghost"
//                 className="text-sm"
//                 onClick={() => setFormType("login")}
//                 type="button"
//               >
//                 Already have an account? Login
//               </Button>
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
                <Input type="email" placeholder="dipak@gmail.com" />
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
                <Input type="email" placeholder="dipak@gmail.com" />
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


