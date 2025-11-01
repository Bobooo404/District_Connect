/*
  Warnings:

  - Added the required column `Completed_Wroks` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ongoing_Works` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payment_within_15_days` to the `District` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "District" ADD COLUMN     "Completed_Wroks" INTEGER NOT NULL,
ADD COLUMN     "Ongoing_Works" INTEGER NOT NULL,
ADD COLUMN     "Payment_within_15_days" INTEGER NOT NULL;
