import { motion } from 'framer-motion';

interface LevelCardProps {
	level: number;
	title: string;
	description: string;
	percentage: number;
	index: number;
}

export const LevelCard = ({ level, title, percentage, description, index }: LevelCardProps) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, amount: 0.5 }}
		transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
		className="flex flex-col rounded-2xl border border-border-color bg-background-light p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-brand-blue/30 hover:shadow-brand-purple/10 sm:p-8"
	>
		<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-xl font-bold text-white shadow-md">
			{level}
		</div>
		<h3 className="text-xl font-bold text-text-primary">{title}</h3>
		<p className="my-2 bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-5xl font-extrabold text-transparent">
			{percentage}%
		</p>
		<p className="text-sm text-text-secondary">{description}</p>
	</motion.div>
);
