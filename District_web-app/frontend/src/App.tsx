import React, { useState } from "react";
import { AppProvider } from "./contexts/AppContext";
import { TopBar } from "./components/TopBar";
import { HomeScreen } from "./components/HomeScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { CompareScreen } from "./components/CompareScreen";
//import { WorksScreen } from './components/WorksScreen';
import { ReportsScreen } from "./components/ReportsScreen";
import { GlossaryScreen } from "./components/GlossaryScreen";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen onNavigate={setActiveScreen} />;
      case "dashboard":
        return <DashboardScreen />;
      case "compare":
        return <CompareScreen />;
      // case 'works':
      //   return <WorksScreen />;
      case "reports":
        return <ReportsScreen />;
      case "glossary":
        return <GlossaryScreen />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <TopBar activeScreen={activeScreen} onNavigate={setActiveScreen} />
        <div className="pt-14">{renderScreen()}</div>
        <Toaster />
      </div>
    </AppProvider>
  );
}
