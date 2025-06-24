import { LandingSections } from '../../constants';

export const MainSection = () => {
	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	return (
		<section
			id={LandingSections.aboutProject.id}
			className="section-anchor w-full border-b border-border-color bg-background-dark pt-32 sm:pt-40"
		>
			<div className="container mx-auto flex max-w-screen-xl flex-col items-center gap-16 px-4 lg:flex-row lg:gap-8">
				<div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
					<div className="mb-4 flex items-center gap-4">
						<div className="h-14 w-14 rounded-lg bg-background-light">Логотип</div>
						<h2 className="text-3xl font-bold text-text-primary">Название проекта</h2>
					</div>

					<h1 className="text-5xl font-extrabold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
						Искусственный интеллект для{' '}
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							приумножения
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
						<button className="flex items-center gap-3 rounded-lg border-2 border-border-color bg-background-light px-6 py-4 text-lg font-semibold text-text-primary transition-colors duration-200 hover:border-gray-600 hover:bg-gray-800 focus:outline-none">
							<span className="relative flex h-3 w-3">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
								<span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
							</span>
							Live Monitor
						</button>
					</div>
				</div>

				<div className="flex flex-1 justify-center lg:justify-end">
					<div className="relative h-96 w-full max-w-md rounded-xl bg-background-light shadow-2xl shadow-black/30">
						<div className="absolute inset-0 flex items-center justify-center">
							<p className="text-2xl font-semibold text-text-secondary">Здесь будет картинка</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
