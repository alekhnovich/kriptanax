import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { APP_ROUTES } from '../../../../../core';
import { LandingSections } from '../../../../landing';

interface HeaderNavItemProps {
	navOptions: {
		text: string;
		id: string;
	};
	onNavigate: (sectionId: string) => void;
	onClick?: () => void;
}

export const HeaderNavItem = ({ navOptions, onNavigate, onClick }: HeaderNavItemProps) => {
	const { pathname } = useLocation();
	const [search] = useSearchParams();
	const currentId = search.get('sectionId');

	const style = useMemo(() => {
		const isFirstSectionActive =
			(pathname === APP_ROUTES.landing.route || pathname === '/') &&
			!currentId &&
			navOptions.id === LandingSections.aboutProject.id;

		const isActive = isFirstSectionActive || navOptions.id === currentId;

		return twMerge(
			'w-full cursor-pointer rounded-full px-4 py-2 text-left text-sm font-semibold text-text-secondary transition-all duration-200 hover:bg-white/10 hover:text-text-primary md:w-auto md:text-center',
			isActive ? 'bg-white/10 text-text-primary' : '',
		);
	}, [currentId, pathname, navOptions.id]);

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
		onNavigate(navOptions.id);
	};

	return (
		<p className={style} onClick={handleClick}>
			{navOptions.text}
		</p>
	);
};
