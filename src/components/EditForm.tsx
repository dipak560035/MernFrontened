'use client';

import { useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Formik } from "formik";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Employee } from "@/models/model";
import { updateEmployee } from "@/lib/action";




export default function EditForm({ employee }: { employee: Employee }) {

  const [loading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Update Employee</CardTitle>
        <CardDescription>
          Enter your details
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            name: employee.name,
            position: employee.position,
            age: employee.age
          }}
          onSubmit={(val) => {

            startTransition(async () => {
              const res = await updateEmployee({
                ...val,
                id: employee.id
              });
              router.back();
              if (res.success) {
                toast.success(res.message);
              } else {
                toast.error(res.message);
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
                    value={values.age}

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