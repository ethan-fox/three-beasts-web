import GaugeComponent from "react-gauge-component";
import { getMotivationalMessage } from "@/util/resultUtil";

interface ResultGaugeProps {
  score: number;
}

const ResultGauge = ({ score }: ResultGaugeProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <GaugeComponent
        type="semicircle"
        arc={{
          padding: 0.02,
          subArcs: [
            { limit: 29, color: "#b8b6ba" },  // 0-29: Gray 
            { limit: 49, color: "#ef4444" },  // 30-49: Red
            { limit: 69, color: "#f97316" },  // 50-69: Orange
            { limit: 84, color: "#eab308" },  // 70-84: Yellow
            { limit: 99, color: "#22c55e" },  // 85-99: Green
            { color: "#3b82f6" },             // 100: Blue (perfect)
          ],
        }}
        pointer={{
          type: "arrow",
          animationDelay: 0,
        }}
        labels={{
          valueLabel: {
            matchColorWithArc: true
          },
          tickLabels: {
            hideMinMax: true
          }
        }}
        value={score}
        minValue={0}
        maxValue={100}
      />
      <p className="text-lg font-semibold text-center">
        {getMotivationalMessage(score)}
      </p>
    </div>
  );
};

export default ResultGauge;
