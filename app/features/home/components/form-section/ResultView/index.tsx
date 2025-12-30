import { motion } from "framer-motion";
import type { AnalyzeFetcher } from "../../FormSection";
import FinalCta from "./FinalCta";
import KpiCards from "./KpiCards";
import LegacyResult from "./LegacyResult";
import LockedInsights from "./LockedInsights";
import LongShortSection from "./LongShortSection";
import ResultHeader from "./ResultHeader";
import SimulationSection from "./SimulationSection";
import type { AnalysisReport } from "./types";

interface ResultViewProps {
  analyzeFetcher: AnalyzeFetcher;
  onFinalSubmit: () => void;
}

const ResultView = ({ analyzeFetcher, onFinalSubmit }: ResultViewProps) => {
  const report = (analyzeFetcher.data as { report?: AnalysisReport })?.report;

  if (!analyzeFetcher.data?.report) {
    return <LegacyResult onSubmit={onFinalSubmit} />;
  }

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <ResultHeader />

      <div className="space-y-6">
        <KpiCards report={report} />
        <LongShortSection report={report} />
        <SimulationSection report={report} />
        <LockedInsights />
        <FinalCta onClick={onFinalSubmit} />
      </div>
    </motion.div>
  );
};

export default ResultView;
