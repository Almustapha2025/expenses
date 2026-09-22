import { Metadata } from 'next/dist/types';
import React from 'react'

export const metadata: Metadata = {
  title: "Expenses App",
  description: "Tracking All Income And Expense",
};

export default function layoutPage({children}: {children: React.ReactNode}) {
  return (
    <div>{children}</div>
  )
}
