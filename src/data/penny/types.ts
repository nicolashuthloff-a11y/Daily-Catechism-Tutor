export interface PennyQuestion {
  number: number;
  section: string;
  chapter: string;
  question: string;
  answer: string;
  scriptureRef?: string;
  memoryTip?: string;
}

export interface PennySection {
  id: number;
  title: string;
  range: string;
  description: string;
  startNum: number;
  endNum: number;
  chapters: string[];
}
