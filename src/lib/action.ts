'use server';




import { connectDb } from "./db";
import { News } from "@/models/News"; // ✅ REQUIRED

export async function getNews() {
  try {
    await connectDb();
    const news = await News.find({});
    return { success: true, data: news };
  } catch (err) {
    console.error("Fetch news error:", err);
    return { success: false, message: "Failed to fetch news" };
  }
}




export async function addNews() {
    await connectDb();
    try {
        await News.create({
        title:'title',
        description:'description',
        image:'image'
         });
         return { success: true, message: 'News added successfully' };
        
    } catch (err) {
        return { success: false, message: 'Failed to add news' };

        
    }
}