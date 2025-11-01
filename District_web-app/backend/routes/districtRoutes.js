import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/district", async (req, res) => {
  try {
    const d = req.body;

    const district = await prisma.district.create({
      data: {
        fin_year: d.fin_year,
        month: d.month,
        state_code: d.state_code,
        state_name: d.state_name,
        district_code: d.district_code,
        district_name: d.district_name,
        Approved_Labour_Budget: parseInt(d.Approved_Labour_Budget),
        Average_Wage_rate_per_day_per_person: parseFloat(d.Average_Wage_rate_per_day_per_person),
        Average_days_of_employment_provided_per_Household: parseFloat(d.Average_days_of_employment_provided_per_Household),
        Differently_abled_persons_worked: parseInt(d.Differently_abled_persons_worked),
        Material_and_skilled_Wages: parseFloat(d.Material_and_skilled_Wages),
        Number_of_Completed_Works: parseInt(d.Number_of_Completed_Works),
        Number_of_GPs_with_NIL_exp: parseInt(d.Number_of_GPs_with_NIL_exp),
        Number_of_Ongoing_Works: parseInt(d.Number_of_Ongoing_Works),
        Persondays_of_Central_Liability_so_far: parseInt(d.Persondays_of_Central_Liability_so_far),
        SC_persondays: parseInt(d.SC_persondays),
        SC_workers_against_active_workers: parseInt(d.SC_workers_against_active_workers),
        ST_persondays: parseInt(d.ST_persondays),
        ST_workers_against_active_workers: parseInt(d.ST_workers_against_active_workers),
        Total_Adm_Expenditure: parseFloat(d.Total_Adm_Expenditure),
        Total_Exp: parseFloat(d.Total_Exp),
        Total_Households_Worked: parseInt(d.Total_Households_Worked),
        Total_Individuals_Worked: parseInt(d.Total_Individuals_Worked),
        Total_No_of_Active_Job_Cards: parseInt(d.Total_No_of_Active_Job_Cards),
        Total_No_of_Active_Workers: parseInt(d.Total_No_of_Active_Workers),
        Total_No_of_HHs_completed_100_Days_of_Wage_Employment: parseInt(d.Total_No_of_HHs_completed_100_Days_of_Wage_Employment),
        Total_No_of_JobCards_issued: parseInt(d.Total_No_of_JobCards_issued),
        Total_No_of_Workers: parseInt(d.Total_No_of_Workers),
        Total_No_of_Works_Takenup: parseInt(d.Total_No_of_Works_Takenup),
        Wages: parseFloat(d.Wages),
        Women_Persondays: parseInt(d.Women_Persondays),
        percent_of_Category_B_Works: parseFloat(d.percent_of_Category_B_Works),
        percent_of_Expenditure_on_Agriculture_Allied_Works: parseFloat(d.percent_of_Expenditure_on_Agriculture_Allied_Works),
        percent_of_NRM_Expenditure: parseFloat(d.percent_of_NRM_Expenditure),
        percentage_payments_gererated_within_15_days: parseFloat(d.percentage_payments_gererated_within_15_days),
        Remarks: d.Remarks || "NA",
      },
    });

    res.json({
      success: true,
      message: "District data saved successfully",
      district,
    });

  } catch (error) {
    console.error("Error saving district:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default router;
