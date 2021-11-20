export interface Category {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  options: string[];
}
