 "use server"
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export default async function createIncome(formData: FormData): Promise<void>  {
  const userId = String(formData.get('userId') ?? "")
  const income_name = String(formData.get('income_name') ?? "")
  const income_amount = Number(formData.get('income_amount') ?? "")
  console.log(userId, income_name, income_amount);
    await prisma.income.create({
      data:{
        userId,
        income_name,
        income_amount
      } 
    })
    revalidatePath('/add_income')
  
}


