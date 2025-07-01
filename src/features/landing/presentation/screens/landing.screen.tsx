import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomeHeader } from '../../../home';
import { LandingPage } from '../components';

export const LandingScreen = () => {
	const pageContentWrapperRef = useRef<HTMLDivElement | null>(null);
	const [, setSearch] = useSearchParams();
	const isNavigatingByClick = useRef(false);
	const scrollTimeout = useRef<number | null>(null);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '-40% 0px -40% 0px',
			threshold: 0,
		};
		const observerCallback: IntersectionObserverCallback = (entries) => {
			if (isNavigatingByClick.current) {
				return;
			}
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setSearch({ sectionId: entry.target.id }, { replace: true });
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, options);
		const node = pageContentWrapperRef.current;
		const sections = node?.querySelectorAll('section[id]');
		if (sections) {
			sections.forEach((section) => observer.observe(section));
		}
		return () => {
			if (sections) {
				sections.forEach((section) => observer.unobserve(section));
			}
			observer.disconnect();
			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current);
			}
		};
	}, [pageContentWrapperRef.current, setSearch]);

	const handleNavClick = (sectionId: string) => {
		isNavigatingByClick.current = true;
		const element = document.getElementById(sectionId);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			setSearch({ sectionId }, { replace: true });
		}

		if (scrollTimeout.current) {
			clearTimeout(scrollTimeout.current);
		}

		scrollTimeout.current = window.setTimeout(() => {
			isNavigatingByClick.current = false;
		}, 1000);
	};

	return (
		<>
			<HomeHeader onNavItemClick={handleNavClick} />
			<LandingPage ref={pageContentWrapperRef} />
		</>
	);
};
