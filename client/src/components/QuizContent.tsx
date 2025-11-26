import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import type { QuizQuestion } from "./Quiz";

interface QuizContentProps {
  questions: QuizQuestion[];
  answers: Record<number, number>;
  setAnswers: (answers: Record<number, number>) => void;
  onFinish: () => void;
  onReset: () => void;
  showResults?: boolean;
}

export default function QuizContent({
  questions,
  answers,
  setAnswers,
  onFinish,
  onReset,
  showResults = false,
}: QuizContentProps) {
  // Correct answer IDs for each question
  const correctAnswers: Record<number, number> = {
    1: 3, // Question 1 correct answer is option 3
    2: 6, // Question 2 correct answer is option 6
    3: 10, // Question 3 correct answer is option 10
  };

  // hardcoded questions array for before integrating the backend
  /* const questions: QuizQuestion[] = [
    {
      id: 1,
      questionText:
        "What was the primary innovation introduced by the Dutch East India Company in the 1600s that laid the groundwork for the modern stock market?",
      options: [
        {
          id: 1,
          optionText:
            "Selling rights to profits to foreign people in exchange for local goods",
        },
        {
          id: 2,
          optionText: "Paying sailors with shares instead of wages",
        },
        {
          id: 3,
          optionText:
            "Selling ownership shares to private citizens to fund voyages",
        },
        {
          id: 4,
          optionText: "Issuing government-backed bonds to finance expeditions",
        },
      ],
    },
    {
      id: 2,
      questionText: "What does P/E ratio (Price-to-Earnings ratio) measure?",
      options: [
        {
          id: 5,
          optionText: "The total value of a company's outstanding shares",
        },
        {
          id: 6,
          optionText:
            "How much investors are willing to pay per dollar of earnings",
        },
        {
          id: 7,
          optionText: "The percentage return on investment over one year",
        },
        {
          id: 8,
          optionText:
            "The difference between a stock's highest and lowest price",
        },
      ],
    },
    {
      id: 3,
      questionText:
        "What is the primary purpose of diversification in an investment portfolio?",
      options: [
        {
          id: 9,
          optionText: "To maximize short-term profits",
        },
        {
          id: 10,
          optionText:
            "To reduce overall risk by spreading investments across different assets",
        },
        {
          id: 11,
          optionText: "To avoid paying taxes on capital gains",
        },
        {
          id: 12,
          optionText: "To guarantee positive returns in all market conditions",
        },
      ],
    },
  ]; */

  return (
    <div className="px-2 md:px-4">
      <div>
        {questions.map((question) => {
          const userAnswer = answers[question.id];
          const correctAnswer = correctAnswers[question.id];
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div key={question.id} className="text-start *:my-2 mb-6 md:mb-8">
              {/* Question title with correct/incorrect indicator */}
              <div className="flex items-center gap-2 flex-wrap">
                <h5 className="text-lg md:text-xl">Question {question.id}</h5>
                {showResults && userAnswer && (
                  <span
                    className={
                      isCorrect
                        ? "text-green-500 font-bold text-sm md:text-base"
                        : "text-red-500 font-bold text-sm md:text-base"
                    }
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <p className="font-bold text-sm md:text-base">{question.questionText}</p>

              <RadioGroup
                value={String(answers[question.id] || "")}
                onValueChange={(value) => {
                  if (!showResults) {
                    // Only allow changes during quiz
                    setAnswers({
                      ...answers,
                      [question.id]: Number(value),
                    });
                  }
                }}
                disabled={showResults}
              >
                {question.options.map((option) => {
                  const isUserAnswer = userAnswer === option.id;
                  const isCorrectOption = correctAnswer === option.id;

                  // Color logic for results mode
                  let colorClass = "";
                  if (showResults) {
                    if (isCorrectOption) {
                      colorClass = "text-green-500";
                    } else if (isUserAnswer && !isCorrect) {
                      colorClass = "text-red-500";
                    }
                  }

                  return (
                    <div key={option.id} className={`flex my-1 p-1 md:p-2 rounded`}>
                      <RadioGroupItem
                        value={String(option.id)}
                        id={`q${question.id}-opt${option.id}`}
                        className="me-2 cursor-pointer "
                      />
                      <Label
                        htmlFor={`q${question.id}-opt${option.id}`}
                        className={`cursor-pointer text-sm md:text-base ${colorClass}`}
                      >
                        {option.optionText}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          );
        })}
      </div>

      {/* Only show button during quiz */}
      {!showResults && (
        <div className="flex justify-start my-10">
          <Button
            className="green-filled font-bold rounded-xl cursor-pointer w-full sm:w-auto px-6"
            onClick={onFinish}
          >
            Finish Test
          </Button>
        </div>
      )}
      {showResults && (
        <div className="flex justify-start my-10">
          <Button
            className="green-filled font-bold rounded-xl cursor-pointer w-full sm:w-auto px-6"
            onClick={onReset}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
