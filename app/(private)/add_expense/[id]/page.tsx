import DeleteExpense from '@/app/lib/DeleteExpense';
import prisma from '@/app/lib/prisma';
import UpdateExpense from '@/app/lib/UpdateExpense';
import ExpenseUpdate from '@/components/dashboard/ExpenseUpdate';
import Sidebar from '@/components/dashboard/Sidebar';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteSubmit from '@/components/dashboard/DeleteSubmit';

export default async function ExpensesId({params}: {params: Promise<{id: string}>}) {
  const eId = await params
  const userId = await Number(eId.id)

  const use = await currentUser()
  const u = await auth()
    if(!u.userId) redirect("/sign-in")
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

    const expense = await prisma.expenses.findUnique({
    where:{id: userId}
    })

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
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg mt-2">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-2xl font-bold">Total Income </h3>
                  <h4 className="text-green-500 text-lg font-bold">&#8358; {totalIncome}</h4>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                   <h3 className="text-green-500 text-2xl font-bold">Total Expense </h3>
                   <h4 className={`text-red-500 text-lg font-bold`}>&#8358; -{totalExpense}</h4>
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
                  <h3 className="text-green-500 text-lg font-semibold capitalize">Edit {expense?.expense_name.toString()}</h3>
                  <form action={UpdateExpense}>
                    <input type="hidden" name="Id" value={expense?.id} />
                    <div className="space-y-2 py-2">
                        <label htmlFor="expense_name" className="text-gray-500 text-xs">Categorie Name</label><br/>
                        <input type="text" name="expense_name" defaultValue={expense?.expense_name} id="expense_name" className="rounded-md text-gray-700 w-full p-2 border outline-none text-sm" required />
                    </div>
                    <div className="space-y-2 py-2">
                        <label htmlFor="expense_amount" className="text-gray-500 text-xs">Amount</label><br/>
                        <input type="text" name="expense_amount" defaultValue={expense?.expense_amount.toFixed()}  id="expense_amount" min={50} className="rounded-md text-gray-700 w-full p-2 border outline-none text-sm" required />
                    </div>
                    
                        
                        <ExpenseUpdate />
                    
                    </form>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-2xl font-semibold text-red-700 mb-4">Remove {expense?.expense_name}</h3>
                  <div className="flex flex-col justify-between px-2 py-1 bg-red-50 border rounded-lg">
                    <div className="text-gray-700">
                      <h5 className="py-2 px-1 text-red-600 font-serif text-lg">{expense?.expense_name}</h5>
                      <h5 className="py-2 px-1 text-red-600 font-serif text-lg">&#8358; {expense?.expense_amount.toFixed()}</h5>
                      <h5 className="py-2 px-1 text-red-600 font-serif text-lg"> {expense?.createdAt.toDateString()}</h5>
                    </div>
                    <div>
                      <form action={DeleteExpense}>
                        <input type="hidden" name="Id" defaultValue={expense?.id} />
                        <DeleteSubmit />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </main>
      </div>
    </>
  )
}
