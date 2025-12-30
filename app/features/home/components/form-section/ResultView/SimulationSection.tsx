import { motion } from "framer-motion";
import { Activity, Info } from "lucide-react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/core/components/ui/chart";
import type { AnalysisReport } from "./types";

interface SimulationSectionProps {
  report?: AnalysisReport;
}

const SimulationSection = ({ report }: SimulationSectionProps) => {
  const simulation = report?.simulation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-8"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" />
        시뮬레이션 분석
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">자산 곡선</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>과거 데이터 재구성</span>
            </div>
          </div>
          {simulation ? (
            <ChartContainer
              config={{
                actual: {
                  label: "실제",
                  color: "#ef4444",
                },
                simulated: {
                  label: "시뮬레이션",
                  color: "#10b981",
                },
              }}
              className="h-[300px] w-full"
            >
              <LineChart
                data={simulation.actual.map((point, index) => ({
                  date: `${point.date.split("-")[1]}/${point.date.split("-")[2]}`,
                  actual: point.value,
                  simulated: simulation.simulated[index]?.value || 0,
                }))}
              >
                <XAxis
                  dataKey="date"
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  fontSize={12}
                />
                <YAxis
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} dot={false} name="실제" />
                <Line
                  type="monotone"
                  dataKey="simulated"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="시뮬레이션"
                  strokeDasharray="5 5"
                  opacity={0.7}
                />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">시뮬레이션 데이터가 없습니다.</p>
            </div>
          )}
          {simulation && (
            <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-xs text-muted-foreground">
              <p>
                적용된 가정: 극단 손실 거래 제거 ({simulation.removedTradesCount || 0}
                건 제거)
              </p>
              <p className="mt-1">
                이 결과는 과거 거래 데이터를 특정 가정 하에 재구성한 시뮬레이션입니다. 실제 수익을 보장하지
                않습니다.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-5 bg-secondary/30 border border-border/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">분석 요약 (통계 기반)</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span className="text-muted-foreground">
                  총 {report?.overview?.totalTrades || 0}건의 거래 중{" "}
                  {report?.overview?.winRate?.toFixed(1) || "0.0"}% 의 승률을 기록했습니다.
                </span>
              </li>
              {simulation && (
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span className="text-muted-foreground">
                    시뮬레이션 결과, 최대 낙폭이 {simulation.actualMDD || 0} USDT에서 {simulation.simulatedMDD || 0} USDT로
                    감소했습니다.
                  </span>
                </li>
              )}
              {report?.overview?.totalPnL !== undefined && (
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span className="text-muted-foreground">
                    최근 90일 동안 {report.overview.totalPnL > 0 ? "+" : ""}
                    {report.overview.totalPnL?.toFixed(2) || "0.00"} USDT의 순이익을 기록했습니다.
                  </span>
                </li>
              )}
              {report?.costAnalysis?.totalFees && (
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span className="text-muted-foreground">
                    총 {report.costAnalysis.totalFees.toFixed(2)} USDT의 수수료를 지출했습니다.
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl">
            <h4 className="font-semibold mb-2 text-primary">AI 인사이트</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {simulation?.equityVolatilityReduced
                ? "일부 극단적인 손실 거래를 제거했을 경우, 자산 곡선의 변동성이 감소하는 것으로 관찰됩니다. 소수의 큰 손실 거래가 전체 성과에 상당한 영향을 미쳤습니다."
                : "과거 거래 패턴을 분석한 결과, 트레이딩 전략 최적화를 통해 성과 개선의 여지가 있습니다. 초기 멤버에 합류하시면 더 상세한 분석과 맞춤형 전략을 확인하실 수 있습니다."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationSection;
