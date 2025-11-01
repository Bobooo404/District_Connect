import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const getDistrictData = async (req, res) => {
  const { districtName } = req.params;

  try {
    // check if district already exists in DB
    const existing = await prisma.district.findMany({
      where: {
        district_name: {
          equals: districtName,
          mode: "insensitive",
        },
      },
    });

    if (existing.length > 0) {
      console.log(" Fetched from DB");
      return res.json(existing);
    }

    console.log("🌐 Fetching from API...");
    const apiResponse = await axios.get(process.env.API_URL);
    const records = apiResponse.data.records;

    // filter district data
    const districtData = records.filter(
      (item) =>
        item.district_name.toLowerCase() === districtName.toLowerCase()
    );

    if (districtData.length === 0) {
      return res.status(404).json({ message: "District not found 11111" });
    }

    //  Insert ALL districts of same state if district not found in DB
    const stateName = districtData[0].state_name;

    const stateData = records.filter(
      (item) => item.state_name.toLowerCase() === stateName.toLowerCase()
    );

    await prisma.district.createMany({
      data: stateData.map((item) => ({
        fin_year: item.fin_year,
        month: item.month,
        state_name: item.state_name,
        district_name: item.district_name,
        Total_Households_Worked: Number(item.Total_Households_Worked) || 0,
        Total_Individuals_Worked: Number(item.Total_Individuals_Worked) || 0,
        Women_Persondays: Number(item.Women_Persondays) || 0,
        Average_Wage_rate_per_day_per_person:
          Number(item.Average_Wage_rate_per_day_per_person) || 0,
        Average_days_of_employment_provided_per_Household:
          Number(item.Average_days_of_employment_provided_per_Household) || 0,
        Total_No_of_Active_Job_Cards:
          Number(item.Total_No_of_Active_Job_Cards) || 0,
        Total_No_of_Active_Workers:
          Number(item.Total_No_of_Active_Workers) || 0,
        Completed_Works: Number(item.Number_of_Completed_Works) || 0,
        Ongoing_Works: Number(item.Number_of_Ongoing_Works) || 0,
        Payment_within_15_days:
          Number(item.percentage_payments_gererated_within_15_days) || 0,
      })),
      skipDuplicates: true,
    });

    console.log(" State-level district data inserted");

    res.json(districtData);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ------------------ COMPARISON API ------------------ //

export const compareDistrictWithState = async (req, res) => {
  const { districtName } = req.params;

  try {
    //  Get district data
    const district = await prisma.district.findFirst({
      where: {
        district_name: {
          equals: districtName,
          mode: "insensitive",
        },
      },
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    //  Get all districts in same state
    const stateDistricts = await prisma.district.findMany({
      where: {
        state_name: district.state_name,
      },
    });

    //  Calculate state totals
    const stateTotals = stateDistricts.reduce(
      (acc, d) => {
        acc.Total_Individuals_Worked += d.Total_Individuals_Worked;
        acc.Women_Persondays += d.Women_Persondays;
        acc.Average_Wage_rate_per_day_per_person +=
          d.Average_Wage_rate_per_day_per_person;
        return acc;
      },
      {
        Total_Individuals_Worked: 0,
        Women_Persondays: 0,
        Average_Wage_rate_per_day_per_person: 0,
      }
    );

    const stateAvgWage =
      stateTotals.Average_Wage_rate_per_day_per_person /
      stateDistricts.length;

    res.json({
      district: districtName,
      state: district.state_name,
      compare: {
        Total_Individuals_Worked: {
          district: district.Total_Individuals_Worked,
          state_total: stateTotals.Total_Individuals_Worked,
        },
        Women_Persondays: {
          district: district.Women_Persondays,
          state_total: stateTotals.Women_Persondays,
        },
        Average_Wage: {
          district: district.Average_Wage_rate_per_day_per_person,
          state_avg: stateAvgWage,
        },
      },
    });
  } catch (err) {
    console.error(" Compare Error:", err);
    res.status(500).json({ message: "Server error", err });
  }
};
