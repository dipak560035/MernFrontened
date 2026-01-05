'use server';




import { revalidatePath } from "next/cache";
import { connectDb } from "./db";
import { News } from "@/models/News"; // ✅ REQUIRED
import { NewsModel } from "@/models/model";

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




export async function addNews(news:NewsModel) {
    await connectDb();
    try {
        await News.create(news);
        revalidatePath('/');
         return { success: true, message: 'News added successfully' };
        
    } catch (err:any) {
        return { success: false, message: err.message };

        
    }
  }




export async function getNewsById(id: string) {
  await connectDb();
  try {
    const news = await News.findById(id);

    return { success: true, data: news };
  } catch (err) {
    return {
      success: false,
      message: 'Failed to get news'
    }
  }
}

export async function removeNews(id: string) {
  await connectDb();
  try {
    await News.findByIdAndDelete(id);
    revalidatePath('/');
    return {
      success: true,
      message: 'News removed successfully'
    }
  } catch (err: any) {
    return {
      success: false,
      message: err.message
    }
  }

}


export async function updateNews(id: string,news:NewsModel) {
  await connectDb();
  try {
    await News.findByIdAndUpdate(id,news);
    revalidatePath('/');
    return {
      success: true,
      message: 'News updated successfully'
    }
  } catch (err: any) {
    return {
      success: false,
      message: err.message
    }
  }

}