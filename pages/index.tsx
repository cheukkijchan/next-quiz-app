import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Navbar } from '../component/Navbar';
import { QuizCardList } from '../component/QuizCardList';
import styles from '../styles/Home.module.css';
import { Category, Question } from '../types';

interface QuestionItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Home: NextPage = () => {
  const [quizCards, setQuizCards] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Ref in Navbar
  const categoryEl = useRef<HTMLSelectElement>(null);
  const amountEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('https://opentdb.com/api_category.php');
      setCategories(res.data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const decodeString = (str: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    console.log(str);
    return textArea.innerHTML;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fetchQuizCard = async () => {
      const res = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current!.value,
          category: categoryEl.current!.value,
        },
      });

      setQuizCards(
        res.data.results.map((questionItem: QuestionItem, index: any) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];

          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer,
            options,
          };
        })
      );
    };

    fetchQuizCard();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz</title>
        <meta name='description' content='Quiz app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar
        categories={categories}
        handleSubmit={handleSubmit}
        categoryRef={categoryEl}
        amountRef={amountEl}
      />

      <QuizCardList questions={quizCards} />
    </div>
  );
};

export default Home;
