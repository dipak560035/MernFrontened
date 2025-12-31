import { getNews } from "@/lib/action";



export default async function Home() {
  const res = await getNews();
  console.log(res);
  return (
    <div>

      
    </div>
  )
}
