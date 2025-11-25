import { Button } from "./ui/button";
import { useState } from "react";

export default function QuizBasicInfo() {
  const [quizStatus, setQuizStatus] = useState("Not started");
  return (
    <div>
      <Button>{quizStatus}</Button>
      <div>quizbasicinfo</div>
      <div>quizbasicinfo</div>
    </div>
  );
}
