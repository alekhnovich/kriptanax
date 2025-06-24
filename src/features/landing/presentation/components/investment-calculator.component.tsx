import { useState } from 'react';
import { AnimatedNumber } from '../../../../core/presentation';

const MIN_INVESTMENT = 20;
const MAX_INVESTMENT = 100000;
const DAILY_PROFIT_RATE = 0.015;

export const InvestmentCalculatorSection = () => {
    const [amount, setAmount] = useState<string>(MIN_INVESTMENT.toString());

    const investmentNumber = Number(amount) || 0;
    const dailyProfit = investmentNumber * DAILY_PROFIT_RATE;
    const monthlyProfit = dailyProfit * 30;

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
        <section className="w-full bg-background-dark py-20 sm:py-28">
            <div className="container mx-auto max-w-screen-lg px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
                        Рассчитайте вашу{' '}
                        <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                            потенциальную прибыль
                        </span>
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-text-secondary">
                        Узнайте, сколько вы можете зарабатывать каждый день и месяц, инвестируя с нашим AI-ботом.
                    </p>
                </div>

                <div className="calculator-glow mx-auto mt-16 max-w-3xl rounded-2xl border border-border-color bg-background-light p-8 shadow-2xl shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <label htmlFor="investment" className="text-lg font-medium text-text-primary">
                            Сумма инвестиций, $
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-secondary">$</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                id="investment"
                                value={amount}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={(e) => e.target.select()}
                                className="w-full rounded-lg border-2 border-border-color bg-background-dark py-3 pl-8 pr-4 text-xl font-bold text-text-primary focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue sm:w-60"
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
                            className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer range-slider"
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
                            <p className="text-4xl font-bold text-text-primary">
                                $<AnimatedNumber value={dailyProfit} />
                            </p>
                        </div>
                        <div className="rounded-lg bg-background-dark p-6">
                            <p className="text-base text-text-secondary">Прибыль в месяц</p>
                            <p className="text-4xl font-bold text-text-primary">
                                $<AnimatedNumber value={monthlyProfit} />
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={handleGoToBot}
                            className="transform rounded-lg bg-brand-blue px-10 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                        >
                            Получить прибыль
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};