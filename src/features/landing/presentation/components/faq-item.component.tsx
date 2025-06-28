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
		<div className="group rounded-xl bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-blue-500/50 p-px transition-all duration-300 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500">
			<div className="h-full w-full rounded-[11px] bg-[#1A1B24] p-6">
				<button onClick={onClick} className="flex w-full items-center justify-between text-left">
					<span className="text-lg font-medium text-gray-100">{question}</span>
					<motion.div
						animate={{ rotate: isExpanded ? 45 : 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
					>
						<FiPlus
							className={`text-2xl text-gray-400 transition-colors group-hover:text-white ${
								isExpanded ? 'text-purple-400' : ''
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
							<p className="text-gray-300">{answer}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
