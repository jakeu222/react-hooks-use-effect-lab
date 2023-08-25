import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code. the code 
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; // exit early!
    }

    // set up a timeout to run after 1 second
    const timerId = setTimeout(() => {
      // decrement the time remaining
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    // clean up after the timeout in case the component unmounts before the timer is done
    return function () {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);


  //   useEffect(() => {
  //     timeRemaining === 0
  //       ? (
  //         setTimeRemaining(10),
  //         onAnswered(false)
  //       )
  //       : (
  //         // Corrected: Move timerId outside the ternary block
  //         const timerId = setTimeout(() => {
  //         setTimeRemaining((timeRemaining) => timeRemaining - 1);
  //       }, 1000);

  //     // Return a cleanup function
  //     return function () {
  //       clearTimeout(timerId);
  //     }
  //       );

  // }, [timeRemaining, onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
