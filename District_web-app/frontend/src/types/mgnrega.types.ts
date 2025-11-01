// src/types/mgnrega.types.ts

  export interface DistrictPerformance {
    district_code: string;
    district_name: string;
    state_code: string;

    
    // totalFundsAllocated: number;
    Average_days_of_employment_provided_per_Household: number;
    // jobCardsIssued: number;
    Total_No_of_Active_Workers: number;
    // totalWorkDays: number;
    Average_Wage_rate_per_day_per_person: number;
    // fundsUtilized: number;
    Number_of_Completed_Works: number;
    // worksOngoing: number;
    // lastUpdated: string;
    // Add more fields as needed
  }



export interface StateComparison {
  stateAverage: {
    jobCardsIssued: number;
    activeWorkers: number;
    avgWagePerDay: number;
    worksCompleted: number;
  };
  districtRank: number;
  totalDistricts: number;
  performanceScore: number; // 0–100
}