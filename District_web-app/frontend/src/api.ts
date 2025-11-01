// src/api.ts
import { DistrictPerformance, StateComparison } from './types/mgnrega.types';

const API_URL = import.meta.env.VITE_API_URL;

/* --------------------------------------------------------------
   1. Fetch single-district performance data
   -------------------------------------------------------------- */
// export const fetchDistrictData = async (
//   district: string
// ): Promise<DistrictPerformance> => {
//   const res = await fetch(`${API_URL}/api/mgnrega/distric_name/${district}`);

//   if (!res.ok) {
//     const msg = await res.text().catch(() => 'District not found');
//     throw new Error(msg);
//   }

//   // The backend returns exactly the shape of DistrictPerformance
//   const data = (await res.json()) as DistrictPerformance;
//   return data;
// };

/* --------------------------------------------------------------
   2. Fetch district-vs-state comparison
   -------------------------------------------------------------- */
export interface ComparisonResponse {
  district: DistrictPerformance;
  state: DistrictPerformance;
  difference: {
    householdsWorked: number;
    personDays: number;
    averageWage: number;
    worksCompleted: number;
  };
}

export const compareDistrictWithState = async (
  district: string
): Promise<ComparisonResponse> => {
  const res = await fetch(`${API_URL}/api/mgnrega/compare/${district}`);

  if (!res.ok) {
    const msg = await res.text().catch(() => 'Comparison failed');
    throw new Error(msg);
  }

  const data = (await res.json()) as ComparisonResponse;
  return data;
};

/* --------------------------------------------------------------
   3. Helper: map ComparisonResponse → StateComparison (used in UI)
   -------------------------------------------------------------- */
export const mapToStateComparison = (
  resp: ComparisonResponse
): StateComparison => ({
  stateAverage: {
    jobCardsIssued: resp.state.jobCardsIssued,
    activeWorkers: resp.state.activeWorkers,
    avgWagePerDay: resp.state.avgWagePerDay,
    worksCompleted: resp.state.worksCompleted,
  },
  districtRank: 0,               // backend does not return rank – you can add it later
  totalDistricts: 0,             // same as above
  performanceScore: 0,           // you can compute it from `difference` if you want
});