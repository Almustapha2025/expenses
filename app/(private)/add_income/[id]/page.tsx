import prisma from '@/app/lib/prisma';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import IncomeUpdate from '@/components/dashboard/IncomeUpdate';
import DeleteSubmit from '@/components/dashboard/DeleteSubmit';
import Deleteincome from '@/app/lib/Deleteincome';
import DisplayCal from '@/components/DisplayCal';

async function UpdateIncome(formData: FormData) {
  'use server'

  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const id = Number(formData.get('Id'))
  const income_name = String(formData.get('income_name') ?? '')
  const income_amount = Number(formData.get('income_amount'))

  if (!Number.isInteger(id) || !income_name || !Number.isFinite(income_amount)) {
    return
  }

  await prisma.income.updateMany({
    where: { id, userId },
    data: { income_name, income_amount },
  })
  redirect("/add_income")
}


export default async function incomeId({params}: {params: Promise<{id: string}>}) {
    const inId = await params
    const Id = await Number(inId.id)
    const u = await auth()
    const use = await currentUser()
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

    const I = await prisma.income.findUnique({
        where:{id: Id}
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
              <DisplayCal />
              <div className="grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg mt-8">
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-green-700 text-lg font-semibold">Edit {I?.income_name}</h3>
                  <form action={UpdateIncome}>
                    <input type="hidden" name="Id" value={I?.id} />
                    <div className="space-y-2 py-2">
                        <label htmlFor="income_name" className="text-gray-500 text-xs">Income Name</label><br/>
                        <input type="text" name="income_name" defaultValue={I?.income_name} id="income_name" className="rounded-md text-gray-700 w-full p-2 border outline-none text-sm" required />
                    </div>
                    <div className="space-y-2 py-2">
                        <label htmlFor="income_amount" className="text-gray-500 text-xs">Amount</label><br/>
                        <input type="text" name="income_amount" defaultValue={I?.income_amount.toFixed()}  id="income_amount" min={50} className="rounded-md text-gray-700 w-full p-2 border outline-none text-sm" required />
                    </div>
                    <div className="">
                        <IncomeUpdate />
                    </div>
                    </form>
                </div>
                <div className="p-4 bg-white rounded-md text-green-500 font-bold border">
                  <h3 className="text-2xl font-semibold text-green-700 mb-4">Remove {I?.income_name}</h3>
                  <div className="flex flex-col justify-between px-2 py-1 bg-green-50 border rounded-lg">
                    <div className="text-green-700">
                      <h5 className="py-2 px-1 font-serif text-lg">{I?.income_name}</h5>
                      <h5 className="py-2 px-1 font-serif text-lg">&#8358; {I?.income_amount.toFixed()}</h5>
                      <h5 className="py-2 px-1 font-serif text-lg"> {I?.createdAt.toDateString()}</h5>
                    </div>
                    <div>
                      <form action={Deleteincome}>
                        <input type="hidden"name="Id" defaultValue={I?.id} />
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
