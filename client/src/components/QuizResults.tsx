import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { Duration } from "dayjs/plugin/duration";
dayjs.extend(duration);

//- import type { Dayjs } from "dayjs";

// From object
//- dayjs.duration({
//-   hours: 6,
//-   minutes: 30,
//-   seconds: 0
//- });

export default function QuizResults() {
  interface QuizResult {
    total: number;
    correct: number;
    time: Duration;
    score: number;
    level: string;
  }

  const testResult: QuizResult = {
    total: 30,
    correct: 17,
    time: dayjs.duration({ minutes: 5, seconds: 23 }),
    score: 88,
    level: "Passing",
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
