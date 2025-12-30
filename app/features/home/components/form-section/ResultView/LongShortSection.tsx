import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import LongShortTabs from "./LongShortTabs";
import type { AnalysisReport } from "./types";

interface LongShortSectionProps {
  report?: AnalysisReport;
}

const LongShortSection = ({ report }: LongShortSectionProps) => {
  if (!report?.longShortRatio) return null;

  const { longShortRatio } = report;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-8"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-primary" />
        롱/숏 비율
      </h2>
      <LongShortTabs
        data={[
          {
            coin: "전체",
            long: longShortRatio.overall?.long || 0,
            short: longShortRatio.overall?.short || 0,
          },
          ...(longShortRatio.byCoin || []),
        ]}
      />
    </motion.div>
  );
};

export default LongShortSection;
