import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ 
  end, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  duration = 2
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(end);
      setHasAnimated(true);
    }
  }, [isInView, end, spring, hasAnimated]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

export default AnimatedCounter;
