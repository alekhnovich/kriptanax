import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_ROUTES, useAppNavigate } from "../../../../core";
import { LandingSections } from "../../constants";
import { MainSection } from "./main-section.component";
import { AboutSection } from "./about-section.component";
import { InvestmentCalculatorSection } from "./investment-calculator.component";
import { HowItWorksSection } from "./how-it-works.component";
import { RoadmapSection } from "./roadmap-section.component";

const LandingPage = () => {
	const pageContentWrapperRef = useRef<HTMLDivElement>(null);
	const [search, setSearch] = useSearchParams();
	const navigate = useAppNavigate();
	const sectionId = search.get('sectionId');

	useEffect(() => {
		if (sectionId && sectionId !== LandingSections.aboutProject.id) {
			pageContentWrapperRef.current
				?.querySelector(`#${sectionId}`)
				?.scrollIntoView({ behavior: 'smooth' });
		} else if (sectionId === LandingSections.chart.id) {
			setSearch({});
			navigate(`${APP_ROUTES.chart.route}`);
		}
	}, [navigate, sectionId, setSearch]);

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
		</div>
	);
};

export default LandingPage;
