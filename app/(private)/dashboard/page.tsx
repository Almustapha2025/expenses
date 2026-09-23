// "use server"
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { ArrowRight, Wallet } from "lucide-react";
import { redirect } from "next/navigation";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import prisma from "@/app/lib/prisma";

export default async function Home() {

  const login = await currentUser()
  const u = await auth();
  const use = await currentUser()
  if(!u.userId) redirect("/sign-in")
    const incomes = await prisma.income.findMany({
      orderBy:{
        createdAt: "desc"
      },
      where:{
        userId: u.userId
      },
      take: 10
    })

    const expenses = await prisma.expenses.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId: u.userId
      },
      take: 10
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
    const countIncomes = await prisma.income.count({
      where:{
        userId: u.userId
      }
    })
    const countExpenses = await prisma.expenses.count({
      where:{
        userId: u.userId
      }
    })


  return (
    <>
      <div className="flex justify-between ">
              <Sidebar />
            <main className="border w-289.5 h-160 float-right bg-gray-50 px-4 py-4 space-y-1 overflow-y-scroll leading-fied">
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
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg mt-4">
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
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-4">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-500 text-lg font-semibold">Recent Incomes Record</h3>
                  {(await incomes).map((i) => (
                    <div key={i.id} className="flex justify-between border-b-3 border-green-200 py-2 text-sm text-gray-700 capitalize">
                      <span><Link href={`/add_income/${i.id}`}>{i.income_name}</Link> </span>
                      <span className="px-4 rounded-lg bg-green-100 text-green-700"><Link href={`/add_income/${i.id}`}>+{i.income_amount.toFixed()}</Link> </span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-red-500 text-lg font-semibold">Recent Expenses Record</h3>
                  {(await expenses).map((e) => (
                    <div key={e.id} className="flex justify-between border-b-3 border-red-200 py-2 text-sm text-gray-700 capitalize">
                      <span><Link href={`/add_expense/${e.id}`}>{e.expense_name}</Link> </span>
                      <span className="px-4 rounded-lg bg-red-100 text-red-700"><Link href={`/add_expense/${e.id}`}>-{e.expense_amount.toFixed()}</Link> </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-4">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-greed-500 mb-4 text-xl font-semibold">Numbers Of Incomes Transaction</h3>
                  <span className="w-32 h-64 px-4 py-2 text-green-900 m-4 border border-green-700 bg-green-100 shadow-red-50 rounded-full text-2xl">{countIncomes}</span>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-red-500 mb-4 text-xl font-semibold">Numbers Of Expenses Transaction</h3>
                  <span className="w-32 h-64 px-4 py-2 text-red-900 m-4 border border-red-700 bg-red-100 shadow-red-50 rounded-full text-2xl">{countExpenses}</span>
                </div>
              </div>
          </main>
      </div>
    </>
  );
}
