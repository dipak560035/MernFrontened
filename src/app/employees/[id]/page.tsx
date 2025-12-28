
import EditForm from "@/components/EditForm";
import axios from "axios";

interface UpdatePageProps {
  id: string;
}

export default async function UpdatePage({ params }: { params: Promise<UpdatePageProps> }) {
  const { id } = await params;

  const res = await axios.get(`https://68d0be14e6c0cbeb39a25150.mockapi.io/employess/${id}`);

  console.log(res.data);


  return (
    <div>

      <EditForm employee={res.data} />



    </div>
  )
}