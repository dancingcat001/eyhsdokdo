import React, { useState } from "react";
import { AlertCircle, Calendar, ShieldCheck, Heart, Flag, Bookmark, HelpCircle } from "lucide-react";
import { MODERN_TIMELINE } from "../data";

export default function ModernLesson() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);

  const activeEvent = MODERN_TIMELINE[selectedEventIndex];

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Overview Block */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            3차시 (제3교시)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            현대 독도 갈등의 전개와 평화적 상생 방안
          </h2>
          <p className="text-slate-350 mt-3 text-sm md:text-base leading-relaxed">
            현대 독도 외교 마조히즘은 세계 2차 대전 이후 <strong>전후 일본 영토 반환 격계 선포 과정의 고의적 공백</strong>과 유엔 해양법 발효로 도입된 <strong>배타적 경제수역(EEZ) 체제</strong>가 맞물리며 탄생한 구조적 마찰에 놓여 있습니다. 각 핵심 정국과 수호 노력의 발자취를 추적합니다.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline navigation sidebar */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono pl-1">정국 시각 타임라인</span>

          <div className="space-y-2 mt-2">
            {MODERN_TIMELINE.map((event, idx) => {
              const isSelected = selectedEventIndex === idx;

              // Distinguish color based on period tag
              let periodColor = "text-slate-300 bg-white/10 border-white/10";
              if (event.period === "전후 처리 과정") {
                periodColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/35";
              } else if (event.period === "주권 수호의 투쟁") {
                periodColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/35";
              } else if (event.period === "조정기와 갈등의 불씨") {
                periodColor = "text-rose-400 bg-rose-500/10 border-rose-500/35";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedEventIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/5 font-semibold"
                      : "border-white/5 bg-white/3 hover:bg-white/8"
                  }`}
                >
                  {/* Glowing left strip */}
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-2xl"></span>
                  )}

                  <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? "text-blue-400" : "text-slate-500"}`} />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-blue-400">{event.year}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border ${periodColor}`}>
                        {event.period}
                      </span>
                    </div>
                    <span className={`text-sm tracking-tight block leading-snug ${isSelected ? "text-white font-bold" : "text-slate-300"}`}>
                      {event.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation viewer card */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs font-mono">
                <Bookmark className="w-3.5 h-3.5" />
                <span>{activeEvent.period}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-2 font-serif">{activeEvent.title}</h3>
              <p className="text-xs text-blue-450 font-mono mt-0.5 font-bold">{activeEvent.year}</p>
            </div>

            {/* Historical Details */}
            <div className="mt-5 space-y-4">
              <div>
                <span className="text-xs font-extrabold text-slate-450 uppercase tracking-widest block font-mono">상세 전개 과정</span>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed font-semibold bg-white/3 p-4 rounded-xl border border-white/5">
                  {activeEvent.details}
                </p>
              </div>

              {/* Historical Significance */}
              <div className="border-t border-dashed border-white/10 pt-5">
                <div className="flex items-center gap-1.5 text-blue-300 font-extrabold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="uppercase tracking-wider font-mono">주권 수호사적 가치 및 의의</span>
                </div>
                <p className="text-white font-bold text-sm mt-2 leading-relaxed">
                  {activeEvent.significance}
                </p>
              </div>
            </div>
          </div>

          {/* Peaceful co-existence callout */}
          <div className="mt-8 bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/25 flex items-start gap-3">
            <Heart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h5 className="text-xs font-bold text-emerald-300">지향해 갈 한·일 상호 평화적 관점</h5>
              <p className="text-[11px] leading-relaxed text-slate-300 mt-1.5 font-medium">
                대립이 격화될수록 우리는 '배타적 민족감정'의 구렁텅이를 넘어, 명시된 국제법 조리와 평화선 가치를 근간화하고, 다음 세대의 한일 연대 역사 전파를 통해 동해를 상생과 조화의 거점으로 평화롭게 승화시켜야 할 외교 책무가 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
