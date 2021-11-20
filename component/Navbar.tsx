import axios from 'axios';
import React, { RefObject, useRef, useState } from 'react';
import { Category, Question } from '../types';
import styles from './Navbar.module.css';

interface NavbarProps {
  categories: Category[];
  handleSubmit: (e: any) => void;
  categoryRef: RefObject<HTMLSelectElement>;
  amountRef: RefObject<HTMLInputElement>;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  handleSubmit,
  categoryRef,
  amountRef,
}) => {
  return (
    <>
      <form className={styles.header} onSubmit={handleSubmit}>
        <div className={styles.form}>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryRef}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.form}>
          <label htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            id='amount'
            min='1'
            step='1'
            defaultValue={10}
            ref={amountRef}
          />
        </div>
        <div className={styles.form}>
          <button className={styles.btn}>Generate</button>
        </div>
      </form>
    </>
  );
};
