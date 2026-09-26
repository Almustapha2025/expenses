"use server"
import prisma from '@/app/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DisplayCal() {
    const { userId } = await auth();
    if(!userId) redirect("/sign-in")
    const incomes_table = await prisma.income.findMany({
      select:{
        income_amount: true,
        income_name: true
      },
      where:{
        userId
      }
    })

    const Expense_table = await prisma.expenses.findMany({
      select:{
        expense_amount: true,
        expense_name: true
      },
      where:{
        userId
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
  return (
    <>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg mt-2">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-700 text-2xl font-bold">Total Income </h3>
                  <h4 className="text-green-700 text-lg font-bold">&#8358; {totalIncome}</h4>
                </div>
                <div className="p-4 bg-white rounded-md text-green-700 font-bold border">
                   <h3 className="text-green-700 text-2xl font-bold">Total Expense </h3>
                   <h4 className="text-green-700 text-lg font-bold">&#8358; {totalExpense}</h4>
                </div>
                <div className="p-4 bg-white rounded-md text-green-700 font-bold border">
                  <h3 className="text-green-700 text-2xl font-bold">Total Balance </h3>
                  <h4 className={`${totalBalance <= 5000 ? "text-red-700" : totalBalance <= 10000 ? "text-yellow-700" : "text-green-700"} text-lg font-bold`}>&#8358; {totalBalance}</h4>
                </div>
                {/* <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-2xl font-bold">Total Savings </h3>
                </div> */}
              </div>
    </>
  )
}
