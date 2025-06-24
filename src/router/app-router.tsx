import { Navigate, Route, Routes } from "react-router-dom"
import { LandingScreen } from "../features"
import { APP_ROUTES } from "../core"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={APP_ROUTES.landing.route} replace />} />
			<Route path={APP_ROUTES.landing.route} element={<LandingScreen />} />
      {/* <Route path={APP_ROUTES.chart.route} element={<ChartScreen />} /> */}
    </Routes>
  )
}