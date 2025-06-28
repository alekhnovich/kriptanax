import {
	createChart,
	type CandlestickData,
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

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {
			handleScroll: false,
			handleScale: false,

			width: chartContainerRef.current.clientWidth,
			height: chartContainerRef.current.clientHeight,
			layout: {
				background: { color: '#1a1e26' },
				textColor: 'rgba(235, 235, 245, 0.8)',
			},
			grid: {
				vertLines: { color: 'rgba(70, 130, 180, 0.1)' },
				horzLines: { color: 'rgba(70, 130, 180, 0.1)' },
			},
			timeScale: {
				borderColor: 'rgba(197, 203, 206, 0.4)',
				timeVisible: true,
				secondsVisible: false,
			},
			crosshair: { mode: 1 },
			rightPriceScale: { borderColor: 'rgba(197, 203, 206, 0.4)' },
		});
		chartRef.current = chart;
		seriesRef.current = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderDownColor: '#ef5350',
			borderUpColor: '#26a69a',
			wickDownColor: '#ef5350',
			wickUpColor: '#26a69a',
		});

		const handleResize = () => {
			if (chartRef.current && chartContainerRef.current) {
				chartRef.current.resize(
					chartContainerRef.current.clientWidth,
					chartContainerRef.current.clientHeight,
				);
				chartRef.current.timeScale().fitContent();
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

	useEffect(() => {
		if (!seriesRef.current || !data) return;

		try {
			seriesRef.current.setData(data);
			seriesRef.current.setMarkers(markers);

			if (data.length > 0) {
				chartRef.current?.timeScale().fitContent();
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных графика:', error);
		}
	}, [data, markers]);

	return <div ref={chartContainerRef} className="h-[600px] w-full" />;
};
