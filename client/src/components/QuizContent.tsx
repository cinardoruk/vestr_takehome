import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";

interface QuizContentProps {
  answers: Record<number, number>;
  setAnswers: (answers: Record<number, number>) => void;
  onFinish: () => void;
}

export default function QuizContent({
  answers,
  setAnswers,
  onFinish,
}: QuizContentProps) {
  //- Each question should have: id, questionText, options[], and some way of marking the correct option (not exposed to the frontend until submission, or not used on the client side).
  interface Option {
    id: number;
    optionText: string;
  }
  interface QuizQuestion {
    id: number;
    questionText: string;
    options: Option[];
  }

  const questions: QuizQuestion[] = [
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
  ];

  return (
    <div>
      <div>
        {questions.map((question) => (
          <div key={question.id} className="text-start *:my-2 mb-8">
            <h5 className="text-xl">Question {question.id}</h5>
            <p className="font-bold">{question.questionText}</p>
            <RadioGroup
              value={String(answers[question.id] || '')}
              onValueChange={(value) => {
                setAnswers({
                  ...answers,
                  [question.id]: Number(value),
                });
              }}
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex my-1">
                  <RadioGroupItem
                    value={String(option.id)}
                    id={`q${question.id}-opt${option.id}`}
                    className="me-2 cursor-pointer"
                  />
                  <Label
                    htmlFor={`q${question.id}-opt${option.id}`}
                    className="cursor-pointer"
                  >
                    {option.optionText}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      <div className="flex justify-start my-10">
        <Button
          className="green-filled font-bold rounded-xl cursor-pointer w-1/8"
          onClick={onFinish}
        >
          Finish Test
        </Button>
      </div>
    </div>
  );
}
