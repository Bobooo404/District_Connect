import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DistrictPerformance, StateComparison } from "../types/mgnrega.types";

type Language = "en" | "hi";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  textSize: "normal" | "large" | "xlarge";
  setTextSize: (size: "normal" | "large" | "xlarge") => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  isOffline: boolean;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;

  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;

  districtData: DistrictPerformance | null;
  setDistrictData: (data: DistrictPerformance | null) => void;

  all_districts: DistrictPerformance[];
  setAll_Districts: (data: DistrictPerformance[]) => void;

  comparisonData: StateComparison | null;
  setComparisonData: (data: StateComparison | null) => void;
}

const AppContext = createContext(undefined as AppContextType | undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en" as Language);
  const [selectedDistrict, setSelectedDistrict] = useState("Lucknow");
  const [textSize, setTextSize] = useState(
    "normal" as "normal" | "large" | "xlarge"
  );
  const [darkMode, setDarkMode] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [districtData, setDistrictData] = useState<DistrictPerformance | null>(
    null
  );
  const [all_districts, setAll_Districts] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<StateComparison | null>(
    null
  );

  useEffect(() => {
    // Simulate auto-detect district (in real app, this would be a geo API call)
    const detectedDistrict =
      localStorage.getItem("detectedDistrict") || "Lucknow";
    setSelectedDistrict(detectedDistrict);

    // Check online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // Apply text size class to body
    document.body.className = `text-size-${textSize} ${darkMode ? "dark" : ""}`;
  }, [textSize, darkMode]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        selectedDistrict,
        setSelectedDistrict,
        textSize,
        setTextSize,
        darkMode,
        setDarkMode,
        isOffline,
        voiceEnabled,
        setVoiceEnabled,
        districtData,
        setDistrictData,
        all_districts,
        setAll_Districts,
        comparisonData,
        setComparisonData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
