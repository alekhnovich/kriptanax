import { LandingSections } from '../../../../landing';
import { HeaderNavItem } from './header-nav-item.component';

interface HeaderNavProps {
	onNavItemClick?: () => void;
}

export const HeaderNav = ({ onNavItemClick }: HeaderNavProps) => {
	return (
		<nav className="flex w-full flex-col items-start gap-2 md:w-auto md:flex-row md:items-center md:gap-2">
			<HeaderNavItem navOptions={LandingSections.aboutProject} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.aboutUs} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.incomeCalculator} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.howItWorks} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.developmentPlan} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.partnershipProgram} onClick={onNavItemClick} />
			<HeaderNavItem navOptions={LandingSections.faq} onClick={onNavItemClick} />
		</nav>
	);
};
