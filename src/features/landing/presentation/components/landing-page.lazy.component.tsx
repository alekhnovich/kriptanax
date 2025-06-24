import { lazy, Suspense } from 'react';

const ExDefLandingPage = lazy(() => import('./landing-page.component'));

export const LandingPage = () => {
	return (
		<Suspense>
			<ExDefLandingPage />
		</Suspense>
	);
};
