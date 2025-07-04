import type { JSX, SVGProps } from 'react';
import { FeatureIcon1, FeatureIcon2, FeatureIcon3 } from './icons';

export interface Feature {
	title: string;
	description: string;
	icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

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
	] as Feature[],
};
