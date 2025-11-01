-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,
    "district_name" TEXT NOT NULL,
    "fin_year" TEXT,
    "month" TEXT,
    "Total_Households_Worked" DOUBLE PRECISION,
    "Total_Individuals_Worked" DOUBLE PRECISION,
    "Women_Persondays" DOUBLE PRECISION,
    "Average_Wage_rate_per_day_per_person" DOUBLE PRECISION,
    "Average_days_of_employment_provided_per_Household" DOUBLE PRECISION,
    "Total_No_of_Active_Job_Cards" DOUBLE PRECISION,
    "Total_No_of_Active_Workers" DOUBLE PRECISION,
    "Total_No_of_HHs_completed_100_Days_of_Wage_Employment" DOUBLE PRECISION,
    "Number_of_Completed_Works" DOUBLE PRECISION,
    "Number_of_Ongoing_Works" DOUBLE PRECISION,
    "percentage_payments_gererated_within_15_days" DOUBLE PRECISION,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);
