import { motion } from "framer-motion";
import { Activity, BarChart3, Target, TrendingUp, Zap } from "lucide-react";
import type { AnalysisReport } from "./types";

interface KpiCardsProps {
  report?: AnalysisReport;
}

const KpiCards = ({ report }: KpiCardsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-profit" />
          <span className="text-sm text-muted-foreground">총 순이익</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={`font-mono text-3xl font-bold ${
              (report?.overview?.totalPnL || 0) > 0 ? "text-profit" : "text-loss"
            }`}
          >
            {report?.overview?.totalPnL && report.overview.totalPnL > 0 ? "+" : ""}
            {report?.overview?.totalPnL?.toFixed(2) || "0.00"}
          </span>
          <span className="text-lg text-muted-foreground">USDT</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">승률</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-foreground">
            {report?.overview?.winRate?.toFixed(1) || "0.0"}
          </span>
          <span className="text-lg text-muted-foreground">%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">총 거래 수</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-foreground">
            {report?.overview?.totalTrades || 0}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">총 수수료</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-loss">
            -{report?.costAnalysis?.totalFees?.toFixed(2) || "0.00"}
          </span>
          <span className="text-lg text-muted-foreground">USDT</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-profit" />
          <span className="text-sm text-muted-foreground">최대 낙폭</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-loss">
            {report?.riskAnalysis?.maxDrawdown?.toFixed(2) || "0.00"}
          </span>
          <span className="text-lg text-muted-foreground">USDT</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KpiCards;
