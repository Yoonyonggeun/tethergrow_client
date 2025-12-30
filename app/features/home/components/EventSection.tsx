import { motion } from "framer-motion";
import { Trophy, Medal, Award, Gift, Users } from "lucide-react";
import { Progress } from "~/core/components/ui/progress";
import AnimatedCounter from "./AnimatedCounter";
import { AnimatedGradientText } from "~/core/components/ui/animated-gradient-text";

const EventSection = () => {
  const prizes = [
    {
      icon: Trophy,
      place: "1등",
      count: "1명",
      prize: "3,000 USDT",
      glowClass: "prize-glow-1 border-yellow-500/30",
      iconColor: "text-yellow-500",
      highlight: true,
    },
    {
      icon: Medal,
      place: "2등",
      count: "3명",
      prize: "1,000 USDT",
      glowClass: "prize-glow-2 border-gray-400/30",
      iconColor: "text-gray-400",
      highlight: false,
    },
    {
      icon: Award,
      place: "3등",
      count: "40명",
      prize: "100 USDT",
      glowClass: "prize-glow-3 border-amber-600/30",
      iconColor: "text-amber-600",
      highlight: false,
    },
  ];

  const currentParticipants = 124;
  const maxParticipants = 1000;
  const progressPercent = (currentParticipants / maxParticipants) * 100;

  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="px-5 relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Early Access Event
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Early Access 런칭 기념
            <br />
            <AnimatedGradientText>초기 멤버</AnimatedGradientText> 혜택
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep">
            초기 사용자 1,000명의 데이터 모델링 최적화를 위해 준비했습니다.
            <br /> API 연동 및 알림 신청 시 자동 응모됩니다.
          </p>
        </motion.div>

        {/* Prize Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 text-center ${prize.glowClass}`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center ${prize.highlight ? "animate-pulse-glow" : ""}`}
              >
                <prize.icon className={`w-8 h-8 ${prize.iconColor}`} />
              </div>
              <div className="mb-2">
                <span className="font-mono text-sm text-muted-foreground">
                  {prize.place}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({prize.count})
                </span>
              </div>
              <p
                className={`font-mono text-2xl font-bold ${prize.highlight ? "text-yellow-500" : "text-foreground"}`}
              >
                {prize.prize}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Guaranteed Benefit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 mb-8 glow-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-profit/20 flex items-center justify-center">
                <Gift className="w-6 h-6 text-profit" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  참가자 전원 혜택
                </p>
                <p className="font-semibold">
                  MVP 출시 시{" "}
                  <span className="text-profit font-mono">
                    AI 구독 크레딧
                    <br />
                    90 USDT
                  </span>{" "}
                  지급
                </p>
                <p className="text-xs text-muted-foreground">
                  (출금 불가, 서비스 내 사용)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                현재 참여 인원
              </span>
            </div>
            <div className="font-mono">
              <span className="text-primary font-bold">
                <AnimatedCounter end={currentParticipants} />
              </span>
              <span className="text-muted-foreground">
                {" "}
                / {maxParticipants.toLocaleString()}명
              </span>
            </div>
          </div>
          <div className="relative">
            <Progress value={progressPercent} className="h-3 bg-secondary" />
            <div
              className="absolute top-0 left-0 h-3 rounded-full progress-gradient transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            마감까지{" "}
            <span className="font-mono text-primary">
              {maxParticipants - currentParticipants}
            </span>
            명 남음
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EventSection;
