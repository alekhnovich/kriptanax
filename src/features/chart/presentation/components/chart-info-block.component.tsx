import { getExchangeIcon } from '../../utils';

interface AssetInfoProps {
	exchange: string;
	formattedSymbol: string;
}

export const AssetInfo = ({ exchange, formattedSymbol }: AssetInfoProps) => {
	return (
		<div className="rounded-xl border border-border-color bg-background-light p-6 shadow-lg">
			<h2 className="mb-4 text-lg font-bold text-text-primary opacity-80">Текущий актив</h2>
			<div className="flex items-center gap-4">
				<div className="flex w-8 items-center justify-center text-3xl">
					{getExchangeIcon(exchange)}
				</div>
				<div>
					<h3 className="text-3xl font-bold text-text-primary">{formattedSymbol}</h3>
					<p className="text-sm capitalize text-text-secondary">{exchange} Exchange</p>
				</div>
			</div>
			<div className="mt-4 w-fit rounded-full bg-cyan-900/50 px-3 py-1 text-xs font-semibold text-cyan-300">
				Live Data Feed
			</div>
		</div>
	);
};
