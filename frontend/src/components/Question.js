import React, { useState, useEffect, useCallback } from "react";

const Question = ({ question, onAnswer, onTimeUp, initialAnswer }) => {
  const [answer, setAnswer] = useState(initialAnswer || "");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      onAnswer(question.id, answer); // Save answer when unmounting
    };
  }, [question.id, answer, onAnswer, onTimeUp]);

  const handleAnswerChange = useCallback(
    (e) => {
      const newAnswer = e.target.value;
      setAnswer(newAnswer);
      onAnswer(question.id, newAnswer);
    },
    [question.id, onAnswer]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onTimeUp();
    },
    [onTimeUp]
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <p>Time left for this question: {formatTime(timeLeft)}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Enter your answer here..."
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Question;
