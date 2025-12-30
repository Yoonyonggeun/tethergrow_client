// /*
//   TetherGrow — Member Dashboard (React Router v7 + Tailwind CSS + shadcn/ui + Recharts)

//   Goals
//   - Show value beyond payback %: AI 분석 기반의 거래 패턴/리스크/행동 추천을 한눈에
//   - 월별/주별/세션별 패턴, 거래소/종목 분포, 수수료 절감(페이백) 임팩트, 리스크 알림
//   - MVP 단계: 목업 데이터로 UI 구성 → API 연동 주석에 맞춰 교체

//   Assumptions
//   - shadcn/ui가 설치되어 있고, 기본 컴포넌트 경로는 '@/components/ui/*'
//   - shadcn chart primitives(ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent)가 '@/components/ui/chart'에 존재
//   - Router는 RR7. 본 컴포넌트는 예: routes/dashboard/Dashboard.tsx 에 배치
//   - MagicUI를 쓰는 경우, 강조 텍스트는 간단한 그라데이션 유틸 클래스로 대체했습니다 (필요시 교체)

//   TODO(API)
//   - /api/analytics/overview?range=7d|30d|90d|ytd|all
//   - /api/analytics/timeseries?granularity=daily&range=30d
//   - /api/analytics/patterns?by=weekday|hour|session
//   - /api/analytics/strategies
//   - /api/alerts/recent
//   - /api/referral/savings?range=30d
// */

// import React, { useMemo, useState } from "react";

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "~/core/components/ui/card";
// import { Button } from "~/core/components/ui/button";
// import {
// 	Tabs,
// 	TabsList,
// 	TabsTrigger,
// 	TabsContent,
// } from "~/core/components/ui/tabs";
// import { Badge } from "~/core/components/ui/badge";
// import { Separator } from "~/core/components/ui/separator";
// import { Progress } from "~/core/components/ui/progress";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "~/core/components/ui/table";
// import {
// 	ChartContainer,
// 	ChartTooltip,
// 	ChartTooltipContent,
// 	ChartLegend,
// 	ChartLegendContent,
// } from "~/core/components/ui/chart";
// import {
// 	Area,
// 	AreaChart,
// 	Bar,
// 	BarChart,
// 	CartesianGrid,
// 	Legend,
// 	Pie,
// 	PieChart,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from "recharts";
// import {
// 	Activity,
// 	AlertTriangle,
// 	ArrowUpRight,
// 	ArrowDownRight,
// 	BrainCircuit,
// 	CheckCircle2,
// 	Clock,
// 	LineChart as LineChartIcon,
// 	Wallet,
// } from "lucide-react";
// import { Link } from "react-router";
// // push
// // ---------------------- Mock Data (MVP) ----------------------
// const mockOverview = {
// 	range: "30d",
// 	trades: 284,
// 	winRate: 58.6, // %
// 	netPnl: 1423.4, // USDT
// 	avgRMultiple: 1.34, // 평균 R
// 	maxDrawdown: -6.2, // %
// 	feesPaid: 512.9, // USDT
// 	referralSaved: 178.3, // USDT (페이백 추정)
// 	aiScore: 72, // 0~100 (규율/일관성 점수)
// };

// const mockPnlSeries = Array.from({ length: 30 }, (_, i) => {
// 	const day = i + 1;
// 	return {
// 		day: `D${day}`,
// 		pnl:
// 			Math.round(
// 				(Math.sin(i / 4.3) * 120 + 80 + (i % 5 === 0 ? -60 : 0)) * 10
// 			) / 10,
// 		trades: Math.floor(6 + (Math.cos(i / 3) + 1) * 3),
// 	};
// });

// const mockWeekdayPattern = [
// 	{ name: "Mon", count: 42, winRate: 61 },
// 	{ name: "Tue", count: 39, winRate: 57 },
// 	{ name: "Wed", count: 51, winRate: 62 },
// 	{ name: "Thu", count: 58, winRate: 59 },
// 	{ name: "Fri", count: 47, winRate: 56 },
// 	{ name: "Sat", count: 25, winRate: 54 },
// 	{ name: "Sun", count: 22, winRate: 53 },
// ];

// const mockStrategies = [
// 	{ key: "Breakout", value: 42 },
// 	{ key: "Pullback", value: 26 },
// 	{ key: "Range", value: 18 },
// 	{ key: "News", value: 14 },
// ];

// const mockExchangeSplit = [
// 	{ exch: "Bybit", makerFee: 110, takerFee: 260, saved: 92 },
// 	{ exch: "Binance", makerFee: 88, takerFee: 190, saved: 64 },
// 	{ exch: "Bitget", makerFee: 76, takerFee: 140, saved: 39 },
// ];

// const mockAlerts = [
// 	{
// 		id: "a1",
// 		type: "risk",
// 		title: "뇌동매매 징후",
// 		detail: "최근 24h 내 진입 간격이 5분 미만 4회",
// 		severity: "high",
// 		ts: "15:10",
// 	},
// 	{
// 		id: "a2",
// 		type: "pattern",
// 		title: "수익 구간 확대",
// 		detail: "수익 실현 평균 R 1.1 → 1.4 (7d)",
// 		severity: "low",
// 		ts: "14:32",
// 	},
// 	{
// 		id: "a3",
// 		type: "risk",
// 		title: "포지션 과밀도",
// 		detail: "BTC/ETH 편중 78%",
// 		severity: "medium",
// 		ts: "11:05",
// 	},
// ];

// // ---------------------- Utilities ----------------------
// const currency = (n: number) =>
// 	new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(n);

// function Stat({
// 	label,
// 	value,
// 	hint,
// 	positive,
// 	negative,
// 	icon,
// }: {
// 	label: string;
// 	value: React.ReactNode;
// 	hint?: string;
// 	positive?: boolean;
// 	negative?: boolean;
// 	icon?: React.ReactNode;
// }) {
// 	return (
// 		<Card className="h-full">
// 			<CardHeader className="pb-2">
// 				<div className="flex items-center gap-2 text-sm text-muted-foreground">
// 					{icon}
// 					<span>{label}</span>
// 				</div>
// 			</CardHeader>
// 			<CardContent className="pt-0">
// 				<div className="text-2xl font-semibold tracking-tight">{value}</div>
// 				{hint && (
// 					<div
// 						className={`mt-1 text-xs ${positive ? "text-emerald-600 dark:text-emerald-400" : negative ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}
// 					>
// 						{hint}
// 					</div>
// 				)}
// 			</CardContent>
// 		</Card>
// 	);
// }

// function SectionTitle({
// 	title,
// 	right,
// }: {
// 	title: string;
// 	right?: React.ReactNode;
// }) {
// 	return (
// 		<div className="flex items-center justify-between">
// 			<h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
// 			{right}
// 		</div>
// 	);
// }

// export default function Dashboard() {
// 	const [range, setRange] = useState<"7d" | "30d" | "90d" | "ytd" | "all">(
// 		"30d"
// 	);

// 	// NOTE: 실제 연동 시 range 상태를 이용해 API 호출
// 	const ov = mockOverview;

// 	const pnlIsUp = ov.netPnl >= 0;

// 	return (
// 		<div className="space-y-6">
// 			{/* Header */}
// 			<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
// 				<div>
// 					<div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
// 						내 대시보드
// 					</div>
// 					<h1 className="text-2xl font-bold leading-tight">
// 						한눈에 보는{" "}
// 						<span className="bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 bg-clip-text text-transparent">
// 							거래 분석 & 페이백 임팩트
// 						</span>
// 					</h1>
// 					<p className="text-sm text-muted-foreground mt-1">
// 						AI가 감지한 패턴과 리스크, 다음 액션까지 — 지금 가장 중요한 것만
// 						모았습니다.
// 					</p>
// 				</div>
// 				<Tabs
// 					value={range}
// 					onValueChange={(v) => setRange(v as any)}
// 					className="w-fit"
// 				>
// 					<TabsList>
// 						<TabsTrigger value="7d">7D</TabsTrigger>
// 						<TabsTrigger value="30d">30D</TabsTrigger>
// 						<TabsTrigger value="90d">90D</TabsTrigger>
// 						<TabsTrigger value="ytd">YTD</TabsTrigger>
// 						<TabsTrigger value="all">ALL</TabsTrigger>
// 					</TabsList>
// 				</Tabs>
// 			</div>

// 			{/* KPI Grid */}
// 			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// 				<Stat
// 					label="Net PnL"
// 					value={
// 						<div
// 							className={`flex items-baseline gap-2 ${pnlIsUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
// 						>
// 							<Wallet className="h-4 w-4" />
// 							<span>
// 								{pnlIsUp ? "+" : ""}
// 								{currency(ov.netPnl)} USDT
// 							</span>
// 						</div>
// 					}
// 					hint={pnlIsUp ? "수익 구간입니다" : "손실 구간입니다"}
// 					positive={pnlIsUp}
// 					negative={!pnlIsUp}
// 				/>
// 				<Stat
// 					label="승률"
// 					value={<>{ov.winRate}%</>}
// 					hint="최근 30일 기준"
// 					icon={<Activity className="h-4 w-4" />}
// 				/>
// 				<Stat
// 					label="평균 R"
// 					value={<>{ov.avgRMultiple}x</>}
// 					hint={ov.avgRMultiple > 1 ? "리스크 대비 수익 양호" : "리워드 낮음"}
// 				/>
// 				<Stat
// 					label="최대 낙폭"
// 					value={<>{ov.maxDrawdown}%</>}
// 					hint="보수적 리스크 권장"
// 				/>
// 				<Stat
// 					label="지급 수수료"
// 					value={<>{currency(ov.feesPaid)} USDT</>}
// 					hint="메이커/테이커 포함"
// 				/>
// 				<Stat
// 					label="페이백 절감"
// 					value={<>{currency(ov.referralSaved)} USDT</>}
// 					hint="테더그로우로 절감"
// 				/>
// 				<Stat
// 					label="AI 규율 점수"
// 					value={<>{ov.aiScore}/100</>}
// 					hint="일관성 · 과매수/과매도 대응"
// 					icon={<BrainCircuit className="h-4 w-4" />}
// 				/>
// 				<Stat label="거래 수" value={<>{ov.trades}회</>} hint="동기간 집계" />
// 			</div>

// 			{/* Charts Row */}
// 			<div className="grid gap-4 lg:grid-cols-2">
// 				<Card>
// 					<CardHeader className="pb-2">
// 						<SectionTitle
// 							title="PnL & 거래량 타임시리즈"
// 							right={<Badge variant="secondary">일간</Badge>}
// 						/>
// 					</CardHeader>
// 					<CardContent>
// 						<ChartContainer
// 							config={{
// 								pnl: {
// 									label: "PnL",
// 									color: "hsl(var(--chart-1))",
// 								},
// 							}}
// 							className="h-60"
// 						>
// 							<AreaChart
// 								data={mockPnlSeries}
// 								margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
// 							>
// 								<defs>
// 									<linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
// 										<stop
// 											offset="5%"
// 											stopColor="currentColor"
// 											stopOpacity={0.25}
// 										/>
// 										<stop
// 											offset="95%"
// 											stopColor="currentColor"
// 											stopOpacity={0.03}
// 										/>
// 									</linearGradient>
// 								</defs>
// 								<CartesianGrid strokeDasharray="3 3" opacity={0.15} />
// 								<XAxis
// 									dataKey="day"
// 									fontSize={12}
// 									tickLine={false}
// 									axisLine={false}
// 								/>
// 								<YAxis fontSize={12} tickLine={false} axisLine={false} />
// 								<Tooltip content={<ChartTooltipContent />} />
// 								<Area
// 									type="monotone"
// 									dataKey="pnl"
// 									stroke="currentColor"
// 									fill="url(#pnlFill)"
// 								/>
// 							</AreaChart>
// 						</ChartContainer>
// 						<div className="mt-3 text-xs text-muted-foreground">
// 							* PnL은 수수료 포함 기준. 데이터 지연 최대 1분.
// 						</div>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="pb-2">
// 						<SectionTitle
// 							title="요일별 거래 패턴"
// 							right={<Badge variant="secondary">주간</Badge>}
// 						/>
// 					</CardHeader>
// 					<CardContent>
// 						<ChartContainer
// 							config={{
// 								count: {
// 									label: "거래 수",
// 									color: "hsl(var(--chart-1))",
// 								},
// 								winRate: {
// 									label: "승률(%)",
// 									color: "hsl(var(--chart-2))",
// 								},
// 							}}
// 							className="h-60"
// 						>
// 							<BarChart data={mockWeekdayPattern}>
// 								<CartesianGrid strokeDasharray="3 3" opacity={0.15} />
// 								<XAxis
// 									dataKey="name"
// 									fontSize={12}
// 									tickLine={false}
// 									axisLine={false}
// 								/>
// 								<YAxis fontSize={12} tickLine={false} axisLine={false} />
// 								<Tooltip content={<ChartTooltipContent />} />
// 								<Legend />
// 								<Bar dataKey="count" name="거래 수" radius={[6, 6, 0, 0]} />
// 								<Bar dataKey="winRate" name="승률(%)" radius={[6, 6, 0, 0]} />
// 							</BarChart>
// 						</ChartContainer>
// 						<div className="mt-3 text-xs text-muted-foreground">
// 							* 요일/세션 조합 Heatmap은 하단 패턴 섹션에서 확인.
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Deep Dive: Strategy / Exchange */}
// 			<div className="grid gap-4 lg:grid-cols-2">
// 				<Card>
// 					<CardHeader className="pb-2">
// 						<SectionTitle title="전략 비중 (최근 30일)" />
// 					</CardHeader>
// 					<CardContent>
// 						<ChartContainer
// 							config={{
// 								Breakout: {
// 									label: "Breakout",
// 									color: "hsl(var(--chart-1))",
// 								},
// 								Pullback: {
// 									label: "Pullback",
// 									color: "hsl(var(--chart-2))",
// 								},
// 								Range: {
// 									label: "Range",
// 									color: "hsl(var(--chart-3))",
// 								},
// 								News: {
// 									label: "News",
// 									color: "hsl(var(--chart-4))",
// 								},
// 							}}
// 							className="h-60"
// 						>
// 							<PieChart>
// 								<Tooltip content={<ChartTooltipContent />} />
// 								<Legend />
// 								<Pie
// 									data={mockStrategies}
// 									dataKey="value"
// 									nameKey="key"
// 									innerRadius={50}
// 									outerRadius={80}
// 									paddingAngle={4}
// 									label
// 								/>
// 							</PieChart>
// 						</ChartContainer>
// 						<div className="mt-3 text-xs text-muted-foreground">
// 							* 전략 별 성과 비교는 상세 페이지에서 R, 승률, 기대값으로 확인.
// 						</div>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="pb-2">
// 						<SectionTitle title="거래소 수수료 / 페이백 임팩트" />
// 					</CardHeader>
// 					<CardContent>
// 						<ChartContainer
// 							config={{
// 								makerFee: {
// 									label: "Maker Fee",
// 									color: "hsl(var(--chart-1))",
// 								},
// 								takerFee: {
// 									label: "Taker Fee",
// 									color: "hsl(var(--chart-2))",
// 								},
// 								saved: {
// 									label: "페이백 절감",
// 									color: "hsl(var(--chart-3))",
// 								},
// 							}}
// 							className="h-60"
// 						>
// 							<BarChart data={mockExchangeSplit}>
// 								<CartesianGrid strokeDasharray="3 3" opacity={0.15} />
// 								<XAxis
// 									dataKey="exch"
// 									fontSize={12}
// 									tickLine={false}
// 									axisLine={false}
// 								/>
// 								<YAxis fontSize={12} tickLine={false} axisLine={false} />
// 								<Tooltip content={<ChartTooltipContent />} />
// 								<Legend />
// 								<Bar
// 									dataKey="makerFee"
// 									name="Maker Fee"
// 									stackId="fees"
// 									radius={[6, 6, 0, 0]}
// 								/>
// 								<Bar
// 									dataKey="takerFee"
// 									name="Taker Fee"
// 									stackId="fees"
// 									radius={[6, 6, 0, 0]}
// 								/>
// 								<Bar
// 									dataKey="saved"
// 									name="페이백 절감"
// 									stackId="fees"
// 									radius={[6, 6, 0, 0]}
// 								/>
// 							</BarChart>
// 						</ChartContainer>
// 						<div className="mt-3 text-xs text-muted-foreground">
// 							* 테더그로우 제휴로 절감된 수수료 추정치 포함.
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Pattern Heatmap (Session x Weekday) */}
// 			<Card>
// 				<CardHeader className="pb-2">
// 					<SectionTitle
// 						title="세션×요일 히트맵 (거래 수/승률)"
// 						right={<Badge variant="outline">MVP</Badge>}
// 					/>
// 				</CardHeader>
// 				<CardContent>
// 					{/* 간단 그리드 히트맵 (Recharts Heatmap 대체 MVP) */}
// 					<div className="overflow-x-auto">
// 						<Table>
// 							<TableHeader>
// 								<TableRow>
// 									<TableHead>세션 / 요일</TableHead>
// 									{mockWeekdayPattern.map((d) => (
// 										<TableHead key={d.name} className="text-center">
// 											{d.name}
// 										</TableHead>
// 									))}
// 								</TableRow>
// 							</TableHeader>
// 							<TableBody>
// 								{(["Asia AM", "Asia PM", "US AM", "US PM"] as const).map(
// 									(session) => (
// 										<TableRow key={session}>
// 											<TableCell className="font-medium">{session}</TableCell>
// 											{mockWeekdayPattern.map((d) => {
// 												// 세션별 가중 랜덤 (목업)
// 												const count = Math.max(
// 													0,
// 													Math.round(d.count * (0.4 + Math.random() * 0.9))
// 												);
// 												const win = Math.min(
// 													80,
// 													Math.max(
// 														35,
// 														Math.round(d.winRate + (Math.random() - 0.5) * 10)
// 													)
// 												);
// 												const heat = Math.min(1, count / 70);
// 												return (
// 													<TableCell key={d.name} className="p-1">
// 														<div
// 															className="rounded-lg p-2 text-center"
// 															style={{
// 																background: `linear-gradient(180deg, hsl(var(--primary)/${0.05 + heat * 0.25}) 0%, hsl(var(--primary)/${0.02 + heat * 0.15}) 100%)`,
// 															}}
// 														>
// 															<div className="text-xs font-medium">{count}</div>
// 															<div className="text-[10px] text-muted-foreground">
// 																{win}%
// 															</div>
// 														</div>
// 													</TableCell>
// 												);
// 											})}
// 										</TableRow>
// 									)
// 								)}
// 							</TableBody>
// 						</Table>
// 					</div>
// 					<div className="mt-3 text-xs text-muted-foreground">
// 						* 진한 셀일수록 거래 빈도가 높음. 각 셀의 하단은 승률(%).
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Alerts & Insights */}
// 			<div className="grid gap-4 lg:grid-cols-3">
// 				<Card className="lg:col-span-2">
// 					<CardHeader className="pb-2">
// 						<SectionTitle
// 							title="실시간 알림"
// 							right={<Badge variant="destructive">리스크</Badge>}
// 						/>
// 					</CardHeader>
// 					<CardContent className="space-y-3">
// 						{mockAlerts.map((a) => (
// 							<div
// 								key={a.id}
// 								className="flex items-start justify-between rounded-xl border p-3"
// 							>
// 								<div className="flex items-start gap-3">
// 									{a.type === "risk" ? (
// 										<AlertTriangle
// 											className={`mt-0.5 h-4 w-4 ${a.severity === "high" ? "text-rose-500" : a.severity === "medium" ? "text-amber-500" : "text-muted-foreground"}`}
// 										/>
// 									) : (
// 										<LineChartIcon className="mt-0.5 h-4 w-4 text-primary" />
// 									)}
// 									<div>
// 										<div className="font-medium leading-tight">{a.title}</div>
// 										<div className="text-xs text-muted-foreground">
// 											{a.detail}
// 										</div>
// 									</div>
// 								</div>
// 								<div className="flex items-center gap-2">
// 									<Badge variant="outline" className="uppercase">
// 										{a.severity}
// 									</Badge>
// 									<span className="text-xs text-muted-foreground">{a.ts}</span>
// 								</div>
// 							</div>
// 						))}
// 						<div className="text-right">
// 							<Button variant="ghost" size="sm" asChild>
// 								<Link to="/alerts">전체 보기</Link>
// 							</Button>
// 						</div>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="pb-2">
// 						<SectionTitle
// 							title="AI 인사이트 (요약)"
// 							right={<Badge>Beta</Badge>}
// 						/>
// 					</CardHeader>
// 					<CardContent className="space-y-4">
// 						<div className="space-y-2 text-sm">
// 							<div className="flex items-start gap-2">
// 								<CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
// 								<p>
// 									<span className="font-medium">수익 유지 팁:</span> 이익실현
// 									평균 R이 상승 중입니다. 동일 전략에서{" "}
// 									<span className="underline decoration-dashed">
// 										TP를 +0.2R
// 									</span>{" "}
// 									상향 테스트 권장.
// 								</p>
// 							</div>
// 							<div className="flex items-start gap-2">
// 								<CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
// 								<p>
// 									<span className="font-medium">리스크 관리:</span> 최근 낙폭{" "}
// 									{-mockOverview.maxDrawdown}% 발생. 포지션당 리스크를{" "}
// 									<span className="underline decoration-dashed">
// 										0.75R → 0.6R
// 									</span>
// 									로 일시 축소 권고.
// 								</p>
// 							</div>
// 							<div className="flex items-start gap-2">
// 								<CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
// 								<p>
// 									<span className="font-medium">행동 교정:</span> 연속 진입
// 									패턴이 관측됨.{" "}
// 									<span className="underline decoration-dashed">
// 										3연속 손실 시 60분 쿨다운
// 									</span>{" "}
// 									규칙 활성화 제안.
// 								</p>
// 							</div>
// 						</div>
// 						<Separator />
// 						<div className="space-y-2 text-sm">
// 							<div className="flex items-center justify-between">
// 								<span className="text-muted-foreground">규율 점수</span>
// 								<span className="font-medium">{mockOverview.aiScore}/100</span>
// 							</div>
// 							<Progress value={mockOverview.aiScore} />
// 						</div>
// 						<Button className="w-full" variant="secondary" asChild>
// 							<Link to="/insights">자세히 보기</Link>
// 						</Button>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Next Actions */}
// 			<Card>
// 				<CardHeader className="pb-2">
// 					<SectionTitle title="다음 액션 (권장)" />
// 				</CardHeader>
// 				<CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
// 					<ActionItem
// 						title="리스크 프로파일 조정"
// 						desc="포지션당 리스크 0.6R로 1주 테스트"
// 						cta={{ to: "/settings/risk", label: "리스크 설정" }}
// 					/>
// 					<ActionItem
// 						title="전략 A 성능 재검증"
// 						desc="지난 30일 승률 62% / 기대값 0.23"
// 						cta={{ to: "/strategies/a", label: "전략 상세" }}
// 					/>
// 					<ActionItem
// 						title="페이백 최적화"
// 						desc="Binance 테이커 비중 68% → 메이커 전환 가이드"
// 						cta={{ to: "/referral/optimizer", label: "최적화 도구" }}
// 					/>
// 				</CardContent>
// 			</Card>

// 			<div className="text-xs text-muted-foreground">
// 				* 본 대시보드는 참고용 정보이며, 투자는 본인의 책임 하에 결정되어야
// 				합니다.
// 			</div>
// 		</div>
// 	);
// }

// function ActionItem({
// 	title,
// 	desc,
// 	cta,
// }: {
// 	title: string;
// 	desc: string;
// 	cta: { to: string; label: string };
// }) {
// 	return (
// 		<div className="rounded-2xl border p-4">
// 			<div className="mb-1 text-sm font-medium">{title}</div>
// 			<div className="text-xs text-muted-foreground">{desc}</div>
// 			<div className="mt-3">
// 				<Button variant="outline" size="sm" asChild>
// 					<Link to={cta.to}>{cta.label}</Link>
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }
