import { motion } from "framer-motion";
import {
  Database,
  Newspaper,
  User,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const LogicSection = () => {
  const steps = [
    {
      icon: Database,
      title: "Historical Data",
      subtitle: "과거 10년 시세 패턴 대조",
      description: "비트코인 가격 데이터와 유사 패턴 매칭",
    },
    {
      icon: Newspaper,
      title: "Market Events",
      subtitle: "뉴스/이벤트 변동성 반영",
      description: "FOMC, CPI 등 거시경제 지표 분석",
    },
    {
      icon: User,
      title: "User Behavior",
      subtitle: "사용자 매매 습관 분석",
      description: "개인화된 리스크 프로파일 생성",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="px-5 relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 break-keep">
            우리는 <span className="text-muted-foreground">미래를 예언</span>
            하지 않습니다.
            <br />
            <span className="text-gradient-primary">과거를 분석</span>할
            뿐입니다.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            데이터 기반 확률 분석은 마법이 아닙니다. 과학입니다.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-8 text-center h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground font-mono">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-profit/10 flex items-center justify-center border border-primary/20">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-mono text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary mb-3">{step.subtitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="font-mono text-sm text-muted-foreground">
            = <span className="text-primary">확률 기반 진입/청산 시그널</span>{" "}
            도출
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LogicSection;
