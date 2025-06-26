import { SiBinance } from 'react-icons/si';

export const getExchangeIcon = (exchange: string): React.ReactElement => {
	const lowerCaseExchange = exchange.toLowerCase();

	switch (lowerCaseExchange) {
		case 'binance':
			return <SiBinance className="text-yellow-400" />;
		case 'bybit':
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white ring-2 ring-yellow-400">
					B
				</div>
			);
		case 'mexc':
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
					M
				</div>
			);

		default: {
			const firstLetter = exchange.charAt(0).toUpperCase();
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 font-bold text-white">
					{firstLetter}
				</div>
			);
		}
	}
};
