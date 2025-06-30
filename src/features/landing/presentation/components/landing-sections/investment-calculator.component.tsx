import { useState } from 'react';
import { AnimatedNumber } from '../../../../../core/presentation';
import { AnimatedSection } from '../../../../home';
import { LandingSections } from '../../../constants';

const MIN_INVESTMENT = 20;
const MAX_INVESTMENT = 100000;
const DAILY_PROFIT_RATE = 0.015;

export const InvestmentCalculatorSection = () => {
	const [amount, setAmount] = useState(MIN_INVESTMENT.toString());
	const [withCompoundInterest, setWithCompoundInterest] = useState(false);

	const investmentNumber = Number(amount) || 0;
	const dailyProfit = investmentNumber * DAILY_PROFIT_RATE;

	let monthlyProfit;

	if (withCompoundInterest) {
		let totalAmount = investmentNumber;
		for (let i = 0; i < 30; i++) {
			totalAmount *= 1 + DAILY_PROFIT_RATE;
		}
		monthlyProfit = totalAmount - investmentNumber;
	} else {
		monthlyProfit = dailyProfit * 30;
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d*\.?\d*$/.test(value)) {
			setAmount(value);
		}
	};

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const handleInputBlur = () => {
		let value = investmentNumber;
		if (value < MIN_INVESTMENT) {
			value = MIN_INVESTMENT;
		}
		if (value > MAX_INVESTMENT) {
			value = MAX_INVESTMENT;
		}
		setAmount(value.toString());
	};

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	return (
		<AnimatedSection
			id={LandingSections.incomeCalculator.id}
			className="w-full bg-background-dark py-16 sm:py-24"
		>
			<div className="container mx-auto max-w-screen-lg px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
						Рассчитайте вашу{' '}
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							потенциальную прибыль
						</span>
					</h2>
					<p className="mt-6 text-base leading-7 text-text-secondary lg:text-lg lg:leading-8">
						Узнайте, сколько вы можете зарабатывать каждый день и месяц, инвестируя с нашим
						AI-ботом.
					</p>
				</div>

				<div className="calculator-glow mx-auto mt-16 max-w-3xl rounded-2xl border border-border-color bg-background-light p-6 shadow-2xl shadow-black/20 sm:p-8">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<label
							htmlFor="investment"
							className="text-base font-medium text-text-primary sm:text-lg"
						>
							Сумма инвестиций, $
						</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-secondary">
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
								className="w-full rounded-lg border-2 border-border-color bg-background-dark py-3 pl-8 pr-4 text-xl font-bold text-text-primary focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue sm:w-60"
							/>
						</div>
					</div>

					<div className="mt-5 flex items-center justify-start gap-4">
						<div className="group relative flex items-center gap-2">
							<label htmlFor="compound-toggle" className="text-sm font-medium text-text-primary">
								Учитывать сложный процент
							</label>
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
							<div className="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 transform rounded-lg bg-gray-700 p-3 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:w-64">
								Сложный процент означает, что ваша ежедневная прибыль реинвестируется, и на
								следующий день процент начисляется на увеличенную сумму. Это ускоряет рост вашего
								капитала.
							</div>
						</div>

						<button
							id="compound-toggle"
							onClick={() => setWithCompoundInterest(!withCompoundInterest)}
							className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-background-light ${
								withCompoundInterest ? 'bg-brand-blue' : 'bg-gray-500'
							}`}
						>
							<span
								aria-hidden="true"
								className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
									withCompoundInterest ? 'translate-x-5' : 'translate-x-0'
								}`}
							/>
						</button>
					</div>

					<div className="mt-6">
						<input
							type="range"
							min={MIN_INVESTMENT}
							max={MAX_INVESTMENT}
							step="10"
							value={investmentNumber}
							onChange={handleSliderChange}
							className="range-slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-color"
						/>
						<div className="mt-2 flex justify-between text-sm text-text-secondary">
							<span>${MIN_INVESTMENT}</span>
							<span>${MAX_INVESTMENT.toLocaleString('en-US')}</span>
						</div>
					</div>

					<hr className="my-8 border-border-color" />

					<div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2">
						<div className="rounded-lg bg-background-dark p-6">
							<p className="text-base text-text-secondary">Прибыль в день</p>
							<p className="text-3xl font-bold text-text-primary sm:text-4xl">
								$<AnimatedNumber value={dailyProfit} />
							</p>
						</div>
						<div className="rounded-lg bg-background-dark p-6">
							<p className="text-base text-text-secondary">Прибыль в месяц</p>
							<p className="text-3xl font-bold text-text-primary sm:text-4xl">
								$<AnimatedNumber value={monthlyProfit} />
							</p>
						</div>
					</div>

					<div className="mt-10 text-center">
						<button
							onClick={handleGoToBot}
							className="transform rounded-lg bg-brand-blue px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50 sm:px-10 sm:py-4 sm:text-lg"
						>
							Получить прибыль
						</button>
					</div>
				</div>
			</div>
		</AnimatedSection>
	);
};
