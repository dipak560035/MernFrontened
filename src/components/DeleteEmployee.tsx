'use client';

import { useTransition } from "react";

import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

import { removeEmployee } from "@/lib/action";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";




export default function DeleteEmployee({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {

      const res = await removeEmployee(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }


    });
  }

  return (
    <div>

      {isPending ? <Button disabled variant={'ghost'}>
        <Spinner /> loading
      </Button> : <Button onClick={handleRemove} variant={'ghost'}>
        <Trash2Icon />
      </Button>}



    </div>

  )
}