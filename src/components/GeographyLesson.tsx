import React, { useState } from "react";
import { Compass, Globe, Navigation, Eye, EyeOff, Map, Landmark } from "lucide-react";
import { TABLE_CONCEPTS, DISTANCE_INFOS } from "../data";

export default function GeographyLesson() {
  const [selectedDistance, setSelectedDistance] = useState<string>("울릉도 - 독도");
  const [showVisibilityAnalysis, setShowVisibilityAnalysis] = useState<boolean>(true);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Overview Block */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-white opacity-[0.03] pointer-events-none lg:block hidden">
          <Compass className="w-64 h-64 rotate-12 stroke-white" />
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            1차시 (제1교시)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            독도의 지리적 특성과 영역의 이해
          </h2>
          <p className="text-slate-300 mt-3 text-sm md:text-base leading-relaxed font-normal">
            독도가 대한민국의 영토임을 영속적으로 이해하기 위한 최우선 전제는 명확하고 반박 불가능한 물리적·지리적 실체와 현대 국제법 관할 영역의 3요소를 확립하는 일입니다. 독도는 우리 영토의 가장 동쪽 끝에서 주권 수호의 굳건한 디딤돌 역할을 하고 있습니다.
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 border-t border-white/10 pt-6">
          <div className="flex items-start gap-3 bg-white/3 p-4 rounded-2xl border border-white/5">
            <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">정확한 위도 및 경도</h4>
              <p className="text-sm font-semibold text-white mt-1 font-mono">
                북위 37° 14′ 26.8″
              </p>
              <p className="text-sm font-semibold text-white font-mono">
                동경 131° 52′ 10.4″
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">동도 우산봉 최정상 기준</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/3 p-4 rounded-2xl border border-white/5">
            <Navigation className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">독도의 총면적 및 구성</h4>
              <p className="text-sm font-semibold text-white mt-1 font-mono">
                총 187,554 m²
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                동도(73,297 m²) / 서도(88,740 m²)
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                주변 89개 천연 부속 바위섬 포함<br/>(잠실종합운동장의 약 2배 면적)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/3 p-4 rounded-2xl border border-white/5">
            <Map className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">독도의 주거지 체계</h4>
              <p className="text-sm font-semibold text-white mt-1 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                실시간 상주 유인도
              </p>
              <p className="text-xs text-slate-350 mt-0.5">
                독도경비대원 및 주민 실제 거주
              </p>
              <span className="text-[11px] text-slate-550 mt-1 block">
                전용 우편번호 및 유선전화 완비
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Distance & Visibility System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Distance comparison visual element */}
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[32px] border border-white/10 shadow-2xl lg:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">물리적 직선거리 시각화</h3>
            <p className="text-xs text-slate-400 mt-1">
              독도와 가장 인접 영토 간의 직선거리를 정밀하게 비교 분석합니다. 클릭하면 상세한 지리적 관계를 확인합니다.
            </p>

            {/* Visual Grid Map nodes */}
            <div className="my-8 bg-white/3 rounded-2xl p-6 border border-white/5 flex flex-col justify-center items-center h-52 relative overflow-hidden">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

              {/* Graphical nodes */}
              <div className="w-full flex justify-between items-center px-4 max-w-md relative z-10">
                {/* Mainland */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-slate-350 font-bold text-[10px] shadow-sm">
                    본토
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 mt-1">한반도 죽변</span>
                </div>

                {/* Ulleungdo */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border-2 border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-xs shadow-sm cursor-pointer hover:scale-105 transition-all"
                       onClick={() => setSelectedDistance("울릉도 - 독도")}>
                    울릉
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">울릉도</span>
                </div>

                {/* Dokdo */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500/80 flex items-center justify-center text-red-400 font-extrabold text-xs animate-pulse">
                    독도
                  </div>
                  <span className="text-[11px] font-semibold text-red-400 mt-1">독도</span>
                </div>

                {/* Oki Island */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border-2 border-orange-400/40 flex items-center justify-center text-orange-400 font-bold text-xs cursor-pointer hover:scale-105 transition-all"
                       onClick={() => setSelectedDistance("일본 오키섬 - 독도")}>
                    오키
                  </div>
                  <span className="text-[11px] font-semibold text-orange-500 mt-1">일본 오키섬</span>
                </div>
              </div>

              {/* Dynamic Connecting Lines representation */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-4 border-b-2 border-dashed border-white/10 pointer-events-none"></div>

              {/* Active display badge */}
              <div className="mt-8 z-10 text-[11px] bg-slate-900 border border-white/10 text-slate-200 px-4 py-1.5 rounded-full font-semibold shadow-md">
                현재 선택: <span className="text-yellow-400 font-bold">{selectedDistance}</span>
              </div>
            </div>

            {/* Distance Interactive Selector details */}
            <div className="space-y-3">
              {DISTANCE_INFOS.map((dist) => {
                const isSelected = selectedDistance === dist.name;
                return (
                  <button
                    key={dist.name}
                    onClick={() => setSelectedDistance(dist.name)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-blue-500/50 bg-blue-500/10 shadow-sm"
                        : "border-white/5 bg-white/3 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${isSelected ? "bg-blue-500 animate-pulse" : "bg-white/20"}`}></span>
                      <div>
                        <span className="text-[10px] font-mono tracking-wide text-slate-400 block uppercase">거리 분류</span>
                        <span className="text-sm font-bold text-slate-200">{dist.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 block">직선거리</span>
                      <span className="text-base font-extrabold text-blue-400 font-mono">{dist.distance} km</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/3 border border-white/5 rounded-2xl text-xs leading-relaxed text-slate-400">
            <strong className="text-white">지리학적 시사점:</strong> 국제법상 도서 상호 간 거리가 가까워 지평선 상에서 시각적 인지가 가능하면 이는 자연적 인지 생활권에 속한 영토로 간주됩니다.
          </div>
        </div>

        {/* Visibility detail explanation (box from Page 2) */}
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[32px] border border-white/10 shadow-2xl lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white inline-flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                지리적 육안 관측성의 역사적 의의
              </h3>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              지리학과 역사학에서 <strong>육안으로 자연적 영토를 상시 관측할 수 있는지의 여부</strong>는 원시적 시말에서 '영토적 자각'의 성립과 관할을 판가름하는 고유 가치 요건입니다.
            </p>

            <div className="mt-5 space-y-4">
              <div className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/25 relative">
                <div className="absolute right-4 top-4 text-emerald-400">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-emerald-300">1. 울릉도에서의 독도 관측성</h4>
                <p className="text-xs text-slate-350 mt-1.5 leading-relaxed">
                  울릉도의 사동, 석포마을 등 비교적 고지대(해발 120m 이상)에서는 맑은 날 수평선 동쪽 끝에 떠 있는 <strong>독도가 육안으로 선명하게 보입니다.</strong> 이로써 아주 먼 옛날부터 울릉도 정착민(우산국)들은 독도를 자연 세계 영역 및 자신들의 조업·생활권 일환으로 편입시켰음이 명시됩니다.
                </p>
              </div>

              <div className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/25 relative">
                <div className="absolute right-4 top-4 text-rose-400">
                  <EyeOff className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-rose-300">2. 일본 오키섬에서의 관측 불가능성</h4>
                <p className="text-xs text-slate-350 mt-1.5 leading-relaxed">
                  일본에서 독도와 가장 지척인 오키섬(거리 157.5 km)에서는 대기 굴절과 <strong>지구 곡률 한계선 너머</strong>에 독도가 잠기게 되므로, 기상이 아무리 맑아도 <strong>결코 육안 관측이 불가능합니다.</strong> 즉, 대마도나 오키섬 등에서는 의식적인 결사 도해가 정립되지 않는 한 도달할 수 없어 고유 자각권 밖에 있었습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/10 text-white p-4.5 rounded-2xl border border-white/10 flex items-start gap-3">
            <span className="text-xl shrink-0">💡</span>
            <p className="text-[11px] leading-relaxed text-slate-300">
              세종실록지리지(1454)의 기록 <em>"두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다"</em>는 이 물리적 지리적 과학 사실과 완전히 정확히 일치하여 고대적 조선 소유의 자연적 경위를 완벽히 대변합니다.
            </p>
          </div>
        </div>
      </div>

      {/* National Territory Concept (Territory, Sea, Airspace, EEZ Table 1 on Page 3) */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <Landmark className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">
            국가 영역(Territory)의 삼요소와 독도
          </h3>
        </div>
        <p className="text-xs text-slate-450 mt-2 mb-6">
          국가 주권이 미치는 절대적 법적 위상을 영토, 영해, 영공의 구체적 분류를 통해 현대 독도의 실 지위와 연계해 비교 분석하는 핵심 도표입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {TABLE_CONCEPTS.map((concept) => (
            <div
              key={concept.name}
              className="border border-white/5 bg-white/3 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-500/40 hover:bg-white/8 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-100">{concept.name}</span>
                  <span className="text-[9px] bg-white/10 text-slate-300 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider border border-white/10">
                    {concept.english}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed min-h-12">
                  {concept.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl leading-relaxed font-semibold">
                {concept.dokdoStatus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Road names & Addresses system */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <h3 className="text-lg font-bold text-white">독도의 고유 주소 및 법적 도로명 체계</h3>
        <p className="text-xs text-slate-450 mt-1">
          독도는 정부에 의해 주민 정주가 입증된 영토로서, 대내외적으로 공치 통보되는 고유의 건물별 도로명 주소를 정착 받았습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-white/5 to-blue-550/5 relative shadow-sm">
            <span className="absolute right-4 top-4 text-[10px] font-extrabold bg-blue-600/50 border border-blue-400/30 text-white px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">동도 (EAST)</span>
            <h4 className="text-base font-extrabold text-white">이사부길 (Isabu-gil)</h4>
            <div className="mt-3 space-y-2 text-xs">
              <p className="text-slate-300">
                <strong className="text-slate-400">정식 주소:</strong> 경상북도 울릉군 울릉읍 독도리 이사부길
              </p>
              <p className="text-slate-450 leading-relaxed font-normal">
                지중해성 해양 바위섬 동도로, 지형적으로 비교적 완만한 구도입니다. 대한민국 수호를 위한 상주 <strong>독도경비대 막사</strong>, <strong>독도 등대</strong>, 그리고 우리나라 지도 형상과 일치하는 유명한 자연 조각 <strong>한반도바위</strong>가 이사부길에 속해 있습니다.
              </p>
              <span className="inline-block mt-2 bg-blue-500/15 border border-blue-500/20 text-blue-300 font-semibold px-2.5 py-0.5 rounded text-[10px]">
                신라 장군 이사부의 우산국 정벌 역사성 기림
              </span>
            </div>
          </div>

          <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-white/5 to-emerald-550/5 relative shadow-sm">
            <span className="absolute right-4 top-4 text-[10px] font-extrabold bg-emerald-600/50 border border-emerald-400/30 text-white px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">서도 (WEST)</span>
            <h4 className="text-base font-extrabold text-white">안용복길 (Anyongbok-gil)</h4>
            <div className="mt-3 space-y-2 text-xs">
              <p className="text-slate-300">
                <strong className="text-slate-400">정식 주소:</strong> 경상북도 울릉군 울릉읍 독도리 안용복길
              </p>
              <p className="text-slate-450 leading-relaxed font-normal">
                동도보다 가파른 서산봉을 지닌 화산암체입니다. 독도 실제 어민이 일상 상주하는 <strong>주민 숙소</strong>와 음료수원으로 오랜 세월 생명수 역할을 담당해 온 가치 있는 천연 담수 샘터인 <strong>'물골'</strong>이 자리하여 독립적 유인도로서의 기능을 보좌합니다.
              </p>
              <span className="inline-block mt-2 bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded text-[10px]">
                대표적 어민이자 투사인 안용복의 수호 주권 기림
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
