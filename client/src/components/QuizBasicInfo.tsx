import { useEffect } from "react";
import Countdown from "react-countdown";
import type { CountdownRenderProps } from "react-countdown";
import { Button } from "./ui/button";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { QuizState } from "./Quiz";

interface QuizBasicInfoProps {
  state: QuizState;
  setState: (state: QuizState) => void;
  quizDuration: number; // seconds
  startTime: Dayjs | null;
  setStartTime: (time: Dayjs) => void;
  setEndTime: (time: Dayjs) => void;
}

export default function QuizBasicInfo({
  state,
  setState,
  quizDuration,
  startTime,
  setStartTime,
  setEndTime,
}: QuizBasicInfoProps) {
  // init start time once when entering questions state
  useEffect(() => {
    if (state === "questions" && !startTime) {
      setStartTime(dayjs());
    }
  }, [state, startTime, setStartTime]);

  // renderer callback to customize react-countdown component
  const renderer = ({ minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      if (startTime) {
        setEndTime(startTime.add(quizDuration, "seconds"));
      }
      setState("results");
      return null;
    } else {
      // Render a countdown
      return (
        <span className="green font-bold">
          {minutes} mins {seconds} seconds
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 md:gap-5 my-5 px-2 md:px-4">
      {/* before quiz starts */}
      {state === "init" && (
        <Button
          variant="outline"
          className="green font-bold rounded-2xl w-full sm:w-auto px-6 cursor-pointer"
          onClick={() => setState("questions")}
        >
          Start
        </Button>
      )}

      {/* during quiz */}
      {state === "questions" && startTime && (
        <div className="text-sm md:text-base">
          <Countdown
            key={startTime.valueOf()}
            date={startTime.add(quizDuration, "seconds").valueOf()}
            renderer={renderer}
          />
        </div>
      )}
    </div>
  );
}
