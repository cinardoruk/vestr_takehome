import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { Duration } from "dayjs/plugin/duration";
import type { Dayjs } from "dayjs";
dayjs.extend(duration);

//- import type { Dayjs } from "dayjs";

// From object
//- dayjs.duration({
//-   hours: 6,
//-   minutes: 30,
//-   seconds: 0
//- });
interface QuizResultsProps {
  answers: Record<number, number>;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

export default function QuizResults({ answers, startTime, endTime }: QuizResultsProps) {
  interface QuizResult {
    total: number;
    correct: number;
    time: Duration;
    score: number;
    level: string;
  }

  // Correct answer IDs for each question
  const correctAnswers = [3, 6, 10]; // Question 1: option 3, Question 2: option 6, Question 3: option 10

  const totalQuestions = 3;
  const correctCount = Object.values(answers).filter(answerId =>
    correctAnswers.includes(answerId)
  ).length;

  const elapsedTime = startTime && endTime
    ? dayjs.duration(endTime.diff(startTime))
    : dayjs.duration(0);

  const score = Math.round((correctCount / totalQuestions) * 100);
  const level = score >= 70 ? "Passing" : "Needs Improvement";

  const testResult: QuizResult = {
    total: totalQuestions,
    correct: correctCount,
    time: elapsedTime,
    score: score,
    level: level,
  };

  return (
    <div className=" text-start p-3 bg-neutral-900 *:font-bold ">
      <h4 className="mb-3">Results </h4>
      <p>
        Correct: <span className="green">{testResult.correct}</span>/
        {testResult.total}
      </p>
      <p>
        Time: {testResult.time.format("m")}m {testResult.time.format("ss")}s
      </p>
      <p>
        Score: <span className="green">{testResult.score}</span>
      </p>
      <p>Level: {testResult.level}</p>
    </div>
  );
}
