import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const LockedInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass-card p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">시장 및 패턴 인사이트</h2>
        <p className="text-muted-foreground">
          과거 데이터와 전체 트레이딩 패턴을 기반으로 한 참고 지표입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
          <h3 className="text-sm text-muted-foreground mb-4">패턴 승률</h3>
          <div className="text-center">
            <div className="font-mono text-4xl font-bold text-primary mb-2">73.2%</div>
            <p className="text-xs text-muted-foreground">특정 패턴에서의 승률 분석 결과</p>
          </div>
        </div>

        <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
          <h3 className="text-sm text-muted-foreground mb-4">군중 포지션</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-profit font-mono font-bold">롱 62%</span>
              <span className="text-loss font-mono font-bold">숏 38%</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div className="bg-profit w-[62%]" />
              <div className="bg-loss w-[38%]" />
            </div>
            <p className="text-xs text-muted-foreground">시장 전체 포지션 분포</p>
          </div>
        </div>

        <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
          <h3 className="text-sm text-muted-foreground mb-4">거래 신호</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-profit" />
              <span className="font-semibold">진입 신호</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              현재 시장 상황에 따른 거래 신호 분석
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 bg-secondary/50 border border-border/50 rounded-xl text-center">
        <div className="flex items-center gap-2 justify-center mb-2">
          <Lock className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">상세 분석 결과</p>
        </div>
        <p className="text-xs text-muted-foreground">전체 리포트는 '초기 멤버' 합류 후 확인 가능합니다</p>
      </div>
    </motion.div>
  );
};

export default LockedInsights;
