'use server'
import { revalidatePath } from "next/cache";
import { Alert } from '@/components/ui/alert';
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { Session } from "@clerk/nextjs/server";
import { cookies } from "next/headers";


export default async function createExpenses(formData: FormData): Promise<void> {
  const userId = String(formData.get('userId') ?? "")
  const expense_name = String(formData.get('expense_name') ?? "")
  const expense_amount = Number(formData.get('expense_amount') ?? "")

  const getError = "Please check your Account Balance To Confirm";


    const Id =  userId;

    const incomes_table = await prisma.income.findMany({
      select:{
        income_amount: true,
        income_name: true
      },
      where:{
        userId: Id
      }
    })

    const Expense_table = await prisma.expenses.findMany({
      select:{
        expense_amount: true,
        expense_name: true
      },
      where:{
        userId: Id
      }
    })

    const totalIncome = incomes_table.reduce(
      (sum, Expense) => sum + Number(Expense.income_amount) + 0, 
      0
    )

    const totalExpense = Expense_table.reduce(
      (sum, Expense) => sum + Number(Expense.expense_amount) + 0, 
      0
    )
    
    const totalBalance = totalIncome - totalExpense

    if(totalBalance < Number(expense_amount)){

    //  alert("Please check your Account Balance To Confirm")
      
      redirect(`/add_income`)

    }else{
       await prisma.expenses.create({
      data:{
        userId,
        expense_name,
        expense_amount
      } 
    })
    revalidatePath('/add_expense')
      
    }

    
    
}