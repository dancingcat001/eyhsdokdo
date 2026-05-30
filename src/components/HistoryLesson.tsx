import React, { useState } from "react";
import { FileText, Map, Clock, HelpCircle, Archive, ArrowRight, Compass } from "lucide-react";
import { KOREAN_DOCUMENTS, JAPANESE_DOCUMENTS, HISTORY_MAPS, AN_YONG_BOK_TIMELINE } from "../data";

export default function HistoryLesson() {
  const [subTab, setSubTab] = useState<"docs" | "maps" | "anyong">("docs");
  const [selectedDocId, setSelectedDocId] = useState<string>("ko-doc1");
  const [selectedMapId, setSelectedMapId] = useState<string>("map-1");

  const currentDoc =
    KOREAN_DOCUMENTS.find((d) => d.id === selectedDocId) ||
    JAPANESE_DOCUMENTS.find((d) => d.id === selectedDocId) ||
    KOREAN_DOCUMENTS[0];

  const currentMap = HISTORY_MAPS.find((m) => m.id === selectedMapId) || HISTORY_MAPS[0];

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Overview Block */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            2차시 (제2교시)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            사료와 지도로 규명하는 역사적 권원
          </h2>
          <p className="text-slate-350 mt-3 text-sm md:text-base leading-relaxed">
            독도의 영유권을 밝히는 진정한 힘은 정치적 선동이나 감정적 구호가 아닌, <strong>확증된 고문서(Primary Sources)와 역사적 지도</strong>에 대한 공인 교차 교차 검증에서 도출됩니다. 한·일 양국의 옛 공식 관찬 기록물을 대조 분석하여 독도 주권의 역사를 정밀하게 발굴합니다.
          </p>
        </div>

        {/* Lesson Sub-Tabs Selector */}
        <div className="flex border-b border-white/10 mt-8 gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setSubTab("docs")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              subTab === "docs"
                ? "border-blue-400 text-blue-400 font-extrabold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            한·일 고문서 대조
          </button>
          <button
            onClick={() => setSubTab("maps")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              subTab === "maps"
                ? "border-blue-400 text-blue-400 font-extrabold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Map className="w-4 h-4" />
            역사적 지도(Map) 공람
          </button>
          <button
            onClick={() => setSubTab("anyong")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              subTab === "anyong"
                ? "border-blue-400 text-blue-400 font-extrabold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            안용복 사건과 외교 교섭
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Historical Documents Comparison */}
      {subTab === "docs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Document list menu */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider font-mono">
                대한민국 관찬 사료 (주권 기록)
              </h3>
              <div className="space-y-2 mt-3">
                {KOREAN_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedDocId === doc.id
                        ? "border-blue-500/50 bg-blue-500/10 font-bold"
                        : "border-white/5 bg-white/3 hover:bg-white/8"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block">{doc.year}</span>
                      <span className="text-sm text-slate-250 font-semibold">{doc.title}</span>
                    </div>
                    <span className="text-xs bg-blue-500/10 border border-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded-full font-bold">한국</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider font-mono pt-4 border-t border-white/10">
                일본 공식 공문서의 고백 (영토 제외 증거)
              </h3>
              <div className="space-y-2 mt-3">
                {JAPANESE_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedDocId === doc.id
                        ? "border-blue-500/50 bg-blue-500/10 font-bold"
                        : "border-white/5 bg-white/3 hover:bg-white/8"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block">{doc.year}</span>
                      <span className="text-sm text-slate-200 font-semibold">{doc.title}</span>
                    </div>
                    <span className="text-xs bg-red-500/15 border border-red-500/30 text-red-300 px-2.5 py-0.5 rounded-full font-bold">일본</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Document Study Card focus panel */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="text-xs text-blue-450 font-bold font-mono uppercase bg-blue-500/10 border border-blue-500/25 px-2 py-1 rounded">
                    {currentDoc.year} 편찬 사집
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2 font-serif">{currentDoc.title}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  currentDoc.nation === "Korea" 
                    ? "bg-blue-500/15 border-blue-500/30 text-blue-300" 
                    : "bg-red-500/15 border-red-500/30 text-red-300"
                }`}>
                  {currentDoc.nation === "Korea" ? "대한민국 소속" : "일본 정부 공문서"}
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <span className="text-xs font-extrabold text-slate-450 block uppercase font-mono tracking-wider">사료 해제 및 목적</span>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed bg-white/3 p-4 rounded-xl border border-white/5 font-medium">
                  {currentDoc.description}
                </p>
              </div>

              {/* Dynamic Original Quote */}
              {currentDoc.keyQuote && (
                <div className="mt-6 border-l-4 border-blue-500 bg-blue-500/5 pl-4 py-2 my-4 rounded-r-xl">
                  <span className="text-xs font-extrabold text-blue-400 block uppercase font-mono tracking-wider">핵심 원설 번역구절</span>
                  <p className="text-slate-200 font-serif text-base font-bold italic mt-1 leading-relaxed">
                    "{currentDoc.keyQuote}"
                  </p>
                </div>
              )}

              {/* Analytical Educational Meaning */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-xs font-extrabold text-slate-450 block uppercase font-mono tracking-wider">국제법 및 역사 교양적 의의</span>
                <p className="text-white font-semibold text-sm mt-1.5 leading-relaxed">
                  {currentDoc.meaning}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white/8 border border-white/10 p-4 rounded-2xl text-[11px] leading-relaxed text-slate-350">
              📜 <strong>고문서 열람 팁:</strong> 일본 메이지 외무성이 서명한 공식 문서들과 태정관 등이 하달한 칙령들은 현대 일본 측의 '오래전부터 자국 고유 영토'라는 억지 논리를 무산시키는 최우선 실효 반박 패스포트입니다.
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Historical Maps */}
      {subTab === "maps" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HISTORY_MAPS.map((map) => (
              <button
                key={map.id}
                onClick={() => setSelectedMapId(map.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedMapId === map.id
                    ? "border-blue-500/50 bg-blue-500/10 shadow-sm"
                    : "border-white/5 bg-white/3 hover:bg-white/8"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-500 font-bold">{map.year}</span>
                  <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded border ${
                    map.nation === "Korea" 
                      ? "bg-blue-500/10 border-blue-500/20 text-blue-300" 
                      : "bg-red-500/10 border-red-500/20 text-red-300"
                  }`}>
                    {map.nation === "Korea" ? "조선령" : "일본령 표기"}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-white whitespace-nowrap overflow-hidden text-ellipsis">{map.title}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-normal line-clamp-2">{map.description}</p>
              </button>
            ))}
          </div>

          {/* Interactive Map Spec Panel */}
          <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Graphic Representation Box */}
              <div className="w-full md:w-1/3 bg-slate-950 text-slate-300 h-64 rounded-2xl flex flex-col justify-center items-center p-4 text-center border border-white/5 relative overflow-hidden">
                <Compass className="w-24 h-24 stroke-white/5 opacity-80 absolute" />
                <div className="relative z-10 space-y-2">
                  <Map className="w-10 h-10 text-blue-400 mx-auto animate-pulse" />
                  <span className="text-white text-xs font-mono font-bold tracking-widest uppercase block">{currentMap.year} HISTORIC GEO-MAP</span>
                  <span className="text-sm font-extrabold text-white block mt-1">{currentMap.title}</span>
                  <span className="text-[10px] text-slate-400 block px-4 leading-normal">{currentMap.description}</span>
                </div>
                {/* Decorative border line */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500"></div>
              </div>

              {/* Map detailed textual verification */}
              <div className="w-full md:w-2/3 space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">지도 상세 해설</span>
                  <h3 className="text-lg font-extrabold text-white mt-1">{currentMap.title} ({currentMap.year})</h3>
                </div>

                <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/25">
                  <span className="text-xs font-extrabold text-blue-400 block uppercase font-mono tracking-wider">주권 증명 핵심 팩트(Fact)</span>
                  <p className="text-slate-100 font-semibold text-sm mt-1.5 leading-relaxed">
                    {currentMap.fact}
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-slate-450">
                  <strong>대조의 의의:</strong> 에도 당시 일본 최고의 학학자인 나가쿠보 세키스이나 하야시 시헤이가 제작하고 일본 영주들이 직접 열람한 공공 지도에서 독도를 자국령이 아닌 '조선의 영토 사양'으로 누락시키거나 별도로 구분한 것은 결정타입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: An Yong-bok timeline */}
      {subTab === "anyong" && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[24px] border border-white/10 text-sm leading-relaxed text-slate-300 shadow-md">
            <strong>조선 어민 안용복의 주권 투쟁:</strong> 평범한 수산업 종사자였던 울릉도 어민 <strong>안용복</strong>은 17세기 후반 분쟁 상황에서 혈혈단신 일본으로 건너가 기주(돗토리번) 태수와 외교 담판을 이끌냈습니다. 이는 에도 막부 수뇌부의 주권 포기 및 항해 공식 금지 선포까지 이어진 민간 해양 주권 제도의 신화적인 역사적 공인 실례입니다.
          </div>

          <div className="relative border-l-2 border-blue-500/30 ml-4 md:ml-8 pl-6 md:pl-10 py-2 space-y-8">
            {AN_YONG_BOK_TIMELINE.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Node marker dot */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-white/10 border-4 border-[#020617] text-white flex items-center justify-center text-[10px] font-bold shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span className="text-xs font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded font-mono border border-blue-500/25">
                      {event.year}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{event.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed max-w-4xl bg-white/3 p-4 rounded-2xl border border-white/5 shadow-md font-medium">
                    {event.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
