import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "~/core/components/ui/button";

interface FinalCtaProps {
  onClick: () => void;
}

const FinalCta = ({ onClick }: FinalCtaProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-primary to-profit hover:opacity-90 text-primary-foreground h-14 text-base font-semibold"
      >
        <Gift className="w-5 h-5 mr-2" />
        초기 멤버 합류하고 90 USDT 크레딧 받기
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );
};

export default FinalCta;
