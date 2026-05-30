import React, { useState } from "react";
import Header from "./components/Header";
import IntroSummary from "./components/IntroSummary";
import GeographyLesson from "./components/GeographyLesson";
import HistoryLesson from "./components/HistoryLesson";
import ModernLesson from "./components/ModernLesson";
import WorkbookActivity from "./components/WorkbookActivity";
import QuizModule from "./components/QuizModule";
import { Award, ShieldAlert, GraduationCap, MapPin, Search } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("intro");

  // State to hold submitted form details across tabs if we want to print it
  const [printedNames, setPrintedNames] = useState<string>("김민우 / 사토 타쿠야");
  const [printedTitle, setPrintedTitle] = useState<string>("동해의 평화로운 화산섬, 자연과 역사가 숨쉬는 독도");
  const [printedContent, setPrintedContent] = useState<string>("");
  const [printedQ1, setPrintedQ1] = useState<string>("");
  const [printedQ2, setPrintedQ2] = useState<string>("");
  const [printedQ3, setPrintedQ3] = useState<string>("");

  const handlePrint = () => {
    // Attempt to scrape any active edited inputs from DOM and cache them in localized state before print
    const nameEl = document.querySelector('input[value*="김민우"]') || document.querySelector('input[value*="인천공항고"]');
    if (nameEl) setPrintedNames((nameEl as HTMLInputElement).value);

    // We can just call window.print() directly!
    window.print();
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case "intro":
        return <IntroSummary setActiveTab={setActiveTab} />;
      case "geo":
        return <GeographyLesson />;
      case "history":
        return <HistoryLesson />;
      case "modern":
        return <ModernLesson />;
      case "workbook":
        return <WorkbookActivity onPrint={handlePrint} />;
      case "quiz":
        return <QuizModule />;
      default:
        return <IntroSummary setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* Printable Sheet Area (Hidden on screen, Visible on print) */}
      <div id="printable-report" className="hidden print:block p-8 bg-white text-slate-900 max-w-4xl mx-auto font-serif">
        <div className="text-center border-b-4 border-double border-slate-900 pb-5">
          <span className="text-xs uppercase tracking-widest font-mono block">Supplementary Course Outcome Document</span>
          <h1 className="text-3xl font-extrabold font-serif mt-2">독도 주권 교육 종합 활동지 보고서</h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">대한민국 역사·지리 평화교육위원회 인증 교재</p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-300 pb-4 text-sm">
            <div>
              <strong>학습 주제:</strong> 한·일 평화 공동 동아시아 교과서 집필
            </div>
            <div>
              <strong>편찬 기조:</strong> 고고학적 사료 기반의 객관화 서술
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="border border-slate-300 p-4 rounded bg-slate-50/20">
              <span className="text-xs font-mono text-slate-400 block uppercase">이름 및 소속 모둠원</span>
              <p className="text-base font-bold text-slate-950 mt-1">김민우(인천공항고) / 사토 타쿠야(도쿄 가쿠게이 중등부)</p>
            </div>

            <div className="border border-slate-300 p-4 rounded bg-slate-50/20">
              <span className="text-xs font-mono text-slate-400 block uppercase">공동 제안 대단원 제목</span>
              <p className="text-base font-extrabold text-slate-950 mt-1">동해의 평화로운 화산섬, 자연과 역사가 숨쉬는 독도</p>
            </div>

            <div className="border border-slate-300 p-5 rounded">
              <span className="text-xs font-mono text-slate-400 block uppercase mb-2">공동 교과서 집필 초안문 (본문)</span>
              <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-serif italic text-justify">
                동해의 평화로운 섬 독도는 객관적 사료를 통해 그 역사적 지위가 분명히 규명된다. 한국의 고문서인 『세종실록지리지(1454년)』에는 울릉도와 독도가 맑은 날 육안으로 관측 가능하다고 하여 조선 왕조의 생활권이었음을 시각적으로 명시하고 있다. 또한, 일본의 역사적 고공무서이자 메이지 정부의 최고 결정 기관에서 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 무관한 조선의 영토임을 스스로 인지하고 이를 명문화하여 엄격히 하달하였다. 오늘날 현대 배타적 경제수역(EEZ)의 중간 수역 마찰을 평화적 상호 이해로 이결하고, 양국 미래 세대가 협력하는 번영의 동해 바다로 일구어 가야 한다.
              </p>
            </div>
          </div>

          {/* Discussions answers */}
          <div className="space-y-4 pt-4 border-t border-slate-300">
            <h3 className="text-base font-bold font-serif underline">토론 및 개별 성찰 답변 기록</h3>
            
            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-700">Q1. 일본의 1877년 『태정관 지령』이 현대 일본 외무성의 주장을 반박하는 가장 결정적 사료인 이유</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                태정관 지령은 일본 최고 국가기구 스스로 독도와 울릉도를 '조선의 영역'으로 공치 확정하고 자국 관할권에서 확실하게 배제한 공식 공문서이므로, 현대 일본 외무성의 역사 왜곡 주장(에도 시대부터 자국 인지)을 원천 무효화시키는 가장 양심적이고 철저한 반박 기록이기 때문입니다.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-700">Q2. '신한일어업협정(1998년)'의 한·일 임시 타협 중간수역 획정 배경에 대한 어업권 가치 평가</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                외교적 난제로 영토 기점 합의가 평행선을 달리자 국가 공권력은 일단 무역과 실제 어업 조업 구역을 지키기 위해 타협 임시 공동 수역인 '중간수역'을 획정했습니다. 영유권 문제 선점을 일단 미룬 임시방편이었기에 국내적으로 거센 비판과 영토 훼손 우려를 낳았습니다.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-700">Q3. 한일 미래 동아시아 세대 청소년 학술교류 및 역사 캠프가 필요한 지점</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                정치적이고 편향된 내셔널리즘 자극 대립에서 벗어나, 양국 실증 역사 기록과 공동 관심사, 평화 화합을 직접 토론하고 배우는 기회를 넓혀야만 미래의 성숙하고 평화로운 동아시아 상생 공동체를 선도할 수 있기 때문입니다.
              </p>
            </div>
          </div>

          {/* Educational Committee seal signature */}
          <div className="border-t-2 border-slate-800 pt-6 flex justify-between items-center bg-slate-50/50 p-4 rounded mt-4">
            <div>
              <p className="text-xs text-slate-400">교안 실천 심의 평가원 종합 소장</p>
              <h4 className="text-sm font-extrabold text-slate-950 font-serif mt-1">대한민국 역사·지리 평화교육위원회 심사단 일동</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">본 결과지는 교재 내용 이수 기준을 총족하여 정식 산출물로 가결되었습니다.</p>
            </div>
            <div className="border-2 border-red-500 text-red-650 px-3 py-1 font-bold font-serif text-sm rotate-[-2deg] rounded">
              평화지적 심사필 (인)
            </div>
          </div>
        </div>
      </div>

      {/* Screen View (Visible on display, Hidden on print) */}
      <div className="print:hidden flex flex-col justify-between min-h-screen relative overflow-hidden bg-[#020617] text-white">
        {/* Background Ambient Blurs */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header navigation bar */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} onPrint={handlePrint} />

        {/* Core Lesson Screen content */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full flex-grow relative z-10">
          <div className="space-y-6">
            {renderActiveContent()}
          </div>
        </main>

        {/* Footer info label */}
        <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 py-6 text-slate-400">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p className="font-semibold text-slate-450">
              © 2026 대한민국 역사·지리 평화교육위원회. All Rights Reserved.
            </p>
            <div className="flex gap-4 font-mono font-medium text-[11px]">
              <span className="text-slate-500">System Code: AIS-DOKDO-STUDY</span>
              <span className="text-blue-400">독도는 대한민국의 고유 영토입니다.</span>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
