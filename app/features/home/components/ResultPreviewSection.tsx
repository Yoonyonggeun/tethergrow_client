import { motion } from "framer-motion";
import {
  Lock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
} from "lucide-react";
import { Button } from "~/core/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";

const ResultPreviewSection = () => {
  const scrollToForm = () => {
    document
      .getElementById("form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="px-5 relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            당신의 트레이딩
            <br />
            <span className="text-gradient-primary">데이터 미리보기</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep">
            API 연동 후 확인할 수 있는 분석 결과입니다. 지금 바로 시작하세요.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Personal Audit (Clear) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Personal Audit</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  기본 분석 결과
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Fee Loss */}
              <div className="p-5 bg-loss/10 border border-loss/20 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">
                  최근 3개월 총 지출 수수료
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-loss">
                    -<AnimatedCounter end={3420} prefix="$" />
                  </span>
                  <span className="text-sm text-loss/70">USDT</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  레버리지 평균 25x 기준
                </p>
              </div>

              {/* P&L Ratio */}
              <div className="p-5 bg-secondary/50 border border-border/50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">
                  평균 손익비 (Risk:Reward)
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl font-bold text-foreground">
                      1
                    </span>
                    <span className="text-muted-foreground">:</span>
                    <span className="font-mono text-3xl font-bold text-loss">
                      0.8
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-loss text-sm">
                    <TrendingDown className="w-4 h-4" />
                    <span>개선 필요</span>
                  </div>
                </div>
              </div>

              {/* Win Rate */}
              <div className="p-5 bg-secondary/50 border border-border/50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">승률</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-bold text-foreground">
                    42%
                  </span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[42%] bg-gradient-to-r from-loss to-loss/70 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - AI & Crowd Data (Blurred/Locked) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-profit/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-profit" />
              </div>
              <div>
                <h3 className="font-semibold">AI & Crowd Data</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  고급 분석 결과
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 px-2 py-1 bg-loss/10 text-loss text-xs rounded-full">
                <Lock className="w-3 h-3" />
                <span>Locked</span>
              </div>
            </div>

            {/* Blurred Content */}
            <div className="relative">
              <div className="blur-md select-none pointer-events-none space-y-6">
                {/* Long/Short Bar */}
                <div className="p-5 bg-secondary/50 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-4">
                    BTC/USDT 군중 포지션
                  </p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-profit">Long 62%</span>
                    <span className="font-mono text-loss">Short 38%</span>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div className="w-[62%] bg-profit" />
                    <div className="w-[38%] bg-loss" />
                  </div>
                </div>

                {/* Signal */}
                <div className="p-5 bg-secondary/50 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-4">
                    AI 시그널
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-profit" />
                      <div className="w-6 h-6 rounded-full bg-muted" />
                      <div className="w-6 h-6 rounded-full bg-muted" />
                    </div>
                    <span className="text-profit font-mono font-bold">BUY</span>
                  </div>
                </div>

                {/* Predicted Range */}
                <div className="p-5 bg-secondary/50 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-3">
                    예상 가격 범위 (24h)
                  </p>
                  <p className="font-mono text-xl font-bold text-foreground">
                    $96,200 - $98,400
                  </p>
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="absolute inset-0 blur-lock rounded-xl flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-secondary/90 border border-border flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-center max-w-xs">
                  API 연동 후 AI 분석 결과를 확인할 수 있습니다
                </p>
                <Button
                  onClick={scrollToForm}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  API 연동하고 블러 해제하기
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultPreviewSection;
