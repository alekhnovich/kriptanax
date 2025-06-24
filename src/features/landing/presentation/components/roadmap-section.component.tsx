import { motion, type Variants } from 'framer-motion';
import { CheckCircle, Circle, CircleDot } from 'lucide-react';
import { LandingSections, roadmapData } from '../../constants';

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
	offscreen: (isOdd: boolean) => ({
		opacity: 0,
		x: isOdd ? 50 : -50,
	}),
	onscreen: {
		opacity: 1,
		x: 0,
		transition: {
			type: 'spring',
			bounce: 0.3,
			duration: 0.8,
		},
	},
};

export const RoadmapSection = () => {
	return (
		<section
			id={LandingSections.developmentPlan.id}
			className="w-full bg-background-dark py-20 sm:py-28"
		>
			<div className="container mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
						{roadmapData.title}
					</h2>
					<p className="mt-6 text-lg leading-8 text-text-secondary">{roadmapData.subtitle}</p>
				</div>

				<div className="relative mx-auto mt-20 max-w-5xl">
					<div className="roadmap-gradient-line absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 md:block"></div>

					<div className="relative flex flex-col gap-y-12">
						{roadmapData.stages.map((stage, index) => {
							const isOdd = index % 2 !== 0;
							return (
								<motion.div
									key={index}
									className={`relative flex items-center md:w-1/2 ${isOdd ? 'md:self-end md:pl-10' : 'md:self-start md:pr-10'} `}
									initial="offscreen"
									whileInView="onscreen"
									viewport={{ once: true, amount: 0.5 }}
									variants={cardVariants}
									custom={isOdd}
								>
									<div
										className={`w-full rounded-2xl border border-border-color p-6 transition-all duration-300 hover:-translate-y-2 ${stage.status === 'completed' ? 'bg-background-light/50 opacity-70' : 'bg-background-light'} ${stage.status !== 'completed' ? 'hover:border-brand-blue/50 hover:shadow-2xl hover:shadow-brand-blue/20' : ''} `}
									>
										<div className="flex items-center justify-between">
											<p
												className={`font-bold ${stage.status === 'in_progress' ? 'text-brand-blue' : 'text-text-secondary'} `}
											>
												{stage.date}
											</p>
											<StatusIcon status={stage.status} />
										</div>
										<h3 className="mt-3 text-xl font-bold text-text-primary">{stage.title}</h3>
										<p className="mt-2 text-base text-text-secondary">{stage.description}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
