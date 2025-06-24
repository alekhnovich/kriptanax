import { HomeHeader } from "../../../home";
import { LandingPage } from "../components";

export const LandingScreen = () => {
	return (
		<div className="flex h-screen w-screen flex-col">
			<HomeHeader />
			<LandingPage />
		</div>
	);
};
