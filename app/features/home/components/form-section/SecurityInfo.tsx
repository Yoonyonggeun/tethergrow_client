import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SecurityInfoProps {
  securityFeatures: SecurityFeature[];
  headingIcon: LucideIcon;
}

const SecurityInfo = ({ securityFeatures, headingIcon: HeadingIcon }: SecurityInfoProps) => {
  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
        <HeadingIcon className="w-5 h-5 text-profit" />
        보안 및 개인정보 보호
      </h3>

      <div className="space-y-6">
        {securityFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-profit/10 flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-5 h-5 text-profit" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SecurityInfo;
