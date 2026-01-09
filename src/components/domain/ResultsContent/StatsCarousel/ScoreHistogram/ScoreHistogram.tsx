import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
  VictoryContainer,
  VictoryPortal,
} from "victory";
import { useVictoryTheme } from "@/hook/useVictoryTheme";

interface ScoreHistogramProps {
  histogram: number[];
  avgScore: number;
  userScore: number;
}

const scoreToBucketPosition = (score: number): number => {
  if (score <= 0) return -0.5;
  if (score >= 100) return 9.5;
  return (score / 10) - 0.5;
};

const ScoreHistogram = ({
  histogram,
  avgScore,
  userScore,
}: ScoreHistogramProps) => {
  const { theme, colors } = useVictoryTheme();

  const barColor = colors.primary;
  const avgLineColor = colors.avg;
  const userLineColor = colors.user;
  const axisColor = colors.subtle;

  const histogramData = histogram.map((count, index) => ({
    x: index,
    y: count,
  }));

  const maxCount = Math.max(...histogram, 1);
  const avgBucketPos = scoreToBucketPosition(avgScore);
  const userBucketPos = scoreToBucketPosition(userScore);

  const avgLabel = `Avg (${avgScore.toFixed(1)})`;
  const userLabel = `You (${userScore})`;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <div className="w-full h-full overflow-visible">
        <VictoryChart
          theme={theme}
          width={400}
          height={150}
          containerComponent={
            <VictoryContainer
              style={{
                height: "100%",
                width: "100%",
                maxHeight: "100%",
              }}
              responsive={true}
              preserveAspectRatio="xMidYMid meet"
            />
          }
          padding={{ top: 20, bottom: 25, left: 10, right: 10 }}
          domainPadding={{ x: 10 }}
          domain={{ x: [-0.5, 9.5], y: [0, maxCount * 1.25] }}
        >
        <VictoryAxis
          tickValues={[0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5]}
          tickFormat={(t) => `${(t + 0.5) * 10}`}
          style={{
            axis: { stroke: axisColor },
            ticks: { stroke: axisColor, size: 4 },
            tickLabels: {
              fontSize: 9,
              fill: axisColor,
            },
            grid: { stroke: "transparent" },
          }}
        />

        <VictoryBar
          data={histogramData}
          style={{
            data: { fill: barColor, width: 18 },
          }}
          cornerRadius={{ top: 3 }}
        />

        <VictoryLine
          data={[
            { x: avgBucketPos, y: maxCount * 1.15, label: avgLabel },
            { x: avgBucketPos, y: 0 },
          ]}
          style={{
            data: {
              stroke: avgLineColor,
              strokeWidth: 1,
              strokeDasharray: "4,2",
            },
            labels: { fontSize: 10, fill: avgLineColor, fontWeight: "600" },
          }}
          labelComponent={
            <VictoryPortal>
              <VictoryLabel dy={-8} />
            </VictoryPortal>
          }
        />

        <VictoryLine
          data={[
            { x: userBucketPos, y: maxCount * 1.15, label: userLabel },
            { x: userBucketPos, y: 0 },
          ]}
          style={{
            data: {
              stroke: userLineColor,
              strokeWidth: 1.5,
            },
            labels: { fontSize: 10, fill: userLineColor, fontWeight: "600" },
          }}
          labelComponent={
            <VictoryPortal>
              <VictoryLabel dy={-8} />
            </VictoryPortal>
          }
        />
        </VictoryChart>
      </div>
    </div>
  );
};

export default ScoreHistogram;
