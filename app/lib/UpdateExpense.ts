"use server"
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";



export default async function UpdateExpense(formData: FormData) :Promise<void> {

    const Id = Number(formData.get('Id') ?? "")
    const expense_name = String(formData.get("expense_name") ?? "")
    const expense_amount = String(formData.get("expense_amount") ?? "")
    
    await prisma.expenses.update({
        data: {
            expense_amount,
            expense_name
        },
        where:{
            id: Id
        }
    })

    redirect(`/add_expense`)
  
}
