import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { APP_ROUTES, useAppNavigate } from '../../../../../core';
import { LandingSections } from '../../../../landing';

interface HeaderNavItemProps {
	navOptions: {
		text: string;
		id: string;
	};
}

export const HeaderNavItem = ({ navOptions }: HeaderNavItemProps) => {
	const { pathname } = useLocation();
	const [search] = useSearchParams();
	const navigate = useAppNavigate();
	const currentId = search.get('sectionId');

	const style = useMemo(() => {
		const isActive =
			(pathname.startsWith(APP_ROUTES.landing.route) &&
				navOptions.id === LandingSections.aboutProject.id &&
				!currentId) ||
			navOptions.id === currentId;

		return twMerge(
			'rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition-all duration-200 hover:bg-white/10 hover:text-text-primary',
			isActive ? 'bg-white/10 text-text-primary' : '', 
		);
	}, [currentId, pathname, navOptions.id]);

	const setSection = () => {
		navigate(APP_ROUTES.landing.route, { sectionId: navOptions.id });
	};

	return (
		<p className={style} onClick={setSection}>
			{navOptions.text}
		</p>
	);
};