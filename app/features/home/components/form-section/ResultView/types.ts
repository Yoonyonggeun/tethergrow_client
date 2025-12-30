export interface LongShortRatio {
  overall?: {
    long: number;
    short: number;
  };
  byCoin?: Array<{
    coin: string;
    long: number;
    short: number;
  }>;
}

export interface SimulationPoint {
  date: string;
  value: number;
}

export interface AnalysisReport {
  overview?: {
    totalPnL?: number;
    winRate?: number;
    totalTrades?: number;
  };
  costAnalysis?: {
    totalFees?: number;
  };
  riskAnalysis?: {
    maxDrawdown?: number;
  };
  longShortRatio?: LongShortRatio;
  simulation?: {
    actual: SimulationPoint[];
    simulated: SimulationPoint[];
    removedTradesCount?: number;
    actualMDD?: number;
    simulatedMDD?: number;
    equityVolatilityReduced?: boolean;
  };
}
