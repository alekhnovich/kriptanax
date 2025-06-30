import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface StatCardProps {
	title: string;
	value: string;
	icon?: ReactNode;
	note?: string;
}

export const StatCard = ({ title, value, icon, note }: StatCardProps) => (
	<motion.div
		className="flex items-center justify-between rounded-lg bg-background-dark p-3 sm:p-4"
		whileHover={{
			scale: 1.03,
			boxShadow: '0px 0px 12px rgba(138, 43, 226, 0.4)',
		}}
		transition={{ type: 'spring', stiffness: 300, damping: 15 }}
	>
		<div>
			<p className="text-sm text-text-secondary">{title}</p>
			<p className="text-xl font-bold text-text-primary sm:text-2xl">{value}</p>
			{note && <p className="text-xs text-gray-500">{note}</p>}
		</div>
		<div className="text-2xl sm:text-3xl">{icon}</div>
	</motion.div>
);
