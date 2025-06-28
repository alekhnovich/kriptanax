export interface ApiKlineData extends Array<string | number> {
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
}

export interface ProfitableTrade {
	buyOpenTime: number;
	sellOpenTime: number;
	buyPrice: number;
	sellPrice: number;
}

export interface ApiResponse {
	exchange: string;
	symbol: string;
	klines: ApiKlineData[];
	profitableTradeOpportunities: ProfitableTrade[];
}

export interface StatsData {
	earnedToday: number;
	earnedWeek: number;
	earnedTotal: number;
	avgProfit30d: number;
}

export interface ApiStatsResponse {
	todayAmount: number;
	weekAmount: number;
	allTimeAmount: number;
	averageGrowthPercent30Days: number;
}
