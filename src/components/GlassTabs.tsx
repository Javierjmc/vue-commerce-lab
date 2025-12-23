import { useState, useRef, useEffect } from "react";
import { FileText, BarChart3, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import TeamSection from "./tabs/TeamSection";
import FAQSection from "./tabs/FAQSection";
import GoogleMapsSection from "./tabs/GoogleMapsSection";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "equipo", label: "Equipo", icon: <FileText className="h-5 w-5" />, content: <TeamSection /> },
  { id: "preguntas-frecuentes", label: "Preguntas Frecuentes", icon: <BarChart3 className="h-5 w-5" />, content: <FAQSection /> },
  { id: "ubicacion", label: "Ubicación", icon: <Bell className="h-5 w-5" />, content: <GoogleMapsSection /> },
];

export function GlassTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const currentTab = tabRefs.current[tabs.findIndex(t => t.id === activeTab)];
    if (currentTab) {
      setIndicatorStyle({ left: currentTab.offsetLeft, width: currentTab.offsetWidth });
    }
  }, [activeTab]);

  return (
    <section className="w-full">
      {/* Tab Navigation */}
      <div className="relative mb-6 rounded-xl bg-primary shadow-lg">
        <div className="flex relative">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={el => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-8 text-sm font-semibold text-white transition-all duration-300 relative hover:scale-105",
                  isActive ? "font-bold" : "text-white/80 hover:text-white"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}

          {/* Active Indicator */}
          <span
            className="absolute bottom-0 h-1 bg-white rounded-full transition-all duration-300"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white shadow-md px-6 min-h-[200px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              activeTab === tab.id ? "block opacity-100" : "hidden opacity-0",
              "transition-opacity duration-300"
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </section>
  );
}
