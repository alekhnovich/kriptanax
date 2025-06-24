import { useEffect, useRef } from 'react';
import { useSpring, animate } from 'framer-motion';

const formatNumber = (num: number) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

interface AnimatedNumberProps {
  value: number; 
}

export const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const springValue = useSpring(value, { damping: 20, stiffness: 200 });
  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(springValue, Number(node.textContent?.replace(/\s/g, '').replace(',', '.')) || 0, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate: (latest) => {
            node.textContent = formatNumber(latest);
        }
    });
    return () => controls.stop();
  }, [springValue]);
    
  return <span ref={ref}>{formatNumber(value)}</span>;
};