import { LandingSections } from '../../../../landing';
import { HeaderNavItem } from './header-nav-item.component';

export const HeaderNav = () => {
	return (
		<nav className="flex flex-row items-center gap-[30px]">
			<HeaderNavItem
				navOptions={{
					...LandingSections.aboutProject,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.aboutUs,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.incomeCalculator,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.howItWorks,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.developmentPlan,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.partnershipProgram,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.reviews,
				}}
			/>
			<HeaderNavItem
				navOptions={{
					...LandingSections.chart,
				}}
			/>
		</nav>
	);
};
