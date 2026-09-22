
import Sidebar from '@/components/dashboard/Sidebar';
import { UserButton, UserProfile } from '@clerk/nextjs';
import { auth, currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Settings() {
  
    const use = await currentUser()
    const u = await auth()
    if(!u.userId) redirect("/sign-in")
  return (
    <>
      <div className="flex justify-between ">
              <Sidebar />
            <main className="border w-289.5 h-160 float-right bg-gray-50 px-4 py-4">
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
              <div className="container rounded-lg mt-2">
                <UserProfile path="/settings" routing="path" />
              </div>
              
          </main>
      </div>
    </>
  )
}
