'use client'
import React from 'react'
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';

export default function IncomeSubmit() {
    const { pending } = useFormStatus()
  return (
    <>
        <Button type="submit" isDisabled={pending} className="float-end rounded-md">{pending ? "Adding Income ... " : "Add Income"}</Button>
    </>
  )
}
