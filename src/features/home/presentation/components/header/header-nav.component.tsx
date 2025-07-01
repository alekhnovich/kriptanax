import { LandingSections } from '../../../../landing';
import { HeaderNavItem } from './header-nav-item.component';

interface HeaderNavProps {
	onNavItemClick: (sectionId: string) => void;
	onItemClick?: () => void;
}

export const HeaderNav = ({ onNavItemClick, onItemClick }: HeaderNavProps) => {
	const navOptions = [
		LandingSections.aboutProject,
		LandingSections.aboutUs,
		LandingSections.incomeCalculator,
		LandingSections.howItWorks,
		LandingSections.developmentPlan,
		LandingSections.partnershipProgram,
		LandingSections.faq,
	];

	return (
		<nav className="flex w-full flex-col items-start gap-1 md:w-auto md:flex-row md:items-center md:gap-1">
			{navOptions.map((options) => (
				<HeaderNavItem
					key={options.id}
					navOptions={options}
					onNavigate={onNavItemClick}
					onClick={onItemClick}
				/>
			))}
		</nav>
	);
};
