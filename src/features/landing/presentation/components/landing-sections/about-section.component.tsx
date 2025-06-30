import { AnimatedSection } from '../../../../home';
import { aboutSectionData, LandingSections } from '../../../constants';

export const AboutSection = () => {
	return (
		<AnimatedSection
			id={LandingSections.aboutUs.id}
			className="section-anchor relative w-full overflow-hidden bg-background-dark py-16 sm:py-24"
		>
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute left-0 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-brand-blue opacity-15 blur-[120px] md:h-[500px] md:w-[500px]"></div>
				<div className="absolute right-0 top-1/2 h-[300px] w-[300px] translate-x-1/2 rounded-full bg-brand-purple opacity-15 blur-[120px] md:h-[500px] md:w-[500px]"></div>
			</div>

			<div className="container relative z-10 mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
						{aboutSectionData.title}
					</h2>
					<p className="mt-6 text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						{aboutSectionData.subtitle}
					</p>
				</div>

				<div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
					{aboutSectionData.features.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<div
								key={index}
								className="flex flex-col rounded-2xl border border-border-color bg-background-light p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-brand-blue/50 hover:shadow-2xl hover:shadow-brand-blue/10 md:p-8"
							>
								<div className="flex-shrink-0">
									<IconComponent />
								</div>
								<div className="mt-4 flex-grow">
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
