import { object, z } from "zod"

export const expenseShema = z.object({
    
    expense_name: z.string()
                    .min(2, "Expense name must be atleast to character")
                    .max(50, "Expense name is to long"),
    expense_amount: z.coerce
                        .number().min(1)
                        .positive("Amount must be greater than 0")
})
export type ExpenseInput = z.infer<typeof expenseShema>;