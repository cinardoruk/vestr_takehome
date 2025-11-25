import { useState } from "react";
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

type QuizState = "init" | "questions" | "results";
export interface QuizAnswer {
  question_id: number;
  answer_id: number;
}

export default function Quiz() {
  // Duration in seconds
  const quizDuration = 5;

  const [quizState, setQuizState] = useState<QuizState>("init");
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs>(dayjs());
  const [answers, setAnswers] = useState<QuizAnswer[]>();

  return (
    <div>
      <QuizHeader />
      <QuizBasicInfo
        state={quizState}
        setState={setQuizState}
        quizDuration={quizDuration}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      {quizState === "questions" && (
        <QuizContent
          setEndTime={setEndTime}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {quizState === "results" && (
        <QuizResults
          startTime={startTime}
          endTime={endTime}
          answers={answers}
        />
      )}
    </div>
  );
}
