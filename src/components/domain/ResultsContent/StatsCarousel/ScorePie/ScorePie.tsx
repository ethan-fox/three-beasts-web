import { VictoryPie, VictoryContainer } from "victory";
import { useVictoryTheme } from "@/hook/useVictoryTheme";

interface ScorePieProps {
  score: number;
  compact?: boolean;
}

const ScorePie = ({ score, compact = false }: ScorePieProps) => {
  const { colors, isDark } = useVictoryTheme();

  const scoreColor = colors.primary;
  const remainderColor = isDark ? "#3f3f46" : "#e4e4e7";

  const data = [
    { x: "score", y: score },
    { x: "remainder", y: 100 - score },
  ];

  return (
    <div className="relative w-full h-full">
      <VictoryPie
        containerComponent={
          <VictoryContainer
            style={{ height: "100%", width: "100%" }}
            responsive={true}
          />
        }
        data={data}
        innerRadius={compact ? 120 : 100}
        cornerRadius={compact ? 12 : 20}
        padAngle={2}
        startAngle={90}
        endAngle={-270}
        labels={() => null}
        style={{
          data: {
            fill: ({ datum }) =>
              datum.x === "score" ? scoreColor : remainderColor,
          },
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={compact ? "text-3xl font-semibold" : "text-5xl font-bold"}>
          {score}
        </span>
      </div>
    </div>
  );
};

export default ScorePie;
