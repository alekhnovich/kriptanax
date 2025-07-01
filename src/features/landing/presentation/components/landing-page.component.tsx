import { forwardRef } from 'react';
import {
	AboutSection,
	FaqSection,
	HowItWorksSection,
	InvestmentCalculatorSection,
	MainSection,
	PartnershipSection,
	RoadmapSection,
} from './landing-sections';

const LandingPage = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div ref={ref} className="flex w-full flex-col items-center bg-background-dark pt-[23px]">
			<MainSection />
			<AboutSection />
			<InvestmentCalculatorSection />
			<HowItWorksSection />
			<RoadmapSection />
			<PartnershipSection />
			<FaqSection />
		</div>
	);
});

export default LandingPage;
