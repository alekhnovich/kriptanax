import { forwardRef, lazy, Suspense } from 'react';

const ExDefLandingPage = lazy(() => import('./landing-page.component'));

export const LandingPage = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ExDefLandingPage {...props} ref={ref} />
		</Suspense>
	);
});
