import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Fetch questions
    fetch("http://localhost:8000/api/quizzes/1/")
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    if (questions.length === 0 || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 180; // Reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, quizCompleted]);

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: e.target.value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(180); // Reset timer for next question
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const responsesToSubmit = Object.entries(answers).map(
      ([questionId, answer]) => ({
        question: parseInt(questionId),
        answer: answer,
      })
    );

    try {
      const response = await fetch("http://localhost:8000/api/responses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responsesToSubmit),
      });

      if (!response.ok) throw new Error("Failed to submit quiz");

      console.log("Quiz submitted successfully");
      setQuizCompleted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;
  if (quizCompleted) return <div>Thank you for completing the quiz!</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz</h2>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <p>
        Time left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
      <h3>{currentQuestion.text}</h3>
      <textarea
        value={answers[currentQuestion.id] || ""}
        onChange={handleAnswerChange}
        placeholder="Enter your answer here..."
      />
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default Quiz;
