import { motion, type Variants } from 'framer-motion';
import type { UTCTimestamp } from 'lightweight-charts';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowTrendUp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../core';
import type { ApiResponse, ApiStatsResponse, StatsData } from '../../types';
import { AssetInfo, StatCard, TradingChart, type ChartData, type MarkerData } from '../components';

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
				const chartApiUrl = `${import.meta.env.VITE_API_ENDPOINT}?topTradesCount=3`;
				const statsApiUrl = '/api/v1/statistics/summary';

				const [chartResponse, statsResponse] = await Promise.all([
					fetch(chartApiUrl),
					fetch(statsApiUrl),
				]);

				if (!chartResponse.ok) {
					throw new Error(`Chart API error! status: ${chartResponse.status}`);
				}
				if (!statsResponse.ok) {
					throw new Error(`Stats API error! status: ${statsResponse.status}`);
				}

				const [apiResponse, apiStats]: [ApiResponse, ApiStatsResponse] = await Promise.all([
					chartResponse.json(),
					statsResponse.json(),
				]);

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

				const newStats: StatsData = {
					earnedToday: apiStats.todayAmount,
					earnedWeek: apiStats.weekAmount,
					earnedTotal: apiStats.allTimeAmount,
					avgProfit30d: apiStats.averageGrowthPercent30Days,
				};
				setStats(newStats);
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
		<main className="relative min-h-screen w-full overflow-y-auto bg-background-dark p-4 text-text-primary sm:p-6 lg:p-8">
			<div className="background-glow-container"></div>
			<div className="container relative z-10 mx-auto max-w-screen-2xl">
				<motion.div variants={containerVariants} initial="hidden" animate="visible" custom={0}>
					<Link
						to={APP_ROUTES.landing.route}
						className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
					>
						<FaArrowLeft />
						<span>Назад на главную</span>
					</Link>
				</motion.div>
				<motion.header
					className="mb-6 sm:mb-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					custom={1}
				>
					<h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
						Bitraider Live Monitor
					</h1>
					<p className="mt-2 text-base text-text-secondary lg:text-lg">
						Данные обновляются каждые 30 секунд, демонстрируя случайный актив в работе.
					</p>
				</motion.header>

				<div className="flex flex-col gap-8 lg:flex-row">
					<motion.div
						className="min-h-[450px] rounded-xl border border-border-color bg-background-light p-2 shadow-2xl shadow-black/30 sm:p-4 lg:min-h-[640px] lg:flex-[3]"
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
						className="flex flex-col gap-6 lg:flex-[1]"
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

						<div className="rounded-xl border border-border-color bg-background-light p-4 shadow-lg sm:p-6">
							<h2 className="mb-4 text-xl font-bold text-text-primary sm:mb-6 sm:text-2xl">
								Общая статистика
							</h2>

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
