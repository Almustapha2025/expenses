// "use server"
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { ArrowRight, Wallet } from "lucide-react";

export default async function Home() {

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="max-w-xl text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
          <Wallet className="h-7 w-7" />
        </div>

        <h1 className="mt-6 text-2xl font-bold">
          Expense System
        </h1>

        <p className="mt-4 text-gray-500 text-sm">
          A simple and modern expense management
          application built
        </p>

        <Link href="/sign-in"
          className="mt-8 inline-flex items-center gap-2 rounded-lg capitalize bg-black px-5 py-3 text-xs font-medium text-white hover:bg-gray-800"
        >
          Sign in to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>
    </main>
    </>
  );
}
