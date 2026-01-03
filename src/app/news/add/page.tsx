'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addNews } from "@/lib/action";

import { useActionState } from "react";
import toast from "react-hot-toast";


const postData = async (_: any, formData: FormData) => {

  const data = {
    title: formData.get('title')?.toString().trim(),
    description: formData.get('description')?.toString().trim(),
    image: formData.get('image')?.toString().trim()
  };

  if (!data.title || !data.description || !data.image) {
    toast.error("All fields are required");
    return { success: false };
  }

  const res = await addNews(data); // ✅ FIX HERE

  if (!res.success) {
    toast.error(res.message);
  } else {
    toast.success(res.message);
  }
  console.log(data);

  return res; // ✅ important for useActionState
};



export default function AddNews() {
  const [error, submitAction, isPending] = useActionState(postData, null);

  return (
    <div>

      <form action={submitAction} className="flex flex-col gap-5 max-w-sm">

        <Input
          name="title"
          placeholder="Title"
          className="w-full max-w-sm"
        />

        <Input
          name="description"
          placeholder="Description"
          className="w-full max-w-sm"
        />

        <Input
          name="image"
          placeholder="Image"
          className="w-full max-w-sm"
        />

        <Button type="submit">
          {isPending && <Spinner />}
          Submit</Button>



      </form>

    </div>
  )
}

























// 'use client';

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useActionState } from "react";

// const postData = async (prevState:any, formData:FormData) =>{
// console.log(formData.get("title"));
// }
// export default function AddNews(){
//     const [error,submitAction,isPending] = useActionState(postData,null);
//     return(
//         <div>
//             <form action={submitAction} className="flex flex-col gap-5 max-w-sm">
            
//             <Input 
//             name="title"
//             placeholder="Title"
//             className="w-full max-w-sm"
//             />

//             <Input 
//             name="description"
//             placeholder="description"
//             className="w-full max-w-sm"
//             />


//             <Input 
//             name="image"
//             placeholder="image"
//             className="w-full max-w-sm"
//             />

//             <Button type="submit">submit</Button>


//             </form>



            
//         </div>
//     )





// }