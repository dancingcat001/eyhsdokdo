import React from "react";
import { BookOpen, Calendar, HelpCircle, Compass, ChevronRight, Award } from "lucide-react";

interface IntroSummaryProps {
  setActiveTab: (tab: string) => void;
}

export default function IntroSummary({ setActiveTab }: IntroSummaryProps) {
  const contentsList = [
    {
      tabId: "geo",
      num: "1",
      title: "[1차시] 독도의 지리적 특성과 영역의 이해",
      subItems: [
        "1.1 지리적 위치와 물리적 거리 분석 (울릉도-독도 최단 87.4km)",
        "1.2 국가 영역(Territory)의 삼요소와 독도 (영토, 영해, 영공, EEZ)",
        "1.3 독도의 고유 주소와 도로명 체계 (이사부길, 안용복길)"
      ]
    },
    {
      tabId: "history",
      num: "2",
      title: "[2차시] 사료와 지도로 규명하는 역사적 권원",
      subItems: [
        "2.1 대한민국 고문서가 증명하는 독도 (세종실록지리지, 칙령 제41호 등)",
        "2.2 일본 관찬 고문서의 고백: 주권 배제 증거 (태정관 지령 1877년 등)",
        "2.3 역사적 지도(Map) 대조 분석 (삼국접양지도 1785년 등)",
        "2.4 안용복 사건과 한·일 외교 교섭"
      ]
    },
    {
      tabId: "modern",
      num: "3",
      title: "[3차시] 현대 독도 갈등의 전개와 평화적 상생 방안",
      subItems: [
        "3.1 전후 영토 처리와 샌프란시스코 강화조약의 공백 (SCAPIN 677호 등)",
        "3.2 평화선 선포와 주권 수호의 노력 (독도의용수비대의 결사 수호)",
        "3.3 신한일어업협정(1998년 중간수역 사태) 및 갈등의 분출"
      ]
    },
    {
      tabId: "workbook",
      num: "4",
      title: "[수업 활동지] 한·일 평화 공동 교과서 집필하기",
      subItems: [
        "4.1 공동 교과서 집필 활동 예시 양식 (소속, 대제목, 공동 서설문)",
        "4.2 토론 및 성찰 질문 리스트 (평가위원회 즉각 첨삭 심사)"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Textbook Cover Sheet Layout */}
      <div className="bg-white/5 backdrop-blur-2xl text-white rounded-[32px] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[450px]">
        {/* Background circular map compass graphics */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-white/5 opacity-10 pointer-events-none lg:block hidden">
          <Compass className="w-96 h-96 stroke-white" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          {/* Header metadata tag */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] md:text-xs bg-blue-500/10 border border-blue-500/35 text-blue-400 font-extrabold px-3 py-1 rounded-full tracking-wider uppercase font-mono shadow-sm">
              Middle & High School Standard Supplementary
            </span>
            <span className="text-xs text-slate-400 font-medium font-mono">
              [중·고등용 역사 및 지리 융합 수업 보조 자료]
            </span>
          </div>

          <div className="space-y-2 mt-4">
            <h1 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white">
              독도 영토 주권 교육 종합 교재
            </h1>
            <p className="text-sm md:text-lg text-slate-350 tracking-wide font-medium">
              지리적 특성, 역사적 사료 및 한일 갈등의 평화적 해결 방안
            </p>
          </div>

          {/* Publishing details */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-450 shrink-0" />
              <span>편찬 일시: <strong className="text-slate-300">2026년 5월</strong></span>
            </div>
            <div>
              <span>편찬위원회: <strong className="text-slate-300">대한민국 역사·지리 평화교육위원회</strong></span>
            </div>
          </div>
        </div>

        {/* Abstract / Summary section matching PDF Page 1 */}
        <div className="mt-10 pt-8 border-t border-white/10 relative z-10 max-w-3xl">
          <span className="text-[10px] bg-white/10 text-slate-200 font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/5">
            요 약 (SUMMARY)
          </span>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mt-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            본 교재는 대한민국 독도의 현대·중세적 지위와 동해 해양 영토의 역사적 문맥을 체계적으로 이해하기 위해 기획되었습니다. 학생들이 민족주의적 감정 감정적 해법을 넘어 명확한 <strong>역사적 고문서, 법적 조약문, 고지도의 시각적 대조 분석</strong>을 바탕으로 사실관계를 정립하고, 동아시아의 평화적 공동 해결 방안을 모색할 수 있는 비판적 사고력을 기르는 것을 목적으로 합니다.
          </p>
        </div>
      </div>

      {/* Index table of contents section */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <h3 className="text-lg font-extrabold text-white border-b border-white/5 pb-3 font-serif">
          차 례 (TABLE OF CONTENTS)
        </h3>
        <p className="text-xs text-slate-450 mt-2 mb-6">
          각 단원을 클릭하시면 해당 세션으로 바로 도약해 공부할 수 있는 유기적 연동 목차입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentsList.map((chapter) => (
            <button
              key={chapter.num}
              onClick={() => setActiveTab(chapter.tabId)}
              className="p-5 border border-white/5 rounded-2xl text-left bg-white/3 hover:bg-white/8 hover:border-blue-500/50 transition-all flex justify-between items-start cursor-pointer shadow-sm text-slate-300 hover:text-white group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 border border-white/10 flex items-center justify-center text-xs font-bold font-mono shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-colors">
                    {chapter.num}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {chapter.title}
                  </h4>
                </div>

                <ul className="text-xs text-slate-450 space-y-1 pl-8 leading-relaxed font-semibold">
                  {chapter.subItems.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-500 mt-0.5 shrink-0 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
