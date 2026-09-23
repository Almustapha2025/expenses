'use client'
import React from 'react'
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';

export default function DeleteSubmit() {
    const { pending } = useFormStatus()
  return (
    <>
        <Button type="submit" isDisabled={pending} className="float-end rounded-md bg-white boder border-red-500 font-bold text-red-500">{pending ? "Deleting ... " : "Delete"}</Button>
    </>
  )
}
