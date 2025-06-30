import { motion } from 'framer-motion';

interface SubLevelCardProps {
	level: number;
	percentage: number;
	color: string;
	index: number;
}

export const SubLevelCard = ({ level, percentage, color, index }: SubLevelCardProps) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.8 }}
		whileInView={{ opacity: 1, scale: 1 }}
		viewport={{ once: true, amount: 0.8 }}
		transition={{ duration: 0.4, delay: 0.1 * index, ease: 'easeOut' }}
		className="rounded-lg bg-background-dark p-4 text-center"
	>
		<p className="text-sm font-semibold text-text-secondary">Уровень {level}</p>
		<p className="mt-1 text-lg font-bold" style={{ color: color }}>
			{percentage}%
		</p>
	</motion.div>
);
