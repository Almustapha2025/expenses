/*
  Warnings:

  - The `incomeid` column on the `Expenses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_incomeid_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "incomeid",
ADD COLUMN     "incomeid" INTEGER[];

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_incomeid_fkey" FOREIGN KEY ("incomeid") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
