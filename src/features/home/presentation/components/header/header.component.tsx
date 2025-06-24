import { HeaderNav } from './header-nav.component';

export const HomeHeader = () => {
	return (
		<div className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
			<div className="rounded-full bg-gradient-to-r from-brand-blue to-brand-purple p-px shadow-lg">
				<header className="flex w-full items-center justify-between rounded-full bg-background-light/80 p-2 backdrop-blur-xl">
					<div className="mr-4 flex items-center gap-3 pl-2">
						<div className="h-10 w-10 rounded-lg bg-background-dark"></div>
						<span className="text-xl font-bold text-text-primary">Название</span>
					</div>

					<div className="hidden md:flex">
						<HeaderNav />
					</div>
				</header>
			</div>
		</div>
	);
};
