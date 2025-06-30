const FeatureIcon1 = () => (
	<svg className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M13 10V3L4 14h7v7l9-11h-7z"
		/>
	</svg>
);
const FeatureIcon2 = () => (
	<svg className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
		/>
	</svg>
);
const FeatureIcon3 = () => (
	<svg className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
		/>
	</svg>
);

export const aboutSectionData = {
	title: 'Что такое Bitraider?',
	subtitle:
		'Это не просто бот. Это ваш персональный финансовый аналитик на базе ИИ, который работает без перерывов и выходных. Мы взяли сложные технологии и сделали их доступными для вас в один клик в Telegram.',
	features: [
		{
			icon: FeatureIcon1,
			title: 'Прогностическая точность',
			description:
				'Наш AI анализирует терабайты данных — от истории торгов до мировых новостей и трендов в закрытых сообществах — для принятия решений с высочайшей точностью.',
		},
		{
			icon: FeatureIcon2,
			title: 'Ежедневный доход',
			description:
				'Вы получаете прибыль каждый день. Процент динамический (1-3%) и зависит от успешности торгов, что обеспечивает прозрачность и стабильный рост вашего капитала.',
		},
		{
			icon: FeatureIcon3,
			title: 'Доступность и безопасность',
			description:
				'Моментальные выводы средств, интуитивно понятный интерфейс в Telegram и многоуровневая партнерская программа. Ваш доход в ваших руках.',
		},
	],
};
