import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomeHeader } from '../../../home';
import { LandingPage } from '../components';

export const LandingScreen = () => {
	const [pageNode, setPageNode] = useState<HTMLDivElement | null>(null);
	const [, setSearch] = useSearchParams();
	const isNavigatingByClick = useRef(false);
	const scrollTimeout = useRef<number | null>(null);

	const pageContentWrapperRef = useCallback((node: HTMLDivElement | null) => {
		if (node !== null) {
			setPageNode(node);
		}
	}, []);

	useEffect(() => {
		if (!pageNode) {
			return;
		}
		const options = {
			root: null,
			rootMargin: '-50% 0px -50% 0px',
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
		const sections = pageNode.querySelectorAll('section[id]');
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
	}, [pageNode, setSearch]);

	const handleNavClick = (sectionId: string) => {
		isNavigatingByClick.current = true;
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		if (scrollTimeout.current) {
			clearTimeout(scrollTimeout.current);
		}
		scrollTimeout.current = window.setTimeout(() => {
			setSearch({ sectionId }, { replace: true });
			isNavigatingByClick.current = false;
		}, 800);
	};

	return (
		<>
			<HomeHeader onNavItemClick={handleNavClick} />
			<LandingPage ref={pageContentWrapperRef} />
		</>
	);
};
