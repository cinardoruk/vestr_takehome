import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


import duration from "dayjs/plugin/duration";
import type { Duration } from "dayjs/plugin/duration";
dayjs.extend(duration);

import Countdown from 'react-countdown';

import { Button } from "./ui/button";
import { useState } from "react";

export default function QuizBasicInfo() {
  const [quizStatus, _setQuizStatus] = useState("Start");
  const [timeLeft, _setTimeLeft] = useState();

  //- const quizDuration = dayjs.duration({ minutes: 2 });
  const quizDuration = 5;

  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  function startTimer(){

    return (
    <Countdown
      date={Date.now() + 1000 * quizDuration}
      renderer={renderer}
    />
    )
  }



  return (
    <div className="flex flex-col items-start gap-5 my-5">
      <Button
        variant="outline"
        className="green font-bold rounded-2xl w-1/7 cursor-pointer"
        onClick = startTimer
      >
        {quizStatus}
      </Button>
      <div className="green font-bold">
        {quizDuration.format("mm")} mins {quizDuration.format("ss")} seconds
      </div>
    </div>
  );
}
