import { AnimatedSection } from '../../../home';
import { howItWorksData, LandingSections } from '../../constants';

export const HowItWorksSection = () => {
	return (
		<AnimatedSection
			id={LandingSections.howItWorks.id}
			className="relative w-full overflow-hidden bg-background-light py-20 sm:py-28"
		>
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-20">
				<div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-purple opacity-30 blur-[150px]"></div>
				<div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-brand-blue opacity-30 blur-[150px]"></div>
			</div>

			<div className="container relative z-10 mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
						{howItWorksData.title}
					</h2>
					<p className="mt-6 text-lg leading-8 text-text-secondary">{howItWorksData.subtitle}</p>
				</div>

				<div className="mx-auto mt-20 grid max-w-lg gap-8 md:grid-cols-2 lg:max-w-none">
					{howItWorksData.features.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<div
								key={feature.title}
								className="flex flex-col rounded-2xl border border-border-color bg-background-dark p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-purple/50 hover:shadow-2xl hover:shadow-brand-purple/10"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-light">
									<IconComponent className="h-7 w-7 text-brand-purple" />
								</div>
								<div className="mt-5">
									<h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
									<p className="mt-3 text-base text-text-secondary">{feature.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</AnimatedSection>
	);
};
