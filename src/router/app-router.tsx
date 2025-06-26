import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from '../core';
import { LandingScreen } from '../features';
import { LiveMonitorPage } from '../features/chart/presentation/screens/live-monitor.screen';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={APP_ROUTES.landing.route} replace />} />
			<Route path={APP_ROUTES.landing.route} element={<LandingScreen />} />
			<Route path={APP_ROUTES.chart.route} element={<LiveMonitorPage />} />
		</Routes>
	);
};
