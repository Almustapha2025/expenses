// "use server"
import Image from "next/image";
import { Table } from '@/components/ui/table';
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { ArrowRight, NotepadText, Pencil, Pin, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { redirect } from "next/navigation";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import prisma from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import ButtonPrinte from "@/components/dashboard/ButtonPrinte";
import DisplayCal from "@/components/DisplayCal";

export default async function Transaction() {

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
      }
    })

    const expenses = await prisma.expenses.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId: u.userId
      }
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
              <DisplayCal />
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-2">
                
                <div className="py-2 px-1 rounded-md text-green-500 font-bold">
                    <h3 className="text-lg font-semibold font-serif text-green-700 flex gap-2">All Incomes <TrendingUp /></h3>
                    <div className="w-full overflow-x-auto rounded-lg m-2 border bg-white shadow-sm">
                  <table className="w-full min-w-120 text-left">
                      <thead className="border-b bg-gray-50">
                        <tr>
                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Income Name
                          </th>

                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Amount
                          </th>

                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Date
                          </th>
                          <th className="px-2 py-4 font-semibold text-gray-600">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                    {incomes.map((I) => (
                        <tr
                          key={I.id}
                          className="transition hover:bg-gray-50"
                        >
                          <td className="px-2 py-1">
                            <p className="text-gray-900 capitalize text-xs">
                              {I.income_name}
                            </p>
                          </td>

                          <td className="px-2 py-1">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                              +{I.income_amount.toFixed()}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-xs text-gray-500">
                            {I.createdAt.toLocaleDateString()}
                          </td>
                          <td className="px-2 py-1 text-xs text-gray-500">
                            <Link href={`/add_income/${I.id}`} >
                              <Pencil className="w-7 h-7 text-green-700" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
                </div>
                </div>
                <div className="py-2 rounded-md text-green-500 font-bold">
                  <h3 className="text-lg font-semibold font-serif text-red-700 flex gap-2">All Expenses <TrendingDown className="text-red-700" /></h3>
                  <div className="w-full overflow-x-auto rounded-lg border bg-white shadow-sm">
                  <table className="w-full min-w-120 text-left">
                      <thead className="border-b bg-gray-50">
                        <tr>
                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Category
                          </th>

                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Amount
                          </th>

                          <th className="px-2 py-4 text-sm font-semibold text-gray-600">
                            Date
                          </th>
                          <th >Action</th>
                        </tr>
                      </thead>
                      <tbody>
                    {expenses.map((E) => (
                        <tr
                          key={E.id}
                          className="transition hover:bg-gray-50"
                        >
                          <td className="px-2 py-1">
                            <p className="text-gray-900 capitalize text-xs">
                              {E.expense_name}
                            </p>
                          </td>

                          <td className="px-2 py-1">
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                              -{E.expense_amount.toFixed()}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-xs text-gray-500">
                            {E.createdAt.toLocaleDateString()}
                          </td>
                          <td className="px-2 py-1 text-xs text-gray-500">
                            <Link href={`/add_expense/${E.id}`} >
                              <Pencil className="w-7 h-7 text-red-700" />
                            </Link>
                          </td>
                        </tr>
                      
                      ))}
                    </tbody>
                </table>
                </div>
                </div>
              </div>

                  <div className="container mx-auto">
                    <ButtonPrinte />
                  </div>
              {/* <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-2">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border"></div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border"></div>
              </div> */}
          </main>
      </div>
    </>
  );
}
