import React from "react";
import { useApp } from "../contexts/AppContext";
import { t } from "../lib/translations";
//import { Language } from "../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import {
  Settings,
  Volume2,
  Type,
  Moon,
  Sun,
  Home,
  LayoutDashboard,
  ArrowLeftRight,
  Book,
  Building2,
  FileText,
} from "lucide-react";

interface TopBarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function TopBar({ activeScreen, onNavigate }: TopBarProps) {
  const {
    language,
    setLanguage,
    textSize,
    setTextSize,
    darkMode,
    setDarkMode,
    voiceEnabled,
    setVoiceEnabled,
  } = useApp();

  // const languageOptions: { value: Language; label: string }[] = [
  //   { value: "en", label: "English" },
  //   { value: "hi", label: "हिन्दी" },
  //   { value: "aw", label: "अवधी" },
  //   { value: "bh", label: "भोजपुरी" },
  // ];

  const navItems = [
    { id: "home", icon: Home, label: t("home", language) },
    { id: "dashboard", icon: LayoutDashboard, label: t("dashboard", language) },
    { id: "compare", icon: ArrowLeftRight, label: t("compare", language) },
    // { id: 'works', icon: Building2, label: t('works', language) },
    { id: "reports", icon: FileText, label: t("reports", language) },
    { id: "glossary", icon: Book, label: t("glossary", language) },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 gradient-animated text-white shadow-lg z-40 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3 transition-smooth">
          <h3 className="text-white">{t("appName", language)}</h3>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-smooth ${
                    isActive
                      ? "bg-white/25 text-white shadow-lg backdrop-blur-sm"
                      : "text-blue-100 hover:bg-white/15 hover:text-white hover:shadow-md"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-xl p-2 text-white hover:bg-white/20 transition-smooth hover:shadow-lg backdrop-blur-sm">
                <Settings className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  {language === "en" ? "Settings" : "सेटिंग्स"}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">
                    🌐 {language === "en" ? "Language" : "भाषा"}
                  </label>
                  <Select
                    value={language}
                    // onValueChange={(val: string) =>
                    //   setLanguage(val as Language)
                    // }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-blue-600" />
                    <label className="text-sm text-gray-700">
                      {t("voiceAssist", language)}
                    </label>
                  </div>
                  <Switch
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Type className="h-5 w-5 text-blue-600" />
                    {t("textSize", language)}
                  </label>
                  <Select
                    value={textSize}
                    onValueChange={(val: any) => setTextSize(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        {language === "en" ? "Normal" : "सामान्य"}
                      </SelectItem>
                      <SelectItem value="large">
                        {language === "en" ? "Large" : "बड़ा"}
                      </SelectItem>
                      <SelectItem value="xlarge">
                        {language === "en" ? "Extra Large" : "अतिरिक्त बड़ा"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-blue-600" />
                    )}
                    <label className="text-sm text-gray-700">
                      {t("darkMode", language)}
                    </label>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t md:hidden">
                <p className="text-sm text-gray-600 mb-3">
                  {language === "en" ? "Navigation" : "नेविगेशन"}
                </p>
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
