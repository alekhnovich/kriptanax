import { useMemo, useState } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { AnimatedNumber } from '../../../../../core/presentation';
import { AnimatedSection } from '../../../../home';
import { LandingSections } from '../../../constants';

const MIN_INVESTMENT = 20;
const MAX_INVESTMENT = 100000;
const DAILY_PROFIT_RATE = 0.015;

type InterestType = 'simple' | 'compound';
type ValueType = number;
type NameType = 'simple' | 'compound';

interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		name: NameType;
		value: ValueType;
		color: string;
	}>;
	label?: string | number;
}

export const InvestmentCalculatorSection = () => {
	const [amount, setAmount] = useState('1000');
	const [interestType, setInterestType] = useState<InterestType>('compound');

	const investmentNumber = useMemo(() => {
		const num = Number(amount);
		if (isNaN(num)) return 0;
		if (num < MIN_INVESTMENT) return MIN_INVESTMENT;
		if (num > MAX_INVESTMENT) return MAX_INVESTMENT;
		return num;
	}, [amount]);

	const calculations = useMemo(() => {
		const dailyProfit = investmentNumber * DAILY_PROFIT_RATE;
		let totalCompound = investmentNumber;
		const chartData = Array.from({ length: 31 }, (_, i) => {
			if (i > 0) {
				totalCompound *= 1 + DAILY_PROFIT_RATE;
			}
			const simpleProfit = investmentNumber * DAILY_PROFIT_RATE * i;
			return {
				day: i,
				simple: investmentNumber + simpleProfit,
				compound: totalCompound,
			};
		});
		const monthlyProfitSimple = dailyProfit * 30;
		const monthlyProfitCompound = totalCompound - investmentNumber;
		return {
			dailyProfit,
			monthlyProfit: interestType === 'simple' ? monthlyProfitSimple : monthlyProfitCompound,
			chartData,
		};
	}, [investmentNumber, interestType]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setAmount(value);
		}
	};
	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};
	const handleInputBlur = () => {
		setAmount(investmentNumber.toString());
	};
	const handleGoToBot = () => {
		window.open('https://t.me/your_bot_username', '_blank');
	};

	const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div className="rounded-lg border border-border-color bg-background-light/80 p-3 text-sm backdrop-blur-sm">
					<p className="font-bold text-text-primary">{`День ${label}`}</p>
					{payload.map((p) => (
						<p key={p.name} style={{ color: p.color }}>
							{`${p.name === 'compound' ? 'Сложный %' : 'Простой %'}: $${p.value.toFixed(2)}`}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<AnimatedSection
			id={LandingSections.incomeCalculator.id}
			className="w-full overflow-hidden bg-background-dark py-16 sm:py-24"
		>
			<div className="container mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
						Рассчитайте вашу{' '}
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							потенциальную прибыль
						</span>
					</h2>
					<p className="mt-6 text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						Узнайте, сколько вы можете зарабатывать каждый день и месяц, инвестируя с нашим
						AI-ботом. Используйте интерактивный калькулятор, чтобы увидеть магию сложного процента в
						действии.
					</p>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
					<div className="flex flex-col rounded-2xl border border-border-color bg-background-light p-6 shadow-2xl shadow-black/20 lg:col-span-2">
						<div>
							<label
								htmlFor="investment"
								className="text-base font-medium text-text-primary sm:text-lg"
							>
								Сумма инвестиций
							</label>
							<div className="relative mt-2">
								<span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-text-secondary">
									$
								</span>
								<input
									type="text"
									inputMode="numeric"
									id="investment"
									value={amount}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
									className="w-full rounded-lg border-2 border-border-color bg-background-dark py-3 pl-10 pr-4 text-2xl font-bold text-text-primary transition-colors focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
								/>
							</div>
						</div>

						<div className="mt-6">
							<input
								type="range"
								min={MIN_INVESTMENT}
								max={MAX_INVESTMENT}
								step="10"
								value={investmentNumber}
								onChange={handleSliderChange}
								className="range-slider w-full cursor-pointer"
							/>
							<div className="mt-2 flex justify-between text-xs text-text-secondary">
								<span>${MIN_INVESTMENT}</span>
								<span>${MAX_INVESTMENT.toLocaleString('en-US')}</span>
							</div>
						</div>

						<div className="mt-8">
							<div className="flex items-center gap-2">
								<span className="text-base font-medium text-text-primary">Режим расчета</span>
								<div className="group relative">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5 cursor-pointer text-text-secondary"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
											clipRule="evenodd"
										/>
									</svg>
									<div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 transform rounded-lg bg-gray-700 p-3 text-center text-xs text-white opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
										Сложный процент означает, что ваша ежедневная прибыль реинвестируется, и на
										следующий день процент начисляется на увеличенную сумму. Это ускоряет рост
										вашего капитала.
									</div>
								</div>
							</div>
							<div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-background-dark p-1">
								<button
									onClick={() => setInterestType('simple')}
									className={`rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300 ${
										interestType === 'simple'
											? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30'
											: 'text-text-secondary hover:bg-border-color'
									}`}
								>
									Простой %
								</button>
								<button
									onClick={() => setInterestType('compound')}
									className={`rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300 ${
										interestType === 'compound'
											? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30'
											: 'text-text-secondary hover:bg-border-color'
									}`}
								>
									Сложный %
								</button>
							</div>
						</div>
						<hr className="my-8 border-border-color" />
						<div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
							<div className="rounded-lg bg-background-dark p-4">
								<p className="text-sm text-text-secondary">Прибыль в день</p>
								<p className="text-2xl font-bold text-text-primary">
									$<AnimatedNumber value={calculations.dailyProfit} />
								</p>
							</div>
							<div className="rounded-lg bg-background-dark p-4">
								<p className="text-sm text-text-secondary">Прибыль в месяц</p>
								<p className="text-2xl font-bold text-text-primary">
									$<AnimatedNumber value={calculations.monthlyProfit} />
								</p>
							</div>
						</div>
						<div className="mt-auto pt-8 text-center">
							<button
								onClick={handleGoToBot}
								className="w-full transform rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-blue/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-purple/40 focus:outline-none focus:ring-4 focus:ring-brand-blue/50"
							>
								Получить прибыль
							</button>
						</div>
					</div>

					<div className="calculator-glow relative min-h-[400px] rounded-2xl border border-border-color bg-background-light p-4 shadow-2xl shadow-black/20 lg:col-span-3">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={calculations.chartData}
								margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
								<XAxis
									dataKey="day"
									tick={{ fill: '#888', fontSize: 12 }}
									stroke="#444"
									tickFormatter={(tick) => (tick === 0 ? 'Старт' : `${tick}`)}
								/>
								<YAxis
									tick={{ fill: '#888', fontSize: 12 }}
									stroke="#444"
									tickFormatter={(value) => `$${Number(value).toLocaleString('en-US')}`}
									domain={['dataMin', 'dataMax']}
								/>
								<Tooltip
									content={<CustomTooltip />}
									cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '3 3' }}
								/>
								<Line
									name="compound"
									type="monotone"
									dataKey="compound"
									stroke="#a78bfa"
									strokeWidth={3}
									dot={false}
									activeDot={{ r: 6 }}
									strokeOpacity={interestType === 'compound' ? 1 : 0.3}
									style={{ transition: 'stroke-opacity 0.3s' }}
								/>
								<Line
									name="simple"
									type="monotone"
									dataKey="simple"
									stroke="#60a5fa"
									strokeWidth={3}
									dot={false}
									activeDot={{ r: 6 }}
									strokeOpacity={interestType === 'simple' ? 1 : 0.3}
									style={{ transition: 'stroke-opacity 0.3s' }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};
