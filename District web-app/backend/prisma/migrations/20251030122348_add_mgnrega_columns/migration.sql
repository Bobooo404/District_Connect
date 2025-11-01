/*
  Warnings:

  - You are about to drop the column `Completed_Wroks` on the `District` table. All the data in the column will be lost.
  - Added the required column `Completed_Works` to the `District` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "District" DROP COLUMN "Completed_Wroks",
ADD COLUMN     "Completed_Works" INTEGER NOT NULL;
