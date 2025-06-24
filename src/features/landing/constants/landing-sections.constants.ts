import type { HeaderNavItemOptions } from "../types";

export const LandingSections: {
	[key: string]: HeaderNavItemOptions;
} = {
	aboutProject: {
		id: 'about_project_section_id',
		text: 'О проекте',
	},
	aboutUs: {
		id: 'about_us_section_id',
		text: 'О нас',
	},
	incomeCalculator: {
		id: 'income_calculator_section_id',
		text: 'Калькулятор дохода',
	},
	howItWorks: {
		id: 'how_it_works_section_id',
		text: 'Как это работает',
	},
  developmentPlan: {
		id: 'development_plan_section_id',
		text: 'План развития',
	},
  partnershipProgram: {
		id: 'partnership_program_section_id',
		text: 'Партнёрская программа',
	},
  reviews: {
    id: 'reviews_section_id',
    text: 'Отзывы'
  },
	chart: {
		id: 'chart_section_id',
		text: 'График'
	}
};
