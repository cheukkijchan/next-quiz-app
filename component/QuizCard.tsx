import { useState, useEffect, useRef } from 'react';
import { Question } from '../types';

import styles from './QuizCard.module.css';

interface QuizCardProps {
  question: Question;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question }) => {
  const [flip, setFlip] = useState<boolean>(false);
  const [height, setHeight] = useState<string | number>('initial');

  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  const setMaxHeight = () => {
    const frontHeight = frontEl.current!.getBoundingClientRect().height;
    const backHeight = backEl.current!.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(setMaxHeight, [
    question.question,
    question.answer,
    question.options,
  ]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`${styles.card} ${flip ? styles.flip : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className={styles.front} ref={frontEl}>
        {question.question}
        <div className={styles.options}>
          {question.options.map((option) => {
            return (
              <div className={styles.option} key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.back} ref={backEl}>
        {question.answer}
      </div>
    </div>
  );
};
