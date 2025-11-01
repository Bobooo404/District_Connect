import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../contexts/AppContext";
import { t } from "../lib/translations";
import { DistrictPerformance } from "../types/mgnrega.types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

export function CompareScreen() {
  const { language, selectedDistrict, all_districts } = useApp();
  const [data, setData] = useState<DistrictPerformance | null>(null);
  const [loading, setLoading] = useState(true);

  // Load selected district data
  useEffect(() => {
    if (!all_districts.length) return;

    const selected = all_districts.find(
      (d) => d.district_name === selectedDistrict
    );
    if (selected) {
      setData(selected);
      setLoading(false);
    }
  }, [selectedDistrict, all_districts]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-blue-soft">
        <div className="gradient-animated px-4 py-6 text-white shadow-lg">
          <Skeleton className="h-8 w-48 bg-white/20 rounded-xl shimmer" />
        </div>
        <div className="px-4 py-6 space-y-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-3xl shimmer" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Filter districts in same state
  const districtsInState = all_districts.filter(
    (d) => d.state_code === data.state_code
  );

  // Calculate avg
  const calcAvg = (key: keyof DistrictPerformance) => {
    const total = districtsInState.reduce(
      (sum, district) => sum + Number(district[key] || 0),
      0
    );
    return total / districtsInState.length;
  };

  // State average values
  const stateAvg = {
    Average_days_of_employment_provided_per_Household: calcAvg(
      "Average_days_of_employment_provided_per_Household"
    ),
    Total_No_of_Active_Workers: calcAvg("Total_No_of_Active_Workers"),
    Average_Wage_rate_per_day_per_person: calcAvg(
      "Average_Wage_rate_per_day_per_person"
    ),
    Number_of_Completed_Works: calcAvg("Number_of_Completed_Works"),
  };

  const comparisons = [
    {
      metric: t("householdsWorked", language),
      district: data.Average_days_of_employment_provided_per_Household,
      state: stateAvg.Average_days_of_employment_provided_per_Household,
    },
    {
      metric: t("personDays", language),
      district: data.Total_No_of_Active_Workers,
      state: stateAvg.Total_No_of_Active_Workers,
    },
    {
      metric: t("averageWage", language),
      district: data.Average_Wage_rate_per_day_per_person,
      state: stateAvg.Average_Wage_rate_per_day_per_person,
    },
    {
      metric: t("worksCompleted", language),
      district: data.Number_of_Completed_Works,
      state: stateAvg.Number_of_Completed_Works,
    },
  ];

  const overallPerformance =
    comparisons.reduce(
      (acc, comp) => acc + ((comp.district - comp.state) / comp.state) * 100,
      0
    ) / comparisons.length;

  return (
    <div className="min-h-screen gradient-blue-soft">
      <div className="gradient-animated px-4 py-6 text-white shadow-lg backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-1 drop-shadow-lg">{t("compare", language)}</h2>
          <p className="text-blue-100 text-sm opacity-90">
            {selectedDistrict} vs {t("upAverage", language)}
          </p>
        </motion.div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
        {/* Overall Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: overallPerformance > 0 ? [0, 10, 0] : [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {overallPerformance > 0 ? (
                    <TrendingUp className="h-8 w-8 text-green-600 drop-shadow-lg" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-600 drop-shadow-lg" />
                  )}
                </motion.div>
                <div>
                  <p className="text-gray-700">
                    {language === "hi"
                      ? "समग्र प्रदर्शन"
                      : "Overall Performance"}
                  </p>
                  <p
                    className={`${
                      overallPerformance > 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {overallPerformance > 0 ? "+" : ""}
                    {overallPerformance.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Metric Comparison Bars */}
        {comparisons.map((comp, idx) => {
          const percentDiff = ((comp.district - comp.state) / comp.state) * 100;
          const isAbove = percentDiff > 0;

          const chartData = [
            {
              name: t("yourDistrict", language),
              value: comp.district,
              fill: "#1565C0",
            },
            {
              name: t("upAverage", language),
              value: comp.state,
              fill: "#90CAF9",
            },
          ];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
            >
              <Card className="rounded-3xl shadow-xl border-0 glass-card card-3d overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
                  <CardTitle className="text-gray-900">{comp.metric}</CardTitle>
                </CardHeader>

                <CardContent className="bg-white/50 backdrop-blur-sm">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="mt-4 flex items-center justify-between glass-card rounded-2xl p-4 shadow-md">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-600 mb-1">
                        {t("yourDistrict", language)}
                      </p>
                      <p className="text-blue-700">
                        {comp.district.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <motion.div
                      className={`px-4 py-2 rounded-full text-xs shadow-lg ${
                        isAbove
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isAbove ? "+" : ""}
                      {percentDiff.toFixed(1)}%
                    </motion.div>

                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-600 mb-1">
                        {t("upAverage", language)}
                      </p>
                      <p className="text-gray-700">
                        {comp.state.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
