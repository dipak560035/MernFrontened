
import UpdateNews from "@/components/UpdateNews";
import { getNewsById } from "@/lib/action";


interface SingleNewsProps {
  id: string
}
export default async function SingleNews({ params }: { params: Promise<SingleNewsProps> }) {
  const { id } = await params;
  const res = await getNewsById(id);
  const data = res.data;

  return (
    <div>

      <UpdateNews news={{
        title: data.title,
        id: data._id.toString(),
        description: data.description,
        image: data.image
      }} />

    </div>
  )
}