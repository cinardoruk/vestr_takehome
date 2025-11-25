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
//- export interface QuizAnswer {
//-   question_id: number;
//-   answer_id: number;
//- }
export type QuizAnswer = Record<number, number>;

export default function Quiz() {
  // Duration in seconds
  const quizDuration = 10;

  const [quizState, setQuizState] = useState<QuizState>("init");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleFinish = () => {
    setEndTime(dayjs());
    setQuizState("results");
  };

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

      {quizState === "questions" && (
        <QuizContent
          {...{
            answers,
            setAnswers,
            onFinish: handleFinish,
          }}
        />
      )}

      {quizState === "results" && (
        <QuizResults
          {...{
            answers,
            startTime,
            endTime,
          }}
        />
      )}
    </div>
  );
}
