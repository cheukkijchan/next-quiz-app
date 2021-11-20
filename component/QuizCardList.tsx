import React from 'react';
import { Question } from '../types';
import { QuizCard } from './QuizCard';
import styles from './QuizCardList.module.css';

interface QuizCardListProps {
  questions: Question[];
}

export const QuizCardList: React.FC<QuizCardListProps> = ({ questions }) => {
  return (
    <div className={styles.cardGrid}>
      {questions.map((question) => {
        return <QuizCard question={question} key={question.id} />;
      })}
    </div>
  );
};
