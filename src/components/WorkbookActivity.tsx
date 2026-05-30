import React, { useState } from "react";
import { FileText, Award, AlertCircle, Sparkles, Send, Library, CheckSquare, Printer, CheckCircle } from "lucide-react";
import { EvaluationResult } from "../types";

interface WorkbookActivityProps {
  onPrint: () => void;
}

export default function WorkbookActivity({ onPrint }: WorkbookActivityProps) {
  // Input states
  const [names, setNames] = useState<string>("김민우(인천공항고) / 사토 타쿠야(도쿄 가쿠게이 중등부)");
  const [title, setTitle] = useState<string>("동해의 평화로운 화산섬, 자연과 역사가 숨쉬는 독도");
  
  const [content, setContent] = useState<string>(
    "동해의 평화로운 섬 독도는 객관적 사료를 통해 그 역사적 지위가 분명히 규명된다. 한국의 고문서인 『세종실록지리지(1454년)』에는 울릉도와 독도가 맑은 날 육안으로 관측 가능하다고 하여 조선 왕조의 생활권이었음을 시각적으로 명시하고 있다. 또한, 일본의 역사적 고공무서이자 메이지 정부의 최고 결정 기관에서 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 무관한 조선의 영토임을 스스로 인지하고 이를 명문화하여 엄격히 하달하였다. 오늘날 현대 배타적 경제수역(EEZ)의 중간 수역 마찰을 평화적 상호 이해로 이결하고, 양국 미래 세대가 협력하는 번영의 동해 바다로 일구어 가야 한다."
  );

  const [discussions, setDiscussions] = useState<string[]>([
    "태정관 지령은 일본 최고 국가기구 스스로 독도와 울릉도를 '조선의 영역'으로 공치 확정하고 자국 관할권에서 확실하게 배제한 공식 공문서이므로, 현대 일본 외무성의 역사 왜곡 주장(에도 시대부터 자국 인지)을 원천 무효화시키는 가장 양심적이고 철저한 반박 기록이기 때문입니다.",
    "외교적 난제로 영토 기점 합의가 평행선을 달리자 국가 공권력은 일단 무역과 실제 어업 조업 구역을 지키기 위해 타협 임시 공동 수역인 '중간수역'을 획정했습니다. 영유권 문제 선점을 일단 미룬 임시방편이었기에 국내적으로 거센 비판과 영토 훼손 우려를 낳았습니다.",
    "정치적이고 편향된 내셔널리즘 자극 대립에서 벗어나, 양국 실증 역사 기록과 공동 관심사, 평화 화합을 직접 토론하고 배우는 기회를 넓혀야만 미래의 성숙하고 평화로운 동아시아 상생 공동체를 선도할 수 있기 때문입니다."
  ]);

  // Loading/Review states
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // States for Auto Reflection Feature
  const [showReflectionHelper, setShowReflectionHelper] = useState<boolean>(false);
  const [reflectionKeywords, setReflectionKeywords] = useState<string>("독도, 태정관지령, 한일 미래교류, 평화공존");
  const [isGeneratingReflection, setIsGeneratingReflection] = useState<boolean>(false);
  const [generatedReflection, setGeneratedReflection] = useState<string>("");
  const [reflectionError, setReflectionError] = useState<string | null>(null);
  const [copiedReflection, setCopiedReflection] = useState<boolean>(false);

  // Line count stats
  const lineCount = content.split("\n").filter(l => l.trim().length > 0).length;
  const wordCount = content.trim().length;

  const handleDiscussionChange = (index: number, val: string) => {
    const updated = [...discussions];
    updated[index] = val;
    setDiscussions(updated);
  };

  // Auto Reflection handler
  const handleGenerateReflection = async () => {
    if (!reflectionKeywords.trim()) {
      setReflectionError("키워드를 입력해 주세요.");
      return;
    }
    setIsGeneratingReflection(true);
    setReflectionError(null);
    setGeneratedReflection("");
    setCopiedReflection(false);

    try {
      const response = await fetch("/api/generate-reflection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords: reflectionKeywords }),
      });

      if (!response.ok) {
        throw new Error("서버와의 통신에 실패했습니다.");
      }

      const data = await response.json();
      if (data.reflection) {
        setGeneratedReflection(data.reflection);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("소감문 생성에 실패했습니다.");
      }
    } catch (err: any) {
      setReflectionError(err.message || "소감문 생성 중 에러가 발생했습니다.");
    } finally {
      setIsGeneratingReflection(false);
    }
  };

  const handleInsertToQ3 = () => {
    if (generatedReflection) {
      const updated = [...discussions];
      updated[2] = generatedReflection;
      setDiscussions(updated);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedReflection) {
      navigator.clipboard.writeText(generatedReflection);
      setCopiedReflection(true);
      setTimeout(() => setCopiedReflection(false), 2000);
    }
  };

  // Insert template content helper
  const handleLoadSample = () => {
    setTitle("평화와 역사적 진실의 등대, 주권이 살아있는 동아시아 공동의 독도");
    setContent(
      "동해의 평화로운 섬 독도는 객관적 사료를 통해 그 역사적 지위가 분명히 규명된다. 한국의 고문서인 『세종실록지리지(1454년)』에는 울릉도와 독도가 맑은 날 육안으로 관측 가능하다고 하여 조선 왕조의 생활권이었음을 시각적으로 명시하고 있다. 또한, 일본의 역사적 고공무서이자 메이지 정부의 최고 결정 기관에서 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 무관한 조선의 영토임을 스스로 인지하고 이를 명문화하여 엄격히 하달하였다. 오늘날 현대 배타적 경제수역(EEZ)의 중간 수역 마찰을 평화적 상호 이해로 이결하고, 양국 미래 세대가 협력하는 번영의 동해 바다로 일구어 가야 한다."
    );
    setDiscussions([
      "태정관 지령은 일본 최고 국가기구 스스로 독도와 울릉도를 '조선의 영역'으로 공치 확정하고 자국 관할권에서 확실하게 배제한 공식 공문서이므로, 현대 일본 외무성의 역사 왜곡 주장(에도 시대부터 자국 인지)을 원천 무효화시키는 가장 양심적이고 철저한 반박 기록이기 때문입니다.",
      "외교적 난제로 영토 기점 합의가 평행선을 달리자 국가 공권력은 일단 무역과 실제 어업 조업 구역을 지키기 위해 타협 임시 공동 수역인 '중간수역'을 획정했습니다. 영유권 문제 선점을 일단 미룬 임시방편이었기에 국내적으로 거센 비판과 영토 훼손 우려를 낳았습니다.",
      "정치적이고 편향된 내셔널리즘 자극 대립에서 벗어나, 양국 실증 역사 기록과 공동 관심사, 평화 화합을 직접 토론하고 배우는 기회를 넓혀야만 미래의 성숙하고 평화로운 동아시아 상생 공동체를 선도할 수 있기 때문입니다."
    ]);
  };

  const handleEvaluate = async () => {
    if (!content || content.trim().length === 0) {
      setErrorMsg("교과서 서술문 내용을 입력해주세요.");
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          names,
          title,
          content,
          discussions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEvaluation(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "평가 처리 도중 에러가 발생했습니다.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in print-area text-slate-200">
      {/* Activity Intro Banner */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl print:hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            수업 활동지
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4 tracking-tight font-serif">
            한·일 평화 공동 동아시아 교과서 집필하기
          </h2>
          <p className="text-slate-350 mt-2 text-sm leading-relaxed">
            한·일 양국의 영토주의적 마조히즘 대립과 고의적 왜곡 교육 양상을 극복하고, 양국 청소년들이 공동으로 역사 교조 서안을 작성한다고 가장했을 때 배울 수 있는 객관적이고 평화지향적인 역사 구도를 설계해 봅시다.
          </p>
        </div>

        {/* Requirements Box */}
        <div className="mt-6 bg-white/3 p-5 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest font-mono">작성 조건</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              이전 배운 역사 고문서 사료(세종실록지리지, 태정관지령 등) 중 <strong>최소 2개 이상</strong>을 역사적 근거로 제시해야 승률이 올라갑니다.
            </p>
          </div>
          <div className="space-y-1.5 md:border-l md:border-white/10 md:pl-5">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest font-mono">집필 서술조</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              배척을 유도하는 자극적 비난이나 주관적 문장을 배제하고, 철저히 <strong>사실(Fact) 및 객관적 정보</strong> 중심으로 서술해야 합니다.
            </p>
          </div>
          <div className="space-y-1.5 md:border-l md:border-white/10 md:pl-5">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest font-mono">서술 분량 및 평가</span>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              간결하게 <strong>10줄 이내의 응집성 있는</strong> 수려한 문체로 집필하세요. 제출 시 AI 평화교육위원회가 즉시 첨삭 심사평을 하달합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT WORKSPACE: Input workbook */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-extrabold text-white inline-flex items-center gap-2">
              <Library className="w-5 h-5 text-blue-400" />
              학습자 집필 및 성찰 필드
            </h3>
            <button
               type="button"
              onClick={handleLoadSample}
              className="text-[11px] bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer print:hidden"
            >
              예시 초안 불러오기
            </button>
          </div>

          {/* Group detail */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
                ■ 집필자/모둠 소속 (한국 학생 및 일본 학생 이름)
              </label>
              <input
                type="text"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className="w-full border border-white/10 bg-white/5 px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
                ■ 우리가 제안하는 독도 대단원 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-white/10 bg-white/5 px-3 py-2.5 rounded-xl text-xs md:text-sm font-extrabold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40"
                placeholder="단원 테마를 축약할 멋진 헤더를 적으세요"
              />
            </div>

            {/* Document Draft Textarea */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  ■ 공동 집필 본문 (사료 인용 및 평화 관점 서술)
                </label>
                <span className="text-[10px] font-mono font-bold text-slate-350 bg-white/10 px-2 py-0.5 rounded">
                  {wordCount}자 / 약 {lineCount}줄
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full border border-white/10 bg-white/5 p-4 rounded-xl text-xs md:text-sm leading-relaxed text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-serif resize-none"
                placeholder="한국 역사 및 지리 교재 내용을 기반으로, 일본 학생도 함께 배울 수 있는 객관적이고 사실 위주의 독도 서술문을 입력해 주십시오."
              />
              <span className="text-[10px] text-slate-500 leading-normal block mt-1.5 pl-1">
                ※ 실시간으로 줄바꿈 수치와 사료 활용 수준을 위원회가 상정 심사 피드백합니다.
              </span>
            </div>
          </div>

          {/* Core Discussion Questions */}
          <div className="pt-6 border-t border-white/5 space-y-5">
            <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono">
              토론 및 개별 성찰 질문 답변 작성지
            </h4>

            {/* Question 1 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-250 leading-relaxed">
                Q1. 일본의 1877년 『태정관 지령』과 첨부된 『기죽도약도』가 현대 일본의 \"에도시대 독도 영유\" 주장을 무력화하는 결정적 근거가 되는 이유는 무엇인가요?
              </p>
              <textarea
                value={discussions[0] || ""}
                onChange={(e) => handleDiscussionChange(0, e.target.value)}
                rows={3}
                className="w-full border border-white/10 bg-white/5 p-3 rounded-xl text-xs text-slate-200 leading-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-sans"
                placeholder="답변을 입력하십시오"
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-250 leading-relaxed">
                Q2. 1998년 체결된 '신한일어업협정'에서 왜 독도가 한국의 독자적 EEZ 기점이 되지 못하고 중간수역에 놓이게 되었는지, 당시 배경과 어업권 보호 측면에서 서술하세요.
              </p>
              <textarea
                value={discussions[1] || ""}
                onChange={(e) => handleDiscussionChange(1, e.target.value)}
                rows={3}
                className="w-full border border-white/10 bg-white/5 p-3 rounded-xl text-xs text-slate-200 leading-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-sans"
                placeholder="답변을 입력하십시오"
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-250 leading-relaxed">
                Q3. 미래 청소년들이 중심이 되어 갈등을 평화적으로 연쇄 해결하기 위해 한일 역사 캠프나 학술적 교류가 절실한 지점에 대해 본인 사견을 쓰세요.
              </p>
              <textarea
                value={discussions[2] || ""}
                onChange={(e) => handleDiscussionChange(2, e.target.value)}
                rows={3}
                className="w-full border border-white/10 bg-white/5 p-3 rounded-xl text-xs text-slate-200 leading-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-sans"
                placeholder="답변을 입력하십시오"
              />
              
              {/* Write Reflection Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowReflectionHelper(!showReflectionHelper)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  소감문 작성하기 (AI 자동 완성)
                </button>
              </div>

              {/* Reflection Helper Drawer/Panel */}
              {showReflectionHelper && (
                <div className="mt-4 bg-white/3 border border-white/10 p-4 rounded-2xl space-y-4 animate-fade-in text-slate-200">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h5 className="text-xs font-extrabold text-blue-300 inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI 배움 소감문 작문 시스템
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowReflectionHelper(false)}
                      className="text-[10px] text-slate-400 hover:text-white transition-colors"
                    >
                      닫기
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] text-slate-400 font-semibold pl-0.5">
                      소감문 및 성찰을 이끌어낼 주요 키워드 입력 :
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={reflectionKeywords}
                        onChange={(e) => setReflectionKeywords(e.target.value)}
                        placeholder="예) 독도, 우호, 역사기록, 태정관지령, 평화공존"
                        className="flex-1 border border-white/10 bg-white/5 px-3 py-2 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-sans"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateReflection}
                        disabled={isGeneratingReflection}
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
                          isGeneratingReflection 
                            ? "bg-slate-700 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-500"
                        }`}
                      >
                        {isGeneratingReflection ? "작성 중..." : "글짓기 생성"}
                      </button>
                    </div>
                  </div>

                  {/* Reflection error display */}
                  {reflectionError && (
                    <div className="text-[11px] text-rose-450 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                      ⚠️ {reflectionError}
                    </div>
                  )}

                  {/* Reflection output block */}
                  {generatedReflection && (
                    <div className="space-y-3 bg-white/5 p-3.5 border border-white/10 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-0.5">
                        작성 완료된 소감문 추천안:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-serif whitespace-pre-wrap select-all bg-white/2 p-3 rounded-lg border border-white/5 shadow-inner">
                        {generatedReflection}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={handleCopyToClipboard}
                          className="px-2.5 py-1.5 text-[11px] font-bold text-slate-300 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-all cursor-pointer"
                        >
                          {copiedReflection ? "✓ 복사완료!" : "클립보드 복사"}
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertToQ3}
                          className="px-2.5 py-1.5 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md hover:shadow-blue-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Q3 답변으로 삽입하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action trigger button */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center print:hidden">
            <button
              onClick={onPrint}
              type="button"
              className="px-4 py-2.5 text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              수고한 보고서 인쇄하기
            </button>
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className={`px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isEvaluating 
                  ? "bg-slate-700 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isEvaluating ? "심사 집행 평가 중..." : "집필문 제출 및 평위원 첨삭 받기"}</span>
            </button>
          </div>
        </div>

        {/* RIGHT WORKSPACE: Evaluation receipt outputs (평가원 의견) */}
        <div className="lg:col-span-5 flex flex-col justify-start gap-6">
          {/* Waiting for review visualizer */}
          {!isEvaluating && !evaluation && (
            <div className="bg-white/3 border border-dashed border-white/10 rounded-3xl p-8 text-center h-full flex flex-col justify-center items-center min-h-[350px] print:hidden">
              <Award className="w-12 h-12 text-slate-500 animate-bounce" />
              <h4 className="text-sm font-extrabold text-white mt-4 font-serif">평가위원회 성적표 대기 중</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-[260px] leading-relaxed mx-auto text-center font-sans">
                교과서 집필문과 하단 성찰 질의들을 성실히 작성한 후 제출하시면, 대한민국 역사·지리 평화교육위원회 심사관들이 즉시 실시간 배점과 교안 피드백을 전달해 드립니다.
              </p>
            </div>
          )}

          {/* Evaluation Progressing Loader */}
          {isEvaluating && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 text-center min-h-[400px] flex flex-col justify-center items-center gap-4 shadow-xl print:hidden animate-pulse">
              <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-white">동아시아 평화 교과서 실태 심사 중</h4>
                <p className="text-xs text-slate-400 font-mono">EDUCATIONAL BOARD COMPILING COGNITIONS</p>
              </div>
              <div className="text-xs text-slate-300 italic max-w-sm border-t border-white/10 pt-4 px-4 leading-normal">
                "사료의 사실적 근거가 정확한지, 전조 서술에 독자적인 배척 감정을 실어 왜곡하진 않았는지 등 한·일 간 역사 평화 주체 조화를 계수화하여 연산 중입니다..."
              </div>
            </div>
          )}

          {/* Completed Evaluation Receipt (Matches Page 6: 평가위원 의견 및 서명) */}
          {evaluation && (
            <div className="bg-white/5 backdrop-blur-2xl border-2 border-blue-500/30 rounded-[32px] p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl animate-fade-in text-slate-200">
              
              {/* Corner Watermark Seal */}
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 pointer-events-none opacity-[0.03]">
                <Award className="w-48 h-48 text-white" />
              </div>

              {/* Title Section */}
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono leading-none font-bold text-blue-300 uppercase bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  교류 심의 성적 대장
                </span>
                <h3 className="text-lg font-extrabold text-white mt-3 font-serif">평가위원 의견 및 서명</h3>
                <p className="text-xs text-slate-400 mt-1">
                  대한민국 역사·지리 평화교육위원회 심사단 결재
                </p>
              </div>

              {/* Score visual meter block */}
              <div className="flex items-center gap-5 bg-blue-500/5 p-4 rounded-2xl border border-white/10">
                <div className="relative shrink-0 flex items-center justify-center">
                  {/* Circular Score Badge */}
                  <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex flex-col justify-center items-center text-blue-300 font-bold bg-blue-500/15 shadow-inner">
                    <span className="text-[8px] leading-none text-slate-450 uppercase font-mono font-bold">score</span>
                    <span className="text-2xl font-extrabold font-mono text-blue-300 leading-tight">{evaluation.score}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">종합 서양 집필 등급 책정</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-1 font-medium">
                    공인된 고전 사료를 적확하게 고찰했으며, 양국 간 불필요한 감정 자극 없이 미래지향적인 평화 정착 어조를 우수하게 완결 지었습니다.
                  </p>
                </div>
              </div>

              {/* Main Feedback Narrative */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 block">심사 및 보완 총평</span>
                <p className="text-xs leading-relaxed text-slate-100 bg-white/3 p-4 border border-white/5 rounded-xl mt-2 font-medium whitespace-pre-wrap font-serif">
                  {evaluation.feedback}
                </p>
              </div>

              {/* Suggestions checklist */}
              <div className="space-y-3 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 block">주요 핵심 교정 및 실천 제안</span>
                <div className="space-y-2.5 mt-2">
                  {evaluation.suggestions.map((sug, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium leading-normal">
                      <CheckSquare className="w-4 h-4 text-emerald-450 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature block matching '평가위원 의견 및 서명' */}
              <div className="border-t border-white/5 pt-5 flex items-center justify-between pb-1">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">평가 심의관</span>
                  <p className="text-sm font-serif font-extrabold text-white leading-tight mt-1">{evaluation.signature}</p>
                </div>

                {/* Hand-written signature graphic stamp */}
                <div className="border border-red-500/40 rounded px-2.5 py-1 text-red-400 bg-red-500/10 transform rotate-[-2deg] font-serif font-bold text-[10px] uppercase tracking-wider relative shrink-0 select-none">
                  <div className="absolute inset-0 border border-dashed border-red-500/20"></div>
                  <span>평화지적 심사필 (인)</span>
                </div>
              </div>
            </div>
          )}

          {/* Printable visual block with complete information once submitted */}
          {evaluation && (
            <div className="bg-blue-500/5 border border-blue-500/25 p-4 rounded-xl flex items-start gap-2.5 print:hidden">
              <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-blue-300">공동서 완결 보고서 출력 가능</h5>
                <p className="text-[11px] leading-relaxed text-slate-400 mt-1 font-medium">
                  제출 및 서명된 본 활동지는 상단 '교안 인쇄' 버튼을 통해 서식과 점수, 성찰 일지가 수록된 공식 수업 산출물 형태의 리포트로 완벽히 인쇄하여 오프라인으로 수거할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Fail error panel */}
          {errorMsg && (
            <div className="bg-rose-500/5 border border-rose-500/25 text-rose-300 rounded-xl p-4 flex items-start gap-2.5 text-xs font-medium print:hidden">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>상정 오류:</strong> {errorMsg}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
