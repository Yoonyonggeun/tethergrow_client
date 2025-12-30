import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface LoadingStepsProps {
  steps: string[];
}

const LoadingSteps = ({ steps }: LoadingStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-3 w-full max-w-xs">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: index <= currentStep ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-3 ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              index < currentStep
                ? "bg-profit"
                : index === currentStep
                  ? "bg-primary animate-pulse"
                  : "bg-muted"
            }`}
          >
            {index < currentStep ? (
              <CheckCircle className="w-4 h-4 text-profit-foreground" />
            ) : (
              <span className="text-xs font-mono">{index + 1}</span>
            )}
          </div>
          <span className="text-sm font-mono">{step}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSteps;
