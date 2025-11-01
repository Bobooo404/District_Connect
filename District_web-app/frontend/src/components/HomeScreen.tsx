// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../contexts/AppContext";
import { Home } from "lucide-react";

import { t } from "../lib/translations";
// import { districts } from "../lib/mockData";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  MapPin,
  WifiOff,
  Info,
  Target,
  Users,
  Shield,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { DistrictPerformance, StateComparison } from "../types/mgnrega.types";

// API lives at src/api.ts (or src/api.js)
// import { fetchDistrictData, compareDistrictWithState } from "../api"; // correct relative path from src/screens/

const API_URL = import.meta.env.VITE_API_URL;
console.log("fetching district data from :", API_URL);

// -------------------------------------------------------------------
//  JSX namespace fallback (only needed if React types are missing)
// -------------------------------------------------------------------
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// -------------------------------------------------------------------
interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

// -------------------------------------------------------------------
export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const {
    language,
    isOffline,

    selectedDistrict,
    setSelectedDistrict,

    districtData,
    setDistrictData,

    all_districts,
    setAll_Districts,

    comparisonData,
    setComparisonData,
  } = useApp();

  // local UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // real districts from api
  // const [districts, setDistricts] = useState([]);
  // const [selectedDistrict, setselectedDistrict] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/mgnrega/get_all_districts`)
      .then((response) => response.json())
      .then((data) => {
        console.log("All districts are : ", data.records);
        setAll_Districts(data.records); // if API returns { districts: [...] }
        // setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching districts:", err);
        setLoading(false);
      });
  }, []);

  // -----------------------------------------------------------------
  //  API call – fully typed
  // -----------------------------------------------------------------

  const handleViewPerformance = async () => {
    if (!selectedDistrict) {
      setError(
        t("selectDistrictPrompt", language) || "Please select a district"
      );
      return;
    }

    if (isOffline) {
      setError(
        t("offlineError", language) || "Cannot fetch data in offline mode"
      );
      return;
    }

    try {
      setError("");
      setLoading(true);

      // // Best: Let TypeScript infer
      // const [data, compareData] = await Promise.all([
      //   fetchDistrictData(selectedDistrict),
      //   compareDistrictWithState(selectedDistrict),
      // ]);

      // look up district in the all_districts array from AppContext
      const normalize = (s: any) => (s ? String(s).trim().toLowerCase() : "");

      const byName = all_districts.find(
        (d: any) => normalize(d.district_name) === normalize(selectedDistrict)
      );
      const districtObj = byName;
      console.log("District object found:", districtObj);
      // console.log("By name lookup:", byName);

      if (districtObj) {
        // set the single-district data in context
        setDistrictData(districtObj as DistrictPerformance);
        // optionally set comparison data / navigate
        onNavigate("dashboard");
        return;
      }
    } catch (err: any) {
      console.error("API Error:", err);
      setError(
        err.message || t("fetchError", language) || "Failed to fetch data"
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------------------------------
  //  Render
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen gradient-animated relative overflow-hidden">
      {/* floating background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl float-animation" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="px-4 pt-8 pb-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-white text-4xl md:text-5xl font-black mb-2 drop-shadow-lg tracking-wide animate-pulse">
            {t("appName", language)}
          </h1>

          <p className="text-blue-100 opacity-90 text-lg md:text-xl font-semibold tracking-wide">
            Tracking Work. Empowering Lives.
          </p>
        </motion.div>

        {/* Offline notice */}
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="mb-4 glass-card border-yellow-300">
              <WifiOff className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                {t("offlineMode", language)}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Error notice */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="mb-3 bg-red-50 border border-red-300 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* District selector + button */}
        <motion.div
          className="glass-card rounded-3xl shadow-2xl p-6 mb-6 card-3d"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3 text-gray-700">
            <MapPin className="h-5 w-5 text-blue-600" />
            <label>{t("selectDistrict", language)}</label>
          </div>

          <Select
            value={selectedDistrict}
            onValueChange={setSelectedDistrict}
            disabled={loading}
          >
            <SelectTrigger className="w-full h-14 bg-white/50 border-2 border-blue-200 rounded-xl backdrop-blur-sm transition-smooth hover:border-blue-300 focus:border-blue-400">
              <SelectValue
                placeholder={t("selectDistrictPlaceholder", language)}
              />
            </SelectTrigger>
            <SelectContent className="max-h-60 glass-card">
              {all_districts?.map((element) => (
                <SelectItem
                  key={element.district_code}
                  value={element.district_name}
                  className="transition-smooth hover:bg-blue-50"
                >
                  {element.district_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleViewPerformance}
              disabled={loading || isOffline || !selectedDistrict}
              className="w-full h-14 mt-6 gradient-blue hover:glow-blue-strong shadow-lg transition-smooth rounded-xl disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("loading", language)}
                </span>
              ) : (
                t("viewPerformance", language)
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Last updated */}
        <motion.div
          className="glass-card rounded-2xl p-4 text-center space-y-2 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-700">
            {t("lastUpdated", language)}:{" "}
            {new Date().toLocaleDateString(
              language === "en" ? "en-IN" : "hi-IN"
            )}
          </p>
          <p className="text-gray-600 text-sm">{t("dataSource", language)}</p>
        </motion.div>

        {/* Stats cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 mb-12">
          <motion.div
            className="glass-card-dark rounded-2xl p-6 text-center card-3d shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Home
                className="w-10 h-10 text-white float-animation"
                strokeWidth={1.5}
              />
            </div>

            <p className="text-white drop-shadow-md">
              75 {language === "hi" ? "जिले" : "Districts"}
            </p>
          </motion.div>

          <motion.div
            className="glass-card-dark rounded-2xl p-6 text-center card-3d shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Users
                className="w-10 h-10 text-white float-animation"
                strokeWidth={1.5}
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <p className="text-white drop-shadow-md">
              {language === "hi" ? "लाखों परिवार" : "Millions of Families"}
            </p>
          </motion.div>
        </div>

        {/* ---------- About & Info Sections (unchanged) ---------- */}
        {/* … (all the Card sections you already had) … */}
        {/* (kept exactly as you wrote – only minor formatting) */}
        <motion.div
          className="max-w-4xl mx-auto space-y-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {/* About MGNREGA */}
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-3">
                      {language === "en"
                        ? "About MGNREGA"
                        : "मनरेगा के बारे में"}
                    </h3>
                    <p className="text-gray-700 mb-3">
                      {language === "en"
                        ? 'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is an Indian labor law and social security measure that aims to guarantee the "right to work" and ensure livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.'
                        : 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जिसका उद्देश्य "काम का अधिकार" की गारंटी देना और ग्रामीण क्षेत्रों में आजीविका सुरक्षा सुनिश्चित करना है, प्रत्येक परिवार को एक वित्तीय वर्ष में कम से कम 100 दिनों का मजदूरी रोजगार प्रदान करके जिसके वयस्क सदस्य अकुशल मैनुअल काम करने के लिए स्वेच्छा से काम करते हैं।'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === "en"
                        ? "Enacted in 2005, MGNREGA is one of the largest social security schemes in the world."
                        : "2005 में अधिनियमित, मनरेगा दुनिया की सबसे बड़ी सामाजिक सुरक्षा योजनाओं में से एक है।"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Our Mission */}
            <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 mb-2">
                      {language === "en" ? "Our Mission" : "हमारा उद्देश्य"}
                    </CardTitle>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "To provide transparent access to MGNREGA performance data and empower citizens with information about rural employment initiatives in their districts."
                        : "मनरेगा प्रदर्शन डेटा तक पारदर्शी पहुंच प्रदान करना और नागरिकों को उनके जिलों में ग्रामीण रोजगार पहलों के बारे में जानकारी के साथ सशक्त बनाना।"}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* For Citizens */}
            <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 mb-2">
                      {language === "en" ? "For Citizens" : "नागरिकों के लिए"}
                    </CardTitle>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "Easy-to-understand dashboards, multilingual support, and voice assistance make MGNREGA data accessible to everyone, regardless of literacy level."
                        : "समझने में आसान डैशबोर्ड, बहुभाषी समर्थन, और ध्वनि सहायता साक्षरता स्तर की परवाह किए बिना सभी के लिए मनरेगा डेटा सुलभ बनाती है।"}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Data Integrity */}
            <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 mb-2">
                      {language === "en" ? "Data Integrity" : "डेटा अखंडता"}
                    </CardTitle>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "All data is sourced directly from official MGNREGA public data portals and government databases, ensuring accuracy and reliability."
                        : "सभी डेटा सीधे आधिकारिक मनरेगा सार्वजनिक डेटा पोर्टल और सरकारी डेटाबेस से प्राप्त किया जाता है, जो सटीकता और विश्वसनीयता सुनिश्चित करता है।"}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Key Features */}
            <Card className="rounded-3xl shadow-2xl border-0 glass-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  {language === "en" ? "Key Features" : "मुख्य विशेषताएं"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Real-time district performance metrics and analytics"
                        : "रियल-टाइम जिला प्रदर्शन मेट्रिक्स और विश्लेषण"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Compare your district with state averages"
                        : "अपने जिले की राज्य औसत से तुलना करें"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Track ongoing and completed works in your area"
                        : "अपने क्षेत्र में चल रहे और पूर्ण कार्यों को ट्रैक करें"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Download official reports and documentation"
                        : "आधिकारिक रिपोर्ट और दस्तावेज़ डाउनलोड करें"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Multilingual support with voice assistance"
                        : "ध्वनि सहायता के साथ बहुभाषी समर्थन"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Accessibility features including text size adjustment and dark mode"
                        : "टेक्स्ट आकार समायोजन और डार्क मोड सहित पहुंच सुविधाएं"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
