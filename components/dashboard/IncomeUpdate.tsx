"use client"
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export default function IncomeUpdate() {
    const {pending} = useFormStatus()
  return (
    
        <Button type="submit" isDisabled={pending} className="bg-black text-white float-right rounded-lg p-2">
            {pending ? `Updating Income ...`: `Update Income`}
        </Button>
  )
}