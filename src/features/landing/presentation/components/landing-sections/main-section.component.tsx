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
			className="w-full bg-background-dark pt-24 lg:pt-[140px]"
		>
			<div className="container mx-auto mb-[30px] flex max-w-6xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
				<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
					<div className="mb-4 flex items-center gap-4">
						<img src="/logo.svg" alt="Bitraider Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
						<h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Bitraider</h2>
					</div>
					<h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-7xl">
						Искусственный интеллект для <br className="hidden sm:block" />
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							приумножения
						</span>{' '}
						вашего капитала
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						Наш торговый AI-бот в Telegram анализирует тысячи источников данных 24/7, чтобы вы
						получали стабильный доход на автопилоте.
					</p>
					<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
						<button
							onClick={handleGoToBot}
							className="transform rounded-lg bg-brand-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50 md:px-8 md:py-4 md:text-lg"
						>
							Получить прибыль
						</button>
						<button
							onClick={handleGoToChart}
							className="flex items-center gap-3 rounded-lg border-2 border-border-color bg-background-light px-6 py-3 text-base font-semibold text-text-primary transition-colors duration-200 hover:border-gray-600 hover:bg-gray-800 focus:outline-none md:px-6 md:py-4 md:text-lg"
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
					<div className="h-[300px] w-[300px] cursor-grab active:cursor-grabbing md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
						<NeuralSphereAnimation />
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};
