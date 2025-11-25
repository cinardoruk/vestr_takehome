import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import QuizBasicInfo from "./QuizBasicInfo";

export default function Quiz() {
  return (
    <div>
      <QuizHeader />
      <QuizBasicInfo />
      <QuizContent />
    </div>
  );
}
