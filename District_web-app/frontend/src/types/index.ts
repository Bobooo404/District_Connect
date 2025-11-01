export interface DistrictData {
  districtId: string;
  districtName: string;
  householdsWorked: number;
  personDays: number;
  averageWage: number;
  worksCompleted: number;
  trends: {
    householdsWorked: number[];
    personDays: number[];
    averageWage: number[];
    worksCompleted: number[];
  };
  lastUpdated: string;
}

export interface StateAverage {
  householdsWorked: number;
  personDays: number;
  averageWage: number;
  worksCompleted: number;
}

export type Language = 'hi' | 'en' | 'aw' | 'bh';

export interface GlossaryTerm {
  id: string;
  term: Record<Language, string>;
  definition: Record<Language, string>;
  icon: string;
}
