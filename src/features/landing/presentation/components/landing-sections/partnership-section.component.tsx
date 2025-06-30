import { motion } from 'framer-motion';
import { AnimatedSection } from '../../../../home';
import { LandingSections, partnershipData } from '../../../constants';
import { LevelCard } from './partnership/level-card.component';
import { SubLevelCard } from './partnership/sublevel-card.component';

export const PartnershipSection = () => {
	const mainLevels = partnershipData.levels.slice(0, 3);
	const subLevels = partnershipData.levels.slice(3);

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	return (
		<AnimatedSection
			id={LandingSections.partnershipProgram.id}
			className="relative w-full overflow-hidden bg-background-light py-16 sm:py-24"
		>
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple opacity-20 blur-[150px]"></div>
				<div className="absolute left-1/2 top-3/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue opacity-20 blur-[150px]"></div>
			</div>

			<div className="container relative z-10 mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
						{partnershipData.title}:{' '}
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							{partnershipData.highlightedTitle}
						</span>
					</h2>
					<p className="mt-6 text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						{partnershipData.description}
					</p>
				</div>

				<div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-6 lg:max-w-5xl lg:grid-cols-3">
					{mainLevels.map((item, index) => (
						<LevelCard
							key={item.level}
							level={item.level}
							title={item.title!}
							description={item.description!}
							percentage={item.percentage}
							index={index}
						/>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border-color/50 bg-background-dark/50 p-6 sm:p-8"
				>
					<h3 className="text-center text-xl font-bold text-text-primary">Дополнительные уровни</h3>
					<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
						{subLevels.map((item, index) => (
							<SubLevelCard
								key={item.level}
								level={item.level}
								percentage={item.percentage}
								color={item.color}
								index={index}
							/>
						))}
					</div>
				</motion.div>

				<div className="mt-16 text-center">
					<motion.button
						onClick={handleGoToBot}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="transform rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-blue/20 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50 sm:px-10 sm:py-4 sm:text-lg"
					>
						{partnershipData.buttonText}
					</motion.button>
				</div>
			</div>
		</AnimatedSection>
	);
};
