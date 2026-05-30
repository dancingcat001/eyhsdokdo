import React from "react";
import { BookOpen, GraduationCap, Printer } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
}

export default function Header({ activeTab, setActiveTab, onPrint }: HeaderProps) {
  const tabs = [
    { id: "intro", label: "교재 요약" },
    { id: "geo", label: "1차시. 지리 & 영역" },
    { id: "history", label: "2차시. 사료 & 고지도" },
    { id: "modern", label: "3차시. 현대사 갈등" },
    { id: "workbook", label: "수업 활동지" },
    { id: "quiz", label: "평가 퀴즈" },
  ];

  return (
    <header className="bg-white/5 backdrop-blur-md text-white border-b border-white/10 sticky top-0 z-50 print:hidden shadow-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600/30 p-2.5 md:p-3 rounded-xl text-blue-400 border border-blue-500/40 shadow-inner shrink-0">
              <GraduationCap className="w-6 md:w-8 h-6 md:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  중·고등용 융합 수업 자료
                </span>
                <span className="text-[10px] md:text-xs text-slate-400 font-mono">
                  Ver 1.1 (2026.05)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                독도 영토 주권 교육 종합 워크북
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5 font-medium">
                지리적 특성, 역사적 사료 및 한일 갈등의 평화적 해결 방안
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <span className="text-[11px] md:text-xs bg-white/5 text-slate-300 py-1.5 px-3 rounded-md border border-white/10 hidden lg:inline-block font-medium">
              대한민국 역사·지리 평화교육위원회 편찬
            </span>
            <button
              onClick={onPrint}
              id="print-btn"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/25 active:bg-white/30 text-white py-2 px-4 rounded-xl text-xs md:text-sm transition-all border border-white/20 font-bold tracking-wide shadow-lg cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>교안 인쇄</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-5 overflow-x-auto scrollbar-none border-t border-white/10 pt-2 flex items-center justify-between">
          <div className="flex gap-1 md:gap-2 whitespace-nowrap pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600/80 text-white border border-blue-500/40 shadow shadow-blue-500/25"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono font-medium pl-4 py-1 border-l border-white/10">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Dokdo Study Guide</span>
          </div>
        </div>
      </div>
    </header>
  );
}
