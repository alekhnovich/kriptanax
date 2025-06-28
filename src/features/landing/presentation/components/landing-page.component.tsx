import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	AboutSection,
	FaqSection,
	HowItWorksSection,
	InvestmentCalculatorSection,
	MainSection,
	PartnershipSection,
	RoadmapSection,
} from './landing-sections';

const LandingPage = () => {
	const pageContentWrapperRef = useRef<HTMLDivElement>(null);
	const [, setSearch] = useSearchParams();

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '-40% 0px -40% 0px',
			threshold: 0,
		};
		const observerCallback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setSearch({ sectionId: entry.target.id }, { replace: true });
				}
			});
		};
		const observer = new IntersectionObserver(observerCallback, options);
		const sections = pageContentWrapperRef.current?.querySelectorAll('section[id]');
		if (sections) {
			sections.forEach((section) => observer.observe(section));
		}
		return () => {
			if (sections) {
				sections.forEach((section) => observer.unobserve(section));
			}
			observer.disconnect();
		};
	}, [setSearch]);

	return (
		<div
			ref={pageContentWrapperRef}
			className="flex w-full flex-col items-center bg-background-dark pt-[23px]"
		>
			<MainSection />
			<AboutSection />
			<InvestmentCalculatorSection />
			<HowItWorksSection />
			<RoadmapSection />
			<PartnershipSection />
			<FaqSection />
		</div>
	);
};

export default LandingPage;
