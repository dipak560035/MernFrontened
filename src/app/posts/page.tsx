import { Post } from "@/models/model";
import axios from "axios";


export default async function PostPage() {
const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
console.log(response.data);
const posts = response.data;
  return (
    <div>
   {posts.map((post:Post) => {
    return <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </div>
    
   })}
      

    </div>
  )
}


 