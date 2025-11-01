export interface ComparisonData {
  district: string;
  state: string;
  compare: {
    Total_Individuals_Worked: {
      district: number;
      state_total: number;
    };
    Women_Persondays: {
      district: number;
      state_total: number;
    };
    Average_Wage: {
      district: number;
      state_avg: number;
    };
  };
}
