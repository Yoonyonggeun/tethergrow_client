import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import LoadingSteps from "./LoadingSteps";

interface LoadingCardProps {
  steps: string[];
}

const LoadingCard = ({ steps }: LoadingCardProps) => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="relative mb-8">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/20" />
      </div>
      <LoadingSteps steps={steps} />
    </motion.div>
  );
};

export default LoadingCard;
