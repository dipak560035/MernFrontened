

export interface CommentModel {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}


export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export interface todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Employee {
    id?: string;
    name: string;
    position: string;
    age: number;
   
}

export interface NewsModel {
  id?: string;
  title: string;
  description: string;
  image: string;
}