import { CardContent, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import ReactCardFlip from 'react-card-flip';
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

  // set card height for questions with different length
  const setMaxHeight = () => {
    const frontHeight = frontEl.current!.getBoundingClientRect().height;
    const backHeight = backEl.current!.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 5));
  };

  // useEffect when question change
  useEffect(setMaxHeight, [
    question.question,
    question.answer,
    question.options,
  ]);

  // set height when resize
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    // cleanup
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div onClick={() => setFlip(!flip)}>
      <ReactCardFlip isFlipped={flip} flipDirection='horizontal'>
        <div className={styles.card} ref={frontEl} style={{ height: height }}>
          <CardContent>
            <Typography>{question.question}</Typography>
            <Typography
              className={styles.options}
              component='div'
              variant='body2'
              color='textSecondary'
              font-size='0.75rem'
            >
              {question.options.map((option) => (
                <div className={styles.option} key={option}>
                  {option}
                </div>
              ))}
            </Typography>
          </CardContent>
        </div>
        <div className={styles.card} ref={backEl} style={{ height: height }}>
          <CardContent>{question.answer}</CardContent>
        </div>
      </ReactCardFlip>
    </div>
  );
};
