import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "~/core/components/ui/button";
import { Link } from "react-router";
import { mockData } from "~/core/data/mockData";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/core/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  actual: {
    label: "실제 자산",
    color: "#ef4444", // loss 색상 (red-500)
  },
  simulated: {
    label: "시뮬레이션 자산",
    color: "#10b981", // profit 색상 (emerald-500)
  },
} satisfies ChartConfig;

export default function DemoTradingDiagnosis() {
  const { demoTradingDiagnosis } = mockData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto px-5 py-12">
        {/* Diagnosis Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              데모 트레이딩 진단 결과
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            최근 거래 데이터를 기반으로 트레이딩 성향을 분석했습니다.
          </p>
        </motion.div>

        {/* Trading Overview KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {demoTradingDiagnosis.kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  {index === 0 && (
                    <TrendingUp className="w-4 h-4 text-profit" />
                  )}
                  {index === 1 && <Target className="w-4 h-4 text-primary" />}
                  {index === 2 && <Zap className="w-4 h-4 text-primary" />}
                  {index === 3 && <Activity className="w-4 h-4 text-primary" />}
                  {index === 4 && <BarChart3 className="w-4 h-4 text-profit" />}
                  <span className="text-sm text-muted-foreground">
                    {kpi.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-mono text-3xl font-bold text-foreground">
                    {typeof kpi.value === "number" && kpi.value % 1 !== 0
                      ? kpi.value.toFixed(1)
                      : kpi.value}
                  </span>
                  {kpi.unit && (
                    <span className="text-lg text-muted-foreground">
                      {kpi.unit}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {kpi.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Long / Short Ratio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              롱/숏 비율
            </h2>
            <LongShortTabs data={demoTradingDiagnosis.longShortRatio} />
          </div>
        </motion.div>

        {/* Simulation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              시뮬레이션 분석
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Equity Curve Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4">자산 곡선</h3>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] min-w-[335px] max-w-fit"
                >
                  <LineChart
                    data={demoTradingDiagnosis.simulationEquity.actual.map(
                      (point, i) => ({
                        date:
                          point.date.split("-")[1] +
                          "/" +
                          point.date.split("-")[2],
                        actual: point.value,
                        simulated:
                          demoTradingDiagnosis.simulationEquity.simulated[i]
                            ?.value || 0,
                      })
                    )}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="simulated"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>

              {/* Analysis Text */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    분석 요약 (통계 기반)
                  </h3>
                  <ul className="space-y-3">
                    {demoTradingDiagnosis.simulationAnalysis.summary.map(
                      (item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + index * 0.1,
                          }}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>

                <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl">
                  <h4 className="font-semibold mb-2 text-primary">
                    AI 인사이트
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {demoTradingDiagnosis.simulationAnalysis.aiInsight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Insight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">시장 및 패턴 인사이트</h2>
              <p className="text-muted-foreground">
                과거 데이터와 전체 트레이딩 패턴을 기반으로 한 참고 지표입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Pattern Win Rate */}
              <div className="glass-card p-6 bg-secondary/30">
                <h3 className="text-sm text-muted-foreground mb-4">
                  패턴 승률
                </h3>
                <div className="text-center">
                  <div className="font-mono text-4xl font-bold text-primary mb-2">
                    {demoTradingDiagnosis.advancedInsights.patternWinRate.value.toFixed(
                      1
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      demoTradingDiagnosis.advancedInsights.patternWinRate
                        .description
                    }
                  </p>
                </div>
              </div>

              {/* Crowd Position */}
              <div className="glass-card p-6 bg-secondary/30">
                <h3 className="text-sm text-muted-foreground mb-4">
                  군중 포지션
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-profit font-mono font-bold">
                      롱{" "}
                      {demoTradingDiagnosis.advancedInsights.crowdPosition.long}
                      %
                    </span>
                    <span className="text-loss font-mono font-bold">
                      숏{" "}
                      {
                        demoTradingDiagnosis.advancedInsights.crowdPosition
                          .short
                      }
                      %
                    </span>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div
                      className="bg-profit"
                      style={{
                        width: `${demoTradingDiagnosis.advancedInsights.crowdPosition.long}%`,
                      }}
                    />
                    <div
                      className="bg-loss"
                      style={{
                        width: `${demoTradingDiagnosis.advancedInsights.crowdPosition.short}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      demoTradingDiagnosis.advancedInsights.crowdPosition
                        .description
                    }
                  </p>
                </div>
              </div>

              {/* Trading Signal */}
              <div className="glass-card p-6 bg-secondary/30">
                <h3 className="text-sm text-muted-foreground mb-4">
                  거래 신호
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        demoTradingDiagnosis.advancedInsights.tradingSignal
                          .status === "enter"
                          ? "bg-profit"
                          : demoTradingDiagnosis.advancedInsights.tradingSignal
                                .status === "wait"
                            ? "bg-primary/50"
                            : "bg-loss"
                      }`}
                    />
                    <span className="font-semibold">
                      {
                        demoTradingDiagnosis.advancedInsights.tradingSignal
                          .label
                      }
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {
                      demoTradingDiagnosis.advancedInsights.tradingSignal
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              실제 트레이딩 데이터로 진단받아보세요
            </h3>
            <p className="text-muted-foreground mb-6">
              API 연동 후 개인 맞춤 분석 결과와 AI 인사이트를 확인할 수
              있습니다.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
            >
              <Link to="/#form-section">지금 바로 API 연동하기</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LongShortTabs({
  data,
}: {
  data: Array<{ coin: string; long: number; short: number }>;
}) {
  const [activeTab, setActiveTab] = useState(0);

  const activeData = data[activeTab];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((item, index) => (
          <button
            key={item.coin}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {item.coin}
          </button>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-profit font-mono font-bold">
            롱 {activeData.long}%
          </span>
          <span className="text-loss font-mono font-bold">
            숏 {activeData.short}%
          </span>
        </div>
        <div className="h-8 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.long}%` }}
            transition={{ duration: 0.5 }}
            className="bg-profit"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.short}%` }}
            transition={{ duration: 0.5 }}
            className="bg-loss"
          />
        </div>
      </motion.div>
    </div>
  );
}
