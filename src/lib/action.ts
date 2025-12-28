'use server';

import { Employee } from "@/models/model";
import axios from "axios";
import { revalidatePath } from "next/cache";


export async function addEmployee(employee: Employee) {
    
    try {
        await axios.post('https://68d0be14e6c0cbeb39a25150.mockapi.io/employess',employee);
        revalidatePath('/');
        return {success:true,message:"Employee added successfully"}
        
    } catch (err: any) {
        return {success:false,message:err.message || "Failed to add employee"  };
    }
}


export async function removeEmployee(id: string) {
    
    try {
        await axios.delete(`https://68d0be14e6c0cbeb39a25150.mockapi.io/employess/${id}`);
        revalidatePath('/');
        return {success:true,message:"Employee removed successfully"}
        
    } catch (err: any) {
        return {success:false,message:err.message || "Failed to add employee"  };
    }
}



export async function updateEmployee(employee: Employee, id: string) {
  try {
    await axios.patch(
      `https://68d0be14e6c0cbeb39a25150.mockapi.io/employess/${employee.id}`,
      employee // ✅ REQUIRED
    );

    revalidatePath('/');
    return { success: true, message: "Employee updated successfully" };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to update employee",
    };
  }
}
