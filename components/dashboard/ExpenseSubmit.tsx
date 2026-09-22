'use client'
import React, { useActionState } from 'react'
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';


export default function ExpenseSubmit() {
    
    const  {pending}  = useFormStatus()
         
  return (
    <>
        <div className="space-y-2 py-2">
            <Button type="submit" isDisabled={pending} className="float-end rounded-md">{pending ? "Adding Expenses ... " : "Add Expenses"}</Button>
        </div>            
    </>
  )
}
