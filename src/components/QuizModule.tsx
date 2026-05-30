import React, { useState } from "react";
import { BookOpen, Check, X, Award, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";
import { QUIZ_QUESTIONS } from "../data";

export default function QuizModule() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<boolean[]>([]); // true for correct, false for wrong
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedIdx === activeQuestion.answerIndex;
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsSubmitted(false);
    setAnswers([]);
    setQuizFinished(false);
  };

  const correctCount = answers.filter((a) => a).length;
  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Overview Block */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="max-w-3xl">
          <span className="text-xs bg-blue-500/10 border border-blue-500/25 text-blue-300 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">교리 종합 평가</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4 tracking-tight font-serif">
            독도 지리·수호사 이해도 종합 퀴즈
          </h2>
          <p className="text-slate-350 mt-2 text-sm leading-relaxed">
            사료 해제와 지리적 특성, 현대사의 고찰 내용을 바탕으로 출제된 종합 평교 4문항을 풀며 학습 성과를 다지고 기억에 고착화합니다.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl">
        {!quizFinished ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-extrabold text-slate-450 font-mono tracking-wider">
                QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono">
                진행율: {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-extrabold text-white leading-snug">
              {activeQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mt-4">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedIdx === idx;
                const isCorrectOption = activeQuestion.answerIndex === idx;

                let optionStyle = "border-white/5 bg-white/3 hover:bg-white/8 text-slate-300";
                if (isSelected) {
                  optionStyle = "border-blue-500 bg-blue-500/10 text-white font-semibold ring-1 ring-blue-500/25 shadow-md";
                }

                if (isSubmitted) {
                  if (isCorrectOption) {
                    optionStyle = "border-emerald-550 bg-emerald-550/15 text-emerald-300 font-extrabold";
                  } else if (isSelected) {
                    optionStyle = "border-rose-550 bg-rose-555/15 text-rose-300 font-bold";
                  } else {
                    optionStyle = "border-white/5 opacity-40 text-slate-500 bg-transparent";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs md:text-sm ${optionStyle}`}
                  >
                    <span>{option}</span>

                    {/* Left icon indicators for results */}
                    {isSubmitted && isCorrectOption && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrectOption && <X className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submission Controls */}
            <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
              {!isSubmitted ? (
                <button
                  disabled={selectedIdx === null}
                  onClick={handleCheckAnswer}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-md transition-all cursor-pointer ${
                    selectedIdx === null
                      ? "bg-white/5 text-slate-550 border border-white/5 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10"
                  }`}
                >
                  제출 및 정답 확인
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-blue-650 hover:bg-blue-550 text-white rounded-xl text-xs md:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  {currentIdx === QUIZ_QUESTIONS.length - 1 ? "최종 성적 대조" : "다음 문항 이동"}
                </button>
              )}
            </div>

            {/* Step Explanation Block */}
            {isSubmitted && (
              <div className="bg-white/3 border border-white/5 p-5 rounded-2xl text-xs leading-relaxed max-w-4xl font-medium text-slate-300">
                <span className="flex items-center gap-1.5 font-extrabold text-blue-300 mb-1.5 font-mono text-[10px] tracking-wide uppercase">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  교리 사실적 해설 및 풀이
                </span>
                <p className="text-slate-350 leading-relaxed font-sans">{activeQuestion.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Finished Grade View card */
          <div className="max-w-2xl mx-auto text-center py-6 space-y-6">
            <Award className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-extrabold text-white font-serif">독도 종합 수호사 퀴즈 완주!</h3>
              <p className="text-xs text-slate-450 font-mono text-center">COMPREHENSIVE KNOWLEDGE COMPLETE</p>
            </div>

            {/* Score circle meter */}
            <div className="inline-flex flex-col justify-center items-center w-28 h-28 rounded-full border-4 border-blue-500 bg-blue-500/15 relative shadow-inner">
              <span className="text-2xl font-extrabold text-blue-300 font-mono leading-none">{score}점</span>
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider mt-1.5 font-mono">score</span>
            </div>

            <p className="text-xs md:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed font-medium">
              평가 <strong className="text-white">총 {QUIZ_QUESTIONS.length}문항</strong> 중 <strong className="text-blue-450">{correctCount}개</strong>를 성공적으로 맞추며 가치 있는 지리 주권 성식을 정립했습니다.
            </p>

            {/* Achievement Badge details */}
            <div className="bg-white/3 border border-white/5 p-5 rounded-2xl text-xs font-semibold text-slate-300 inline-block max-w-sm leading-relaxed">
              🎖️ <strong>{score === 100 ? "완전한 독도 수호 해설사" : "성실한 배움의 평화 수호 단원"}</strong><br/>
              <span className="text-slate-450 text-[11px] block mt-2.5 font-normal leading-normal">당신이 작성한 고문서들과 영토 지식은 언제 어디서든 지치지 않는 주권의 단단한 무기가 됩니다.</span>
            </div>

            {/* Restart button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl shadow-md cursor-pointer transition-all border border-white/10"
              >
                <RotateCcw className="w-4 h-4" />
                다시 풀어보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
