

import DeleteNews from "@/components/DeleteNews";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/action";

import { NewsModel } from "@/models/model";

import Link from "next/link";

export default async function Home() {
  
  const res = await getNews();

  const news: NewsModel[] = res.data ?? [];
  return (
    <div>

      {news.map((news: any) => {
        return (
          <div key={news.id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-semibold">{news.title}</h2>
            <p className="text-gray-600">{news.description}</p>

            <div className="flex gap-5 mt-5">
              <Link href={`/news/${news._id}`}>
                <Button>Update News</Button>
              </Link>
              <DeleteNews id={news._id.toString()} />
            </div>

          </div>
        )
      })}

      <ChildComponent data={{ name: "John", age: 30 }} />


    </div>
  )
}

interface Data {
  name: string,
  age: number
}


function ChildComponent({ data }: { data: Data }) {
  return (
    <div>
      <h1>Child Component</h1>
    </div>
  )
}















// import { getNews } from "@/lib/action";




// export default async function Home() {
//   const res = await getNews();
//   console.log(res);
//   return (
//     <div>

//       {news.map({news:any}=>{
//         return(
//           <div key={news.id} className="bg-white shadow-md rounded p-4 mb-4">
//             <h2>{news.title}</h2>
//             <p>{news.description}</p>

//           </div>
//         )

//       })}
      
//     </div>
//   )
// }
