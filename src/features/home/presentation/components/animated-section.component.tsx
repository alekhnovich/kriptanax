import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
	children: ReactNode;
	id?: string;
	className?: string;
}

const sectionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: 'easeOut',
		},
	},
};

export const AnimatedSection = ({ children, id, className }: AnimatedSectionProps) => {
	return (
		<motion.section
			id={id}
			className={className}
			variants={sectionVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
		>
			{children}
		</motion.section>
	);
};
