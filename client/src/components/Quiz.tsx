import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import QuizBasicInfo from "./QuizBasicInfo";
import QuizResults from "./QuizResults";

/*
  click start
  timer starts
  click radios to answer questions
  click 'finish test'
  answers are evaluated
  'results' section is shown
  */

export default function Quiz() {
  return (
    <div>
      <QuizHeader />
      <QuizBasicInfo />
      <QuizContent />
      <QuizResults />
    </div>
  );
}
