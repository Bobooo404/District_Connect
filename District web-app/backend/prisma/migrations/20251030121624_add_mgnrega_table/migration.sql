/*
  Warnings:

  - You are about to drop the column `Number_of_Completed_Works` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `Number_of_Ongoing_Works` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `Total_No_of_HHs_completed_100_Days_of_Wage_Employment` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `percentage_payments_gererated_within_15_days` on the `District` table. All the data in the column will be lost.
  - You are about to alter the column `Total_Households_Worked` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Total_Individuals_Worked` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Women_Persondays` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Average_Wage_rate_per_day_per_person` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Total_No_of_Active_Job_Cards` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Total_No_of_Active_Workers` on the `District` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `fin_year` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `month` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Total_Households_Worked` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Total_Individuals_Worked` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Women_Persondays` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Average_Wage_rate_per_day_per_person` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Average_days_of_employment_provided_per_Household` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Total_No_of_Active_Job_Cards` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Total_No_of_Active_Workers` on table `District` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "District" DROP COLUMN "Number_of_Completed_Works",
DROP COLUMN "Number_of_Ongoing_Works",
DROP COLUMN "Total_No_of_HHs_completed_100_Days_of_Wage_Employment",
DROP COLUMN "percentage_payments_gererated_within_15_days",
ALTER COLUMN "fin_year" SET NOT NULL,
ALTER COLUMN "month" SET NOT NULL,
ALTER COLUMN "Total_Households_Worked" SET NOT NULL,
ALTER COLUMN "Total_Households_Worked" SET DATA TYPE INTEGER,
ALTER COLUMN "Total_Individuals_Worked" SET NOT NULL,
ALTER COLUMN "Total_Individuals_Worked" SET DATA TYPE INTEGER,
ALTER COLUMN "Women_Persondays" SET NOT NULL,
ALTER COLUMN "Women_Persondays" SET DATA TYPE INTEGER,
ALTER COLUMN "Average_Wage_rate_per_day_per_person" SET NOT NULL,
ALTER COLUMN "Average_Wage_rate_per_day_per_person" SET DATA TYPE INTEGER,
ALTER COLUMN "Average_days_of_employment_provided_per_Household" SET NOT NULL,
ALTER COLUMN "Total_No_of_Active_Job_Cards" SET NOT NULL,
ALTER COLUMN "Total_No_of_Active_Job_Cards" SET DATA TYPE INTEGER,
ALTER COLUMN "Total_No_of_Active_Workers" SET NOT NULL,
ALTER COLUMN "Total_No_of_Active_Workers" SET DATA TYPE INTEGER;
