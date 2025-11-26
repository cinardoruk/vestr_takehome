import { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import QuizBasicInfo from "./QuizBasicInfo";
import QuizResults from "./QuizResults";
import dayjs, { Dayjs } from "dayjs";

/*
  click start
  timer starts
  click radios to answer questions
  click 'finish test'
  answers are evaluated
  'results' section is shown
  */

export type QuizState = "init" | "questions" | "results";
export type QuizAnswer = Record<number, number>;

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: number;
  option_text: string;
}

export default function Quiz() {
  // Duration in seconds
  const [quizDuration, setQuizDuration] = useState<number>(60);

  const [quizState, setQuizState] = useState<QuizState>("init");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quiz data once on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data.quiz.questions);
        setQuizDuration(data.quiz.duration);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quiz:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFinish = () => {
    setEndTime(dayjs());
    setQuizState("results");
  };

  const handleReset = () => {
    setQuizState("init");
    setStartTime(null);
    setEndTime(null);
    setAnswers({});
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error loading quiz: {error}</div>;
  }

  return (
    <div>
      <QuizHeader />

      <QuizBasicInfo
        {...{
          state: quizState,
          setState: setQuizState,
          quizDuration,
          startTime,
          setStartTime,
          setEndTime,
        }}
      />

      {(quizState === "questions" || quizState === "results") && (
        <QuizContent
          {...{
            questions,
            answers,
            setAnswers,
            onFinish: handleFinish,
            onReset: handleReset,
            showResults: quizState === "results",
          }}
        />
      )}

      {quizState === "results" && (
        <QuizResults
          {...{
            answers,
            startTime,
            endTime,
            quizState,
            setQuizState,
          }}
        />
      )}
    </div>
  );
}
