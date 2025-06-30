import { getExchangeIcon } from '../../utils';

interface AssetInfoProps {
	exchange: string;
	formattedSymbol: string;
}

export const AssetInfo = ({ exchange, formattedSymbol }: AssetInfoProps) => {
	return (
		<div className="rounded-xl border border-border-color bg-background-light p-4 shadow-lg sm:p-6">
			<h2 className="mb-4 text-base font-bold text-text-primary opacity-80 sm:text-lg">
				Текущий актив
			</h2>
			<div className="flex items-center gap-3 sm:gap-4">
				<div className="flex w-8 items-center justify-center text-2xl sm:text-3xl">
					{getExchangeIcon(exchange)}
				</div>
				<div>
					<h3 className="text-2xl font-bold text-text-primary sm:text-3xl">{formattedSymbol}</h3>
					<p className="text-sm capitalize text-text-secondary">{exchange} Exchange</p>
				</div>
			</div>
			<div className="mt-4 w-fit rounded-full bg-cyan-900/50 px-3 py-1 text-xs font-semibold text-cyan-300">
				Live Data Feed
			</div>
		</div>
	);
};
