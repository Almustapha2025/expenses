import prisma from '@/app/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function TransactionID({params}: {params: Promise<{id: string}>}) {
    const tran = await params
    const Id = await Number(tran.id)
    const login = await currentUser()
    const u = await auth();
    const use = await currentUser()
    if(!u.userId) redirect("/sign-in")

        const e = prisma.expenses.findUnique({
            where:{
                id: Id,
                userId: u.userId
            }
        })

  return (
    <div>{Id}</div>
  )
}
