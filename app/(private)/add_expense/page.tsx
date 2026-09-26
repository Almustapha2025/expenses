
import createExpenses from "@/app/lib/expenses_action";
import Add_expense from '@/app/lib/action';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import prisma from "@/app/lib/prisma";
import ExpenseSubmit from "@/components/dashboard/ExpenseSubmit";
import Link from "next/link";
import DisplayCal from "@/components/DisplayCal";

export default async function AddExpenses() {
    const u = await auth()
    const use = await currentUser()
    if(!u.userId) redirect("/sign-in")

     const incomes = await prisma.income.findMany({
      orderBy:{
        createdAt: "desc"
      },
      where:{
        userId: u.userId
      },
      take: 5
    })

    const expenses = await prisma.expenses.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId: u.userId
      },
      take: 5
    })

    const incomes_table = await prisma.income.findMany({
      select:{
        income_amount: true,
        income_name: true
      },
      where:{
        userId: u.userId
      }
    })

    const Expense_table = await prisma.expenses.findMany({
      select:{
        expense_amount: true,
        expense_name: true
      },
      where:{
        userId: u.userId
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
      <div className="flex justify-between ">
              <Sidebar />
            <main className="border w-289.5 h-160 float-right bg-gray-50 px-4 py-4 space-y-1 overflow-y-scroll leading-fixed">
              <div className="flex justify-between mx-auto ">
                  <div className="text-3xl font-bold text-gray-500 font-serif capitalize">welcome {use?.firstName}</div>
                    <div className="text-xs font-semibold text-gray-500 font-serif capitalize flex gap-2 items-center">
                        <UserButton w-10 h-10 />   
                    </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs">
                A simple and modern expense management
                application built.
              </p>
              </div>
              <DisplayCal />
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-8">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-red-700 text-lg font-semibold">Add Expenses</h3>
                  <form action={createExpenses} >
                    <input type="hidden" name="userId" defaultValue={u.userId} />
                    <div className="space-y-2 py-2">
                        <Label htmlFor="expense_name" className="text-gray-500">Categorie Name</Label>
                        <Input type="text" name="expense_name" id="expense_name" className="rounded-md capitalize text-gray-700" required />
                    </div>
                    <div className="space-y-2 py-2">
                        <Label htmlFor="expense_amount" className="text-gray-500">Amount</Label>
                        <Input type="text" name="expense_amount" id="expense_amount" min={50} className="rounded-md text-gray-700" required />
                    </div>
                        <ExpenseSubmit />
                    </form>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-red-700 text-lg font-semibold">View Recent Expenses</h3>
                  {expenses.map((e) => (
                    <div key={e.id} className="flex justify-between border-b-3 border-red-100 py-2 text-sm text-gray-700 capitalize">
                      <span><Link href={`/add_expense/${e.id}`}>{e.expense_name}</Link></span>
                      <span className="flex rounded-lg bg-red-100 text-red-700 px-2"><Link href={`/add_expense/${e.id}`} className="text-xxs">
                        -{e.expense_amount.toFixed()} </Link>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
          </main>
      </div>
    </>
  )
}
