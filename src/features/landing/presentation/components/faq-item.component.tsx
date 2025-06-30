import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

interface FaqItemProps {
	question: string;
	answer: string;
	isExpanded: boolean;
	onClick: () => void;
}

export const FaqItem = ({ question, answer, isExpanded, onClick }: FaqItemProps) => {
	return (
		<div className="group rounded-xl bg-gradient-to-br from-brand-blue/80 via-brand-purple/80 to-brand-blue/80 p-px transition-all duration-300 hover:from-brand-blue hover:via-brand-purple hover:to-brand-blue">
			<div className="h-full w-full rounded-[11px] bg-background-light p-4 sm:p-6">
				<button onClick={onClick} className="flex w-full items-center justify-between text-left">
					<span className="text-base font-medium text-text-primary sm:text-lg">{question}</span>
					<motion.div
						animate={{ rotate: isExpanded ? 45 : 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
						className="ml-4 flex-shrink-0"
					>
						<FiPlus
							className={`text-2xl text-text-secondary transition-colors group-hover:text-text-primary ${
								isExpanded ? 'text-brand-purple' : ''
							}`}
						/>
					</motion.div>
				</button>
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0, marginTop: 0 }}
							animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
							exit={{ opacity: 0, height: 0, marginTop: 0 }}
							transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
						>
							<p className="text-sm text-text-secondary sm:text-base">{answer}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
