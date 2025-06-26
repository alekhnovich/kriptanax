import {
	type CandlestickData,
	createChart,
	type IChartApi,
	type ISeriesApi,
	type SeriesMarker,
	type Time,
	type UTCTimestamp,
} from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export type ChartData = CandlestickData<UTCTimestamp>;
export type MarkerData = SeriesMarker<Time>;

interface TradingChartProps {
	data: ChartData[];
	markers: MarkerData[];
}

export const TradingChart = ({ data, markers }: TradingChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

	// Эффект для создания и уничтожения графика. Выполняется один раз.
	useEffect(() => {
		if (!chartContainerRef.current) return;

		chartRef.current = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 600,
			layout: {
				background: { color: '#1a1e26' },
				textColor: 'rgba(235, 235, 245, 0.8)',
			},
			grid: {
				vertLines: { color: 'rgba(70, 130, 180, 0.1)' },
				horzLines: { color: 'rgba(70, 130, 180, 0.1)' },
			},
			crosshair: { mode: 1 },
			rightPriceScale: { borderColor: 'rgba(197, 203, 206, 0.4)' },
			timeScale: {
				borderColor: 'rgba(197, 203, 206, 0.4)',
				timeVisible: true,
				secondsVisible: false,
			},
		});

		seriesRef.current = chartRef.current.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderDownColor: '#ef5350',
			borderUpColor: '#26a69a',
			wickDownColor: '#ef5350',
			wickUpColor: '#26a69a',
		});

		const handleResize = () => {
			if (chartRef.current && chartContainerRef.current) {
				chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
			}
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (chartRef.current) {
				chartRef.current.remove();
			}
		};
	}, []);

	// Эффект для обновления данных на графике.
	useEffect(() => {
		// Проверяем, что серия создана и данные не пустые.
		if (!seriesRef.current || !data) return;

		// ИСПРАВЛЕНИЕ: Добавлен блок try...catch для защиты от сбоя приложения
		try {
			seriesRef.current.setData(data);
			seriesRef.current.setMarkers(markers);

			// Автомасштабирование только если есть данные
			if (data.length > 0) {
				chartRef.current?.timeScale().fitContent();
			}
		} catch (error) {
			console.error(
				'Ошибка при обновлении данных графика (возможно, они не отсортированы):',
				error,
			);
			console.error('Данные, которые вызвали ошибку:', data);
		}
	}, [data, markers]);

	return <div ref={chartContainerRef} className="h-[600px] w-full" />;
};
