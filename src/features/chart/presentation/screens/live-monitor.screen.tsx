import { motion, type Variants } from 'framer-motion';
import type { UTCTimestamp } from 'lightweight-charts';
import { useEffect, useState } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { AssetInfo, StatCard, TradingChart, type ChartData, type MarkerData } from '../components';

interface ApiKlineData extends Array<string | number> {
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
}

interface ProfitableTrade {
	buyOpenTime: number;
	sellOpenTime: number;
	buyPrice: number;
	sellPrice: number;
}

interface ApiResponse {
	exchange: string;
	symbol: string;
	klines: ApiKlineData[];
	profitableTradeOpportunities: ProfitableTrade[];
}

interface StatsData {
	earnedToday: number;
	earnedWeek: number;
	earnedTotal: number;
	avgProfit30d: number;
}

export const LiveMonitorPage = () => {
	const [exchange, setExchange] = useState<string>('');
	const [symbol, setSymbol] = useState<string>('');
	const [chartData, setChartData] = useState<ChartData[]>([]);
	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<StatsData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}?topTradesCount=3`;
				const response = await fetch(apiUrl);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const apiResponse: ApiResponse = await response.json();
				setExchange(apiResponse.exchange);
				setSymbol(apiResponse.symbol);

				const newChartData: ChartData[] = apiResponse.klines
					.map((kline) => ({
						time: (kline[0] / 1000) as UTCTimestamp,
						open: kline[1] as number,
						high: kline[2] as number,
						low: kline[3] as number,
						close: kline[4] as number,
					}))
					.filter((item) => !isNaN(item.time))
					.sort((a, b) => a.time - b.time);

				const newMarkers: MarkerData[] = apiResponse.profitableTradeOpportunities
					.flatMap((trade) => [
						{
							time: (trade.buyOpenTime / 1000) as UTCTimestamp,
							position: 'belowBar' as const,
							color: '#26a69a',
							shape: 'arrowUp' as const,
							text: `Покупка @ ${trade.buyPrice.toFixed(2)}`,
						},
						{
							time: (trade.sellOpenTime / 1000) as UTCTimestamp,
							position: 'aboveBar' as const,
							color: '#ef5350',
							shape: 'arrowDown' as const,
							text: `Продажа @ ${trade.sellPrice.toFixed(2)}`,
						},
					])
					.sort((a, b) => a.time - b.time);

				setChartData(newChartData);
				setMarkers(newMarkers);

				if (!stats) {
					setStats({
						earnedToday: 4820.51,
						earnedWeek: 31560.89,
						earnedTotal: 987450.23,
						avgProfit30d: 1.87,
					});
				}
			} catch (error) {
				console.error('Ошибка при получении данных с API:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
		const intervalId = setInterval(fetchData, 30000);
		return () => clearInterval(intervalId);
	}, []);

	const formatSymbol = (s: string): string => {
		if (!s || s.length <= 4) return s.toUpperCase();
		const quoteCurrency = 'USDT';
		if (s.endsWith(quoteCurrency)) {
			const baseCurrency = s.substring(0, s.length - quoteCurrency.length);
			return `${baseCurrency} / ${quoteCurrency}`;
		}
		return s;
	};
	const formattedSymbol = formatSymbol(symbol);

	const containerVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number = 1) => ({
			opacity: 1,
			y: 0,
			transition: { type: 'spring', duration: 0.8, delay: i * 0.15 },
		}),
	};

	const statsListVariants: Variants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-background-dark p-4 text-text-primary sm:p-6 lg:p-8">
			<div className="background-glow-container"></div>
			<div className="container relative z-10 mx-auto max-w-screen-2xl">
				<motion.header
					className="mb-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					custom={1}
				>
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">AI Live Monitor</h1>
					<p className="mt-2 text-lg text-text-secondary">
						Данные обновляются каждые 30 секунд, демонстрируя случайный актив в работе.
					</p>
				</motion.header>

				<div className="flex flex-col gap-8 lg:flex-row">
					<motion.div
						className="min-h-[640px] flex-[3] rounded-xl border border-border-color bg-background-light p-2 shadow-2xl shadow-black/30 sm:p-4"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						custom={2}
					>
						{isLoading ? (
							<div className="flex h-full items-center justify-center">
								<p className="animate-pulse text-xl text-text-secondary">
									Загрузка данных графика...
								</p>
							</div>
						) : (
							<TradingChart data={chartData} markers={markers} />
						)}
					</motion.div>

					<motion.aside
						className="flex flex-[1] flex-col gap-6"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						custom={3}
					>
						{isLoading ? (
							<div className="h-44 animate-pulse rounded-xl border border-border-color bg-background-light"></div>
						) : (
							<AssetInfo exchange={exchange} formattedSymbol={formattedSymbol} />
						)}

						<div className="rounded-xl border border-border-color bg-background-light p-6 shadow-lg">
							<h2 className="mb-6 text-2xl font-bold text-text-primary">Общая статистика</h2>

							{isLoading || !stats ? (
								<div className="space-y-4">
									{[...Array(4)].map((_, i) => (
										<div key={i} className="h-16 animate-pulse rounded-lg bg-gray-700/50"></div>
									))}
								</div>
							) : (
								<motion.div
									className="space-y-4"
									variants={statsListVariants}
									initial="hidden"
									animate="visible"
								>
									<motion.div variants={containerVariants}>
										<StatCard
											title="Заработано за сегодня"
											value={`$${stats.earnedToday.toLocaleString('ru-RU')}`}
											icon={<FaArrowTrendUp className="text-green-400" />}
										/>
									</motion.div>
									<motion.div variants={containerVariants}>
										<StatCard
											title="Заработано за неделю"
											value={`$${stats.earnedWeek.toLocaleString('ru-RU')}`}
											icon={<FaArrowTrendUp className="text-green-400" />}
										/>
									</motion.div>
									<motion.div variants={containerVariants}>
										<StatCard
											title="Заработано за все время"
											value={`$${stats.earnedTotal.toLocaleString('ru-RU')}`}
											icon={<FaArrowTrendUp className="text-green-400" />}
										/>
									</motion.div>
									<motion.div variants={containerVariants}>
										<StatCard
											title="Средняя прибыль за 30 дней"
											value={`${stats.avgProfit30d}%`}
											note="динамический показатель"
										/>
									</motion.div>
								</motion.div>
							)}
						</div>
					</motion.aside>
				</div>
			</div>
		</main>
	);
};
