
import DeleteEmployee from "@/components/DeleteEmployee";
import { Button } from "@/components/ui/button";

import { Employee } from "@/models/model";
import axios from "axios"
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const res = await axios.get('https://68d0be14e6c0cbeb39a25150.mockapi.io/employess');

  const employees = res.data;

  return (
    <div>

      {employees.map((employee: Employee) => {
        return <div key={employee.id} className="border mb-5 p-4">
          <h1>{employee.name}</h1>
          <p>{employee.position}</p>
          <p>{employee.age}</p>

          <div className="mt-5 flex gap-5">
            {/* <Link href={`/employees/${employee.id}`}>
              <Button variant={'ghost'}>
                <Edit2Icon />
              </Button>
            </Link> */}

            <Link href={`/employees/${employee.id}`}>
  <Button variant={'ghost'}>
    <Edit2Icon />
  </Button>
</Link>


            <DeleteEmployee id={employee.id ?? ''} />

          </div>
        </div>
      })}


      {/* <ChildComponet name="hello" age={12} /> */}


    </div>
  )
}

interface ChildProps {
  name: string;
  age: number;
}



function ChildComponet({ name, age }: ChildProps) {

  return (
    <div>page</div>
  )
}