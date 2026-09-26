 "use server"
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export default async function createIncome(formData: FormData): Promise<void>  {
  const userId = String(formData.get('userId') ?? "")
  const income_name = String(formData.get('income_name') ?? "")
  const income_amount = Number(formData.get('income_amount') ?? "")
    
    try{
      await prisma.income.create({
        data:{
          income_amount,
          income_name,
          userId      
        }
      })
      revalidatePath("/add_income")
    }catch(error) {
      console.log("Something went wrong "+ error)
      await prisma.$disconnect()
    }
  
}


