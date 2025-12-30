import { useState } from "react";
import { motion } from "framer-motion";

export interface LongShortData {
  coin: string;
  long: number;
  short: number;
}

interface LongShortTabsProps {
  data: LongShortData[];
}

const LongShortTabs = ({ data }: LongShortTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeData = data[activeTab] || data[0] || { coin: "전체", long: 0, short: 0 };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((item, index) => (
          <button
            key={item.coin}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {item.coin}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-profit font-mono font-bold">롱 {activeData.long}%</span>
          <span className="text-loss font-mono font-bold">숏 {activeData.short}%</span>
        </div>
        <div className="h-8 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.long}%` }}
            transition={{ duration: 0.5 }}
            className="bg-profit"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.short}%` }}
            transition={{ duration: 0.5 }}
            className="bg-loss"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LongShortTabs;
