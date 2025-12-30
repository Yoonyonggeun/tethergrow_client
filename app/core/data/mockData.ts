export const mockData = {
  // Hero Section
  paybackCounter: {
    totalPayback: 1247832.45,
    incrementRate: 0.23, // USDT per second
  },

  // Event Section
  prizePool: {
    total: 10000,
    prizes: [
      { rank: 1, count: 1, amount: 3000, label: "1등" },
      { rank: 2, count: 3, amount: 1000, label: "2등" },
      { rank: 3, count: 40, amount: 100, label: "3등" },
    ],
    subscriptionCredit: 90,
    subscriptionMonths: 6,
    monthlyValue: 15,
  },

  // Exchanges
  exchanges: [
    { name: "Bybit", logo: "bybit" },
    { name: "Bitget", logo: "bitget" },
    { name: "OKX", logo: "okx" },
    { name: "Binance", logo: "binance" },
  ],

  // Result Preview - Clear Zone (Personal Audit)
  personalAudit: {
    feeWaste: {
      amount: 3420,
      period: "최근 3개월",
    },
    tradeEfficiency: {
      winRatio: 1,
      lossRatio: 0.8,
    },
  },

  // Result Preview - Blur Zone
  crowdData: {
    longPercent: 62,
    shortPercent: 38,
    patternProbability: 73.2,
    signalStatus: "enter", // 'enter' | 'wait' | 'exit'
  },

  // Analysis Result (after API connection)
  analysisResult: {
    totalFees90Days: 1240,
    potentialPayback: 620,
    userId: "Trader_8294",
  },

  // Product Logic Steps
  productLogicSteps: [
    {
      id: 1,
      title: "Historical Data",
      description: "과거 시장의 방대한 시세 데이터와 패턴을 대조합니다.",
      icon: "database",
    },
    {
      id: 2,
      title: "Market Events",
      description: "가격 변동성을 유발하는 주요 뉴스 및 이벤트를 반영합니다.",
      icon: "newspaper",
    },
    {
      id: 3,
      title: "User Behavior",
      description:
        "사용자의 과거 거래 내역 중 승률이 높았던 구간을 분석합니다.",
      icon: "user-check",
    },
  ],

  // API Guide Steps
  apiGuideSteps: {
    bybit: [
      "거래소 로그인 후 'API Management' 클릭",
      "'Create New Key' 클릭 후 'Read-Only' 체크 확인 (중요!)",
      "생성된 Key 복사 후 TetherGrow에 붙여넣기",
    ],
    bitget: [
      "거래소 로그인 후 'API 관리' 클릭",
      "'API 생성' 클릭 후 '읽기 전용' 선택 (중요!)",
      "생성된 Key 복사 후 TetherGrow에 붙여넣기",
    ],
    okx: [
      "거래소 로그인 후 'API' 메뉴 클릭",
      "'Create API Key' 클릭 후 'Read-only' 권한 선택 (중요!)",
      "생성된 Key 복사 후 TetherGrow에 붙여넣기",
    ],
  },

  // Security Features
  securityFeatures: [
    {
      icon: "shield",
      title: "Read-Only",
      description:
        "입출금 권한이 없는 '조회 전용' API 키만 입력받습니다. 기술적으로 자산 이동이 불가능합니다.",
    },
    {
      icon: "lock",
      title: "Encryption",
      description: "모든 키 값은 AES-256으로 암호화되어 분산 저장됩니다.",
    },
    {
      icon: "eye-off",
      title: "Privacy",
      description:
        "수집된 데이터는 개인화 모델링 및 페이백 정산 목적으로만 사용됩니다.",
    },
  ],

  // Demo Trading Diagnosis Data
  demoTradingDiagnosis: {
    // KPI Overview (5개)
    kpis: [
      {
        label: "승률",
        value: 42.3,
        unit: "%",
        summary: "손익비 대비 승률이 낮은 구조입니다.",
      },
      {
        label: "평균 손익비 ",
        value: 1.0,
        unit: "",
        summary: "평균 손익비가 1:0.8로 개선이 필요합니다.",
      },
      {
        label: "평균 레버리지",
        value: 25.0,
        unit: "x",
        summary: "레버리지를 자주 활용하는 트레이딩 패턴입니다.",
      },
      {
        label: "총 거래 횟수",
        value: 847,
        unit: "",
        summary: "최근 3개월간 총 거래 횟수입니다.",
      },
      {
        label: "롱/숏 비율",
        value: 62.0,
        unit: "%",
        summary: "롱 포지션 비율이 높은 편입니다.",
      },
    ],

    // Long/Short Ratio by Coin
    longShortRatio: [
      { coin: "전체", long: 62, short: 38 },
      { coin: "BTC", long: 68, short: 32 },
      { coin: "ETH", long: 55, short: 45 },
      { coin: "SOL", long: 71, short: 29 },
      { coin: "BNB", long: 48, short: 52 },
    ],

    // Simulation Equity Curve Data
    simulationEquity: {
      actual: [
        { date: "2024-01-01", value: 10000 },
        { date: "2024-01-15", value: 10250 },
        { date: "2024-02-01", value: 9800 },
        { date: "2024-02-15", value: 10500 },
        { date: "2024-03-01", value: 9200 },
        { date: "2024-03-15", value: 11000 },
        { date: "2024-04-01", value: 9500 },
        { date: "2024-04-15", value: 11200 },
        { date: "2024-05-01", value: 9800 },
        { date: "2024-05-15", value: 11500 },
        { date: "2024-06-01", value: 10200 },
        { date: "2024-06-15", value: 11800 },
      ],
      simulated: [
        { date: "2024-01-01", value: 10000 },
        { date: "2024-01-15", value: 10300 },
        { date: "2024-02-01", value: 10100 },
        { date: "2024-02-15", value: 10700 },
        { date: "2024-03-01", value: 10500 },
        { date: "2024-03-15", value: 11200 },
        { date: "2024-04-01", value: 11000 },
        { date: "2024-04-15", value: 11600 },
        { date: "2024-05-01", value: 11400 },
        { date: "2024-05-15", value: 12000 },
        { date: "2024-06-01", value: 11800 },
        { date: "2024-06-15", value: 12500 },
      ],
    },

    // Simulation Analysis
    simulationAnalysis: {
      summary: [
        "손실의 38%가 평균 레버리지 25x 이상 구간에서 발생",
        "손실 거래 중 52%가 진입 후 3분 이내 청산",
        "특정 시간대(오전 9-11시)에서 승률이 급격히 하락",
      ],
      aiInsight:
        "이 트레이딩 패턴은 감정적 진입 가능성이 높습니다. 리스크 관리 기준이 적용되었다면 손실 폭은 줄어들 가능성이 큽니다.",
    },

    // Advanced Insights
    advancedInsights: {
      patternWinRate: {
        value: 73.2,
        description: "유사한 패턴 발생 시 상승 확률",
      },
      crowdPosition: {
        long: 62,
        short: 38,
        description: "실시간 전체 사용자 데이터 기반 지표입니다.",
      },
      tradingSignal: {
        status: "enter" as "enter" | "wait" | "exit",
        label: "Entry Favorable",
        description: "과거 유사 구간에서 변동성이 안정적이었습니다.",
      },
    },
  },
};

export type MockDataType = typeof mockData;
