export interface DocumentItem {
  id: string;
  title: string;
  year: string;
  nation: "Korea" | "Japan";
  description: string;
  keyQuote?: string; // Original text or highlights
  meaning: string;
}

export interface MapItem {
  id: string;
  title: string;
  year: string;
  nation: "Korea" | "Japan" | "Joint";
  description: string;
  fact: string;
}

export interface AnTimelineEvent {
  year: string;
  title: string;
  details: string;
}

export interface ModernTimelineEvent {
  year: string;
  title: string;
  period?: string;
  details: string;
  significance: string;
}

export interface TerritoryConcept {
  name: string;
  english: string;
  description: string;
  dokdoStatus: string;
}

export interface DistanceInfo {
  name: string;
  distance: number; // in km
  color: string;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ActivityState {
  names: string;
  title: string;
  content: string;
  discussions: string[];
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  suggestions: string[];
  signature: string;
}
