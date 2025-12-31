"use client";


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner";
import { addEmployee } from "@/lib/action";


import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";


export default function EmployeeAdd() {

  const [loading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>
          Enter your details
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            name: '',
            position: '',
            age: 0
          }}
          onSubmit={(val) => {

            startTransition(async () => {

              const response = await addEmployee(val);
              if (response.success) {
                toast.success(response.message);
                router.back();
              } else {
                toast.error('Failed to add employee');
              }

            });



          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} >
              <div className="flex flex-col gap-6">


                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={values.position}
                    onChange={handleChange}
                    name="position"
                    placeholder="Dev"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"

                    onChange={handleChange}
                    type="number"
                    placeholder="90"
                  />
                </div>




                {loading ? <Button disabled className="w-full">
                  <Spinner /> Submit
                </Button> : <Button type="submit" className="w-full">
                  Submit
                </Button>}


              </div>
            </form>

          )}
        </Formik>

      </CardContent>

    </Card>
  )
}
