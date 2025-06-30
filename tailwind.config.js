import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			colors: {
				'background-dark': '#0D1117',
				'background-light': '#161B22',
				'text-primary': '#E6EDF3',
				'text-secondary': '#8B949E',
				'text-link': '#58A6FF',
				'brand-blue': '#388BFD',
				'brand-purple': '#A371F7',
				'border-color': '#30363D',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-none': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
				},
				'.scrollbar-none::-webkit-scrollbar': {
					display: 'none',
				},
			});
		}),
	],
};
