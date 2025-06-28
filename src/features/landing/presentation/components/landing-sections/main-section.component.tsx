import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../../../core';
import { AnimatedSection } from '../../../../home';
import { LandingSections } from '../../../constants';
import { NeuralSphereAnimation } from '../main-animation';

export const MainSection = () => {
	const navigate = useNavigate();

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};
	const handleGoToChart = () => {
		navigate(APP_ROUTES.chart.route);
	};

	return (
		<AnimatedSection
			id={LandingSections.aboutProject.id}
			className="w-full bg-background-dark pt-[90px]"
		>
			<div className="container mx-auto flex max-w-6xl flex-col items-center gap-[30px] px-4 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
				<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
					<div className="mb-4 flex items-center gap-4">
						<div className="h-14 w-14 rounded-lg bg-background-light"></div>
						<h2 className="text-3xl font-bold text-text-primary">Bitraider</h2>
					</div>
					<h1 className="text-6xl font-extrabold tracking-tight text-text-primary">
						Искусственный интеллект для <br />
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							приумножения <br />
						</span>{' '}
						вашего капитала
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
						Наш торговый AI-бот в Telegram анализирует тысячи источников данных 24/7, чтобы вы
						получали стабильный доход на автопилоте.
					</p>
					<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
						<button
							onClick={handleGoToBot}
							className="transform rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
						>
							Получить прибыль
						</button>
						<button
							onClick={handleGoToChart}
							className="flex items-center gap-3 rounded-lg border-2 border-border-color bg-background-light px-6 py-4 text-lg font-semibold text-text-primary transition-colors duration-200 hover:border-gray-600 hover:bg-gray-800 focus:outline-none"
						>
							<span className="relative flex h-3 w-3">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
								<span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
							</span>
							Live Monitor
						</button>
					</div>
				</div>

				<div className="flex justify-center">
					<div className="h-[500px] w-[500px] cursor-grab active:cursor-grabbing">
						<NeuralSphereAnimation />
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};
