export interface Game {
  name: string;
  created_by: string;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  title: string;
}
export interface Question {
  created_by: string;
  q: string;
  answer: string;
  options: QuestionOption[];
}
