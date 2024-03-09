"use client"
import { useState, useEffect } from 'react';
import styles from './test.module.css';

const Test = () => {
  const [nums, setNums] = useState([]);

  useEffect(() => {
    let li = [];
    for (let i = 0; i < 5; i++) {
      li.push(i);
    }
    console.log('li : ', li);
    setNums(li);
    console.log(nums);
  }, []);
  
  return (
    <div className={styles.container}>
      <h1>hello world</h1>
      {nums.map((n, idx) => (
        <div
          className={styles.block}
          key={idx}
          id={idx}
        >
          <textarea
            value={n}
            className={styles.textarea}
            onInput={(e) => {
              const newNums = [...nums];
              newNums[idx] = e.target.value;
              setNums(newNums);

              const de = document.getElementById(idx  );
              const ta = de.querySelector('textarea');
              console.log(`height of div : ${de.style.height} height of textarea : ${ta.style.height}`);
            }}
          ></textarea>
        </div>
      ))}
    </div>
  )
}

export default Test