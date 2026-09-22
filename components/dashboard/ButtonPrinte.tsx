"use client"
import React from 'react'
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';

export default function ButtonPrinte() {
    const {pending} = useFormStatus()
  return (
    <Button isDisabled={pending} className="rounded-lg bg-green-200 flex-auto text-center text-green-700 mx-auto" onClick={window.print}>
       {pending ? "Loading Printing ..." : "Print All Transaction"} 
    </Button>
  )
}
