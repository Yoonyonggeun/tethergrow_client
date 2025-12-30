import { motion } from "framer-motion";
import {
  TrendingDown,
  Brain,
  ArrowRight,
  BadgePercent,
  Shield,
} from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: TrendingDown,
      iconColor: "text-loss",
      iconBg: "bg-loss/20",
      title: "수수료라는 확정된 손실",
      description:
        "레버리지 사용 시 기하급수적으로 늘어나는 비용. 50배 레버리지 기준, 한 번의 거래에도 0.1% 이상의 수수료가 발생합니다.",
      solutionIcon: BadgePercent,
      solutionTitle: "수수료 페이백",
      solutionDesc: "최대 요율 환급으로 손실을 수익으로",
    },
    {
      icon: Brain,
      iconColor: "text-loss",
      iconBg: "bg-loss/20",
      title: "뇌동매매와 근거 없는 진입",
      description:
        "손실 회피 심리로 인한 비이성적 판단. FOMO와 FUD에 휘둘려 계획 없이 포지션에 진입합니다.",
      solutionIcon: Shield,
      solutionTitle: "AI 리스크 관리",
      solutionDesc: "확률 데이터 기반의 진입/청산 제안",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="px-5 relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            트레이더가 패배하는 <br />
            <span className="text-loss">두 가지 이유</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep">
            모든 손실에는 원인이 있습니다. TetherGrow는 그 원인을 제거합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card overflow-hidden group"
            >
              {/* Problem Section */}
              <div className="p-8 border-b border-border/50">
                <div
                  className={`w-14 h-14 rounded-xl ${problem.iconBg} flex items-center justify-center mb-6`}
                >
                  <problem.icon className={`w-7 h-7 ${problem.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed break-keep">
                  {problem.description}
                </p>
              </div>

              {/* Solution Section */}
              <div className="p-8 bg-gradient-to-br from-profit/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-profit/20 flex items-center justify-center">
                    <problem.solutionIcon className="w-5 h-5 text-profit" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-profit" />
                      <span className="text-sm font-semibold text-profit">
                        Solution
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {problem.solutionTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {problem.solutionDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-profit/20 rounded-xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
