'use client';

import { NewsModel } from "@/models/model";
import { Input } from "./ui/input";
import { Formik } from "formik";
import { useTransition } from "react";

import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { updateNews } from "@/lib/action";



export default function UpdateNews({ news }: { news: NewsModel }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div>

      <Formik

        initialValues={{
          title: news.title,
          description: news.description,
          image: news.image


        }}
        onSubmit={(val) => {
          startTransition(async () => {
            const res = await updateNews(news.id ?? '', val);
            if (res.success) {
              toast.success(res.message);
              router.back();
            } else {
              toast.error(res.message);
            }
          })

        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-sm">

            <Input
              value={values.title}
              onChange={handleChange}
              name="title"
              placeholder="Title"
              className="w-full max-w-sm"
            />

            <Input
              value={values.description}
              onChange={handleChange}
              name="description"
              placeholder="Description"
              className="w-full max-w-sm"
            />

            <Input
              value={values.image}
              onChange={handleChange}
              name="image"
              placeholder="Image"
              className="w-full max-w-sm"
            />

            <Button type="submit">
              {isPending && <Spinner />}
              Submit</Button>



          </form>

        )}
      </Formik>





    </div>
  )
}