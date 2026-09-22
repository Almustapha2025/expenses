"use server"
import { wait } from 'next/dist/lib/wait';
import React from 'react'
import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export default async function DeleteExpense(formData: FormData): Promise<void> {
    const u = await auth()
    const use = u.userId
    if (!use) return
    console.log(use)
    const Id = Number(formData.get("Id") ?? "")
    console.log(`Delete the expense ${Id}`)
        await prisma.expenses.delete({
            where:{
                userId: use,
                id:Id
            }
        })
        redirect("/add_expense")

    
}
