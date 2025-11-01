import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../contexts/AppContext";
import { t } from "../lib/translations";
import { getMockDistrictData } from "../lib/mockData";
import { DistrictData } from "../types/index";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import {
  Home,
  Users,
  IndianRupee,
  Building2,
  Volume2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { speak, getLangCode } from "../lib/voiceAssist";

export function DashboardScreen() {
  const { language, selectedDistrict, voiceEnabled, districtData } = useApp();
  const [data, setData] = useState<DistrictData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const districtData = getMockDistrictData(selectedDistrict);
      setData(districtData);
      setLoading(false);
    }, 800);
  }, [selectedDistrict]);

  const generateSummary = () => {
    if (!data) return "";

    const prevWage =
      data.trends.averageWage[data.trends.averageWage.length - 2];
    const currentWage = data.averageWage;
    const wageDiff = Math.abs(Math.round(currentWage - prevWage));
    const improved = currentWage > prevWage;

    if (language === "hi") {
      return improved
        ? `आपके जिले की औसत मजदूरी पिछले महीने से ${wageDiff} रुपये बढ़ी है।`
        : `आपके जिले की औसत मजदूरी पिछले महीने से ${wageDiff} रुपये घटी है।`;
    } else {
      return improved
        ? `Your district's average wage improved by ₹${wageDiff} since last month.`
        : `Your district's average wage decreased by ₹${wageDiff} since last month.`;
    }
  };

  const handleSpeak = (text: string) => {
    if (voiceEnabled) speak(text, getLangCode(language));
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-blue-soft">
        <div className="gradient-animated px-4 py-6 text-white shadow-lg">
          <Skeleton className="h-8 w-48 mb-2 bg-white/20 rounded-xl shimmer" />
          <Skeleton className="h-4 w-32 bg-white/20 rounded-xl shimmer" />
        </div>
        <div className="px-4 py-6 space-y-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-3xl shimmer" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    {
      icon: Home,
      value:
        districtData?.Average_days_of_employment_provided_per_Household ??
        "N/A",
      label: t("householdsWorked", language),
      prev: data.trends.householdsWorked.at(-2),
      now: data.trends.householdsWorked.at(-1),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      value: districtData?.Total_No_of_Active_Workers ?? "N/A",
      label: t("personDays", language),
      prev: data.trends.personDays.at(-2),
      now: data.trends.personDays.at(-1),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: IndianRupee,
      value: `₹${districtData?.Average_Wage_rate_per_day_per_person}`,
      label: t("averageWage", language),
      prev: data.trends.averageWage.at(-2),
      now: data.trends.averageWage.at(-1),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Building2,
      value: districtData?.Number_of_Completed_Works ?? "N/A",
      label: t("worksCompleted", language),
      prev: data.trends.worksCompleted.at(-2),
      now: data.trends.worksCompleted.at(-1),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen gradient-blue-soft">
      <div className="gradient-animated px-4 py-6 text-white shadow-lg backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-1 drop-shadow-lg">{selectedDistrict}</h2>
          <p className="text-blue-100 text-sm opacity-90">
            {t("lastUpdated", language)}:{" "}
            {new Date(data.lastUpdated).toLocaleDateString(
              language === "en" ? "en-IN" : "hi-IN"
            )}
          </p>
        </motion.div>
      </div>

      <div className="px-4 py-6 space-y-4 max-w-6xl mx-auto">
        {stats.map((stat, idx) => {
          const improving = (stat.now ?? 0) > (stat.prev ?? 0);
          const diff = Math.abs((stat.now ?? 0) - (stat.prev ?? 0));

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="w-full rounded-3xl shadow-xl border-0 glass-card hover:-translate-y-1 transition-all">
                <CardHeader className={`${stat.bgColor} pb-3 rounded-t-3xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`${stat.color} p-3 bg-white rounded-2xl shadow-md`}
                      >
                        <stat.icon className="h-6 w-6" />
                      </motion.div>
                      <div>
                        <p className={`${stat.color} text-xs opacity-75`}>
                          {stat.label}
                        </p>
                        <p className={`${stat.color} text-lg font-bold`}>
                          {stat.value}
                        </p>
                      </div>
                    </div>

                    {voiceEnabled && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handleSpeak(`${stat.label} ${stat.value}`)
                        }
                        className="p-2 hover:bg-white/50 rounded-xl"
                      >
                        <Volume2 className={`h-5 w-5 ${stat.color}`} />
                      </motion.button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-4 pb-4 bg-white/80 rounded-b-3xl">
                  <Badge
                    className={`text-xs px-3 py-1 flex items-center gap-1 ${
                      improving
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {improving ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                    {improving ? "Improving" : "Declining"}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="rounded-3xl glass-card-dark shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  💡
                </motion.span>
                <div className="flex-1 text-white">{generateSummary()}</div>

                {voiceEnabled && (
                  <button
                    onClick={() => handleSpeak(generateSummary())}
                    className="text-blue-200 hover:text-white"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
