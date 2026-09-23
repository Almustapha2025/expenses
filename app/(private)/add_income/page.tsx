import createIncome from '@/app/lib/action';
import Add_income from '@/app/lib/action';
import prisma from '@/app/lib/prisma';
import IncomeSubmit from '@/components/dashboard/IncomeSubmit';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Sumana } from 'next/font/google';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AddIncome() {
    const login = await currentUser()
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
    // const totalExpenses = incomes_table.reduce()

    
  return (
    <>
      <div className="flex justify-between ">
              <Sidebar />
            <main className="border w-289.5 h-160 float-right bg-gray-50 px-4 py-4 
            space-y-1 overflow-y-scroll border-t text-sm leading-fixed">
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
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg mt-2">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-2xl font-bold">Total Income </h3>
                  <h4 className="text-green-500 text-lg font-bold">&#8358; {totalIncome}</h4>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                   <h3 className="text-green-500 text-2xl font-bold">Total Expense </h3>
                   <h4 className="text-green-500 text-lg font-bold">&#8358; {totalExpense}</h4>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-2xl font-bold">Total Balance </h3>
                  <h4 className={`${totalBalance <= 5000 ? "text-red-500" : totalBalance <= 10000 ? "text-yellow-500" : "text-green-500"} text-lg font-bold`}>&#8358; {totalBalance}</h4>
                </div>
                {/* <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-2xl font-bold">Total Savings </h3>
                </div> */}
              </div>
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-8">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-700 text-lg font-semibold">Add Income</h3>
                  <form action={createIncome} >
                    <input type="hidden" name="userId" value={u.userId} />
                    <div className="space-y-2 py-2">
                        <Label htmlFor="income_name" className="text-gray-500">Income Name</Label>
                        <Input type="text" name="income_name" id="income_name" className="rounded-md text-gray-700" required />
                    </div>
                    <div className="space-y-2 py-2">
                        <Label htmlFor="income_amount" className="text-gray-500">Amount</Label>
                        <Input type="text" name="income_amount" min={50} id="income_amount" className="rounded-md text-gray-700" required />
                    </div>
                    <div className="space-y-2 py-2">
                        <IncomeSubmit />
                    </div>
                  </form>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-700 text-lg font-bold">View Recent Incomes</h3>
                    {(await incomes).map((i) => (
                    <div key={i.id} className="flex justify-between border-b-3 border-green-100 py-2 text-sm text-gray-700 capitalize">
                      <span><Link href={`/add_income/${i.id}`}>{i.income_name}</Link> </span>
                      <span className="px-2 rounded-lg bg-green-100 text-green-700"><Link href={`/add_income/${i.id}`}>+{i.income_amount.toFixed()}</Link> </span>
                    </div>
                  ))}
                </div>
              </div>
          </main>
      </div>
    </>
  )
}
