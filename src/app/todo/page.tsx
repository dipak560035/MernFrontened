
// import axios from "axios";


// export default function Todos() {
//     const response = await axios("https://jsonplaceholder.typicode.com/todos");
//   const todos = response.data;
//   return (
//     <div>

//              {todos.map((todo: todo) => {
//         return (
//           <div key={todos.id}>
//             <h1>{todo.title}</h1>
//             <p>{todo.completed}</p>
//           </div>
//         );
//       })}

//     </div>
//   )
// }


import { todo } from "@/models/model";
import axios from "axios";

export default async function Todos() {
  const response = await axios("https://jsonplaceholder.typicode.com/todos");
  const todos = response.data;

  return (
    <div>
      {todos.map((todo: todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <p>{todo.completed.toString()}</p>
        </div>
      ))}
    </div>
  );
}