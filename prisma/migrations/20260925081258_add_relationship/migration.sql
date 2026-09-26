/*
  Warnings:

  - You are about to drop the column `incomeId` on the `Expenses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Income` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `incomeid` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_incomeId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "incomeId",
ADD COLUMN     "incomeid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Income_userId_key" ON "Income"("userId");

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_incomeid_fkey" FOREIGN KEY ("incomeid") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
