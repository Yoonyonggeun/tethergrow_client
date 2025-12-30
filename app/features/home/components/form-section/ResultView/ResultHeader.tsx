import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const ResultHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 bg-gradient-to-r from-primary/10 to-profit/10 border-2 border-primary/20"
    >
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-profit/20 flex items-center justify-center mx-auto mb-4">
          <Gift className="w-10 h-10 text-profit" />
        </div>
        <h3 className="text-2xl font-bold mb-2">🎉 이벤트 참여 완료!</h3>
        <p className="text-muted-foreground">
          트레이딩 진단 분석을 완료하셨습니다. 이제 개인 맞춤 분석 결과를 확인하세요.
        </p>
      </div>
    </motion.div>
  );
};

export default ResultHeader;
