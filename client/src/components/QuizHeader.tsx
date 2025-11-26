import { Button } from "./ui/button";
export default function QuizHeader() {
  return (
    <div className="*:text-left px-2 md:px-4">
      <Button variant="outline" className="flex rounded-full my-2 text-sm md:text-base">
        Back
      </Button>
      <h1 className="text-xl md:text-2xl font-bold mb-3">Financial Literacy Test</h1>
      <p className="text-sm md:text-base leading-relaxed">
        This scoring system rewards both accuracy and exceptional speed with a
        tiered bonus structure. The test contains 30 questions,{" "}
        <b>each worth 5 points</b>, giving a total possible accuracy score of
        150 points. Students who take five minutes or longer (300 seconds)
        receive only their accuracy score, with no time bonus added. Students
        who finish under five minutes earn a <b>speed bonus</b> of 1 point for
        every second under 5 minutes (300 seconds). For example, completing the
        test in 4:30 earns 30 bonus points, and finishing in 3:15 earns 105
        bonus points.{" "}
      </p>

      <div className="my-2 text-sm md:text-base">
        <p>
          <b>Pass</b>: 115+ points
        </p>

        <p>
          <b>Proficient</b>: 130+ points
        </p>

        <p>
          <b>Advanced</b>: 150+ points
        </p>

        <p>
          <b>Expert</b>:170+ points
        </p>
      </div>
    </div>
  );
}
