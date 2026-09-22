"use server"
import { revalidatePath } from "next/cache";
import prisma from "./prisma";



export default async function UpdateIncome(formData: FormData) :Promise<void> {

    const Id = Number(formData.get('Id') ?? "")
    const income_name = String(formData.get("income_name") ?? "")
    const income_amount = String(formData.get("income_amount") ?? "")
    
    await prisma.income.update({
        data: {
            income_name,
            income_amount
        },
        where:{
            id: Id
        }
    })

    revalidatePath(`/add_income`)
  
}
