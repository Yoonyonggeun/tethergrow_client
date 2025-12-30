import { motion } from "framer-motion";
import { Lock, TrendingUp, BarChart3, Activity, Shield } from "lucide-react";
import { Button } from "~/core/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";
import { AnimatedGradientText } from "~/core/components/ui/animated-gradient-text";

const HeroSection = () => {
  const scrollToForm = () => {
    document
      .getElementById("form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative lg:flex lg:items-center py-20 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/17 rounded-full blur-3xl" />
      {/* <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-profit/17 rounded-full blur-3xl" /> */}
      {/* <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/17 rounded-full blur-3xl" /> */}

      <div className="max-w-[1600px] mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                className="text-3xl text-center md:text-left md:text-4xl lg:text-5xl font-bold leading-tight break-keep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-muted-foreground">감(Gut)</span>에 의존한
                매매를 멈추십시오
                <br />
                <AnimatedGradientText>데이터(Data)</AnimatedGradientText>로
                검증된 <span className="text-foreground">'확률'</span>을
                제안합니다
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-xl break-keep text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                TetherGrow는 트레이딩 수수료 페이백 및 AI 기반 승률 분석
                플랫폼입니다. 불확실한 시장에서 가장 확실한 데이터를
                확보하십시오.
              </motion.p>
            </div>

            {/* Stats Counter */}
            <motion.div
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-1 flex flex-col items-center lg:items-start">
                <div className="font-mono text-3xl font-bold text-profit">
                  <AnimatedCounter end={2847} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">활성 사용자</p>
              </div>
              <div className="space-y-1 flex flex-col items-center lg:items-start">
                <div className="font-mono text-3xl font-bold text-foreground">
                  $<AnimatedCounter end={1.2} decimals={1} suffix="M+" />
                </div>
                <p className="text-sm text-muted-foreground">총 페이백</p>
              </div>
              <div className="space-y-1 flex flex-col items-center lg:items-start">
                <div className="font-mono text-3xl font-bold text-primary">
                  <AnimatedCounter end={94} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">예측 정확도</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={scrollToForm}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
              >
                <span className="relative z-10">
                  무료 진단 및 이벤트 참여하기
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-profit opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            {/* Trust Banner */}
            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* <Shield className="w-5 h-5 text-muted-foreground" /> */}
              {/* <p className="text-sm text-muted-foreground">
                Official Partner of Major Exchanges
              </p> */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 ml-2">
                {["Bybit", "Bitget", "OKX", "MEXC", "KuCoin", "DeepCoin"].map(
                  (exchange) => (
                    <div
                      key={exchange}
                      className="px-3 py-1 bg-secondary/50 rounded-md border border-border/50 text-xs font-mono text-muted-foreground"
                    >
                      {exchange}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-6 relative overflow-hidden">
              {/* Dashboard Content (Blurred) */}
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Trading Dashboard</h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        Live Analytics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                    <span className="text-xs text-muted-foreground font-mono">
                      Connected
                    </span>
                  </div>
                </div>

                {/* Blurred Content */}
                <div className="relative">
                  <div className="blur-sm select-none pointer-events-none">
                    {/* Chart placeholder */}
                    <div className="h-40 bg-gradient-to-br from-secondary to-muted rounded-lg mb-4 flex items-end justify-around p-4">
                      {[65, 45, 78, 52, 89, 67, 42, 73, 58, 81].map(
                        (height, i) => (
                          <div
                            key={i}
                            className={`w-4 rounded-t ${i % 2 === 0 ? "bg-green-500/60" : "bg-red-500/60"}`}
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-muted-foreground">
                            Win Rate
                          </span>
                        </div>
                        <p className="font-mono text-2xl font-bold text-green-500">
                          67.4%
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            P&L Ratio
                          </span>
                        </div>
                        <p className="font-mono text-2xl font-bold text-foreground">
                          1.82
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute inset-0 blur-lock rounded-lg flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/80 border border-border flex items-center justify-center">
                      <Lock className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                      Connect API to Unlock
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToForm}
                      className="border-primary/50 text-primary hover:bg-primary/10"
                    >
                      API 연동하기
                    </Button>
                  </div>
                </div>
              </div>

              {/* Decorative scan line */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 px-4 py-2 border-profit/30 border rounded-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="font-mono text-sm text-green-500">+$847.20</p>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass-card px-4 py-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <p className="font-mono text-sm text-muted-foreground">
                실시간 분석 중...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
