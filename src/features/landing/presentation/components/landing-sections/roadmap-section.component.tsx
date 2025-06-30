import { motion, type Variants } from 'framer-motion';
import { CheckCircle, Circle, CircleDot } from 'lucide-react';
import { AnimatedSection } from '../../../../home';
import { LandingSections, roadmapData } from '../../../constants';
import { useMediaQuery } from '../../../utils';

const StatusIcon = ({ status }: { status: string }) => {
	switch (status) {
		case 'completed':
			return <CheckCircle className="h-6 w-6 text-green-500" />;
		case 'in_progress':
			return <CircleDot className="h-6 w-6 animate-pulse text-brand-blue" />;
		default:
			return <Circle className="h-6 w-6 text-border-color" />;
	}
};

const cardVariants: Variants = {
	offscreen: ({ isOdd, isMobile }: { isOdd: boolean; isMobile: boolean }) => ({
		opacity: 0,
		x: isMobile ? 0 : isOdd ? 50 : -50,
		y: isMobile ? 30 : 0,
	}),
	onscreen: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			type: 'spring',
			bounce: 0.3,
			duration: 0.8,
		},
	},
};

export const RoadmapSection = () => {
	const isMobile = useMediaQuery('(max-width: 767px)');

	return (
		<AnimatedSection
			id={LandingSections.developmentPlan.id}
			className="relative w-full overflow-hidden bg-background-dark py-16 sm:py-24"
		>
			<div
				aria-hidden="true"
				className="absolute left-1/2 top-0 h-1/2 w-full -translate-x-1/2 bg-gradient-radial from-brand-purple/10 to-transparent blur-3xl md:h-2/3"
			/>

			<div className="container relative mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
						{roadmapData.title}
					</h2>
					<p className="mt-6 text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						{roadmapData.subtitle}
					</p>
				</div>

				<div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
					<div className="roadmap-gradient-line absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 md:block"></div>

					<div className="relative flex flex-col gap-y-12">
						{roadmapData.stages.map((stage, index) => {
							const isOdd = index % 2 !== 0;
							return (
								<motion.div
									key={index}
									className={`relative flex items-center md:w-1/2 ${isOdd ? 'md:self-end md:pl-10' : 'md:self-start md:pr-10'}`}
									initial="offscreen"
									whileInView="onscreen"
									viewport={{ once: true, amount: 0.5 }}
									variants={cardVariants}
									custom={{ isOdd, isMobile }}
								>
									<div
										className={`w-full rounded-2xl border border-border-color p-4 transition-all duration-300 hover:-translate-y-2 sm:p-6 ${stage.status === 'completed' ? 'bg-background-light/50 opacity-70' : 'bg-background-light'} ${stage.status !== 'completed' ? 'hover:border-brand-blue/50 hover:shadow-2xl hover:shadow-brand-blue/20' : ''}`}
									>
										<div className="flex items-center justify-between">
											<p
												className={`font-bold ${stage.status === 'in_progress' ? 'text-brand-blue' : 'text-text-secondary'}`}
											>
												{stage.date}
											</p>
											<StatusIcon status={stage.status} />
										</div>
										<h3 className="mt-3 text-lg font-bold text-text-primary sm:text-xl">
											{stage.title}
										</h3>
										<p className="mt-2 text-base text-text-secondary">{stage.description}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};
