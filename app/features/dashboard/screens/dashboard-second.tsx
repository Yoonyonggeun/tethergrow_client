// /*
//   TetherGrow — Member Dashboard V2 (Focused MVP)
//   RR7 + Tailwind CSS + shadcn/ui + Recharts

//   목표 (차별화 핵심만 간결하게)
//   1) "요율 싸움"이 아닌 "승률/규율 성장"을 한눈에: AI Edge Score, 규율 지표, 행동 코칭
//   2) 수수료/페이백 임팩트는 간단 스냅샷으로만(Why TetherGrow?)
//   3) 다음 한 걸음(Next Action)을 명확히

//   구성 (한 화면 요약)
//   - 상단 4 KPI: AI Edge Score / Net PnL(기간) / 승률 △(추세) / 페이백 절감
//   - 성장 차트: 누적 PnL(Area) + 거래수(Bar)
//   - AI Focus 카드: 다음 액션, 규칙 제안, 리스크 알림 (3줄)
//   - 규율 트래커: 쿨다운 규칙, 연속 진입/손실 감지, 규율 점수 Progress
//   - 페이백 스냅샷: Maker/Taker/절감(간단 Bar) — Why TetherGrow
//   - CTA 3종: 리스크 설정 / 전략 튜닝 / 페이백 최적화

//   API 제안(연동시 교체)
//   - GET /api/analytics/overview?range=7d|30d|90d|ytd|all
//   - GET /api/analytics/timeseries?granularity=daily&range=30d
//   - GET /api/insights/focus (다음 액션/규칙/알림)
//   - GET /api/referral/snapshot?range=30d
// */

// import React, { useMemo, useState } from "react";
// import { Link } from "react-router";
// import {
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	CardTitle,
// } from "~/core/components/ui/card";
// import { Button } from "~/core/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "~/core/components/ui/tabs";
// import { Badge } from "~/core/components/ui/badge";
// import { Separator } from "~/core/components/ui/separator";
// import { Progress } from "~/core/components/ui/progress";
// import {
// 	ChartContainer,
// 	ChartTooltipContent,
// } from "~/core/components/ui/chart";
// import {
// 	Area,
// 	AreaChart,
// 	Bar,
// 	BarChart,
// 	CartesianGrid,
// 	Legend,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from "recharts";
// import {
// 	BrainCircuit,
// 	Wallet,
// 	Activity,
// 	ShieldAlert,
// 	CheckCircle2,
// } from "lucide-react";

// // ---------------------- Mock Data (MVP) ----------------------
// const mockOverview = {
// 	range: "30d",
// 	trades: 180,
// 	winRate: 57.4,
// 	winRateDelta: +2.1, // 전월 대비 %p
// 	netPnl: 986.2, // USDT
// 	feesPaid: 340.7,
// 	referralSaved: 126.5,
// 	disciplineScore: 74, // 규율 점수 (0~100)
// 	aiEdge: 71, // AI Edge Score (승률, 기대값, 변동성, 규율을 종합)
// };

// const mockSeries = Array.from({ length: 30 }, (_, i) => {
// 	const day = i + 1;
// 	const base = i === 0 ? 0 : i * 35 + Math.sin(i / 2) * 20;
// 	return {
// 		day: `D${day}`,
// 		pnlCum: Math.round((base + (i % 6 === 0 ? -40 : 0)) * 10) / 10,
// 		trades: 3 + (i % 5 === 0 ? 6 : 2 + (i % 3)),
// 	};
// });

// const referralSnapshot = [
// 	{ exch: "Bybit", maker: 90, taker: 180, saved: 68 },
// 	{ exch: "Binance", maker: 70, taker: 130, saved: 44 },
// ];

// const focus = {
// 	nextAction: "TP를 +0.15R 상향 테스트 (전략 A)",
// 	ruleTip: "3연속 손실 시 45분 쿨다운 자동 적용",
// 	riskAlert: "BTC 편중 72% → 심볼 분산 필요",
// };

// // ---------------------- Utilities ----------------------
// const nf1 = (n: number) =>
// 	new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(n);
// const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);

// function KPI({
// 	label,
// 	value,
// 	hint,
// 	icon,
// }: {
// 	label: string;
// 	value: React.ReactNode;
// 	hint?: string;
// 	icon?: React.ReactNode;
// }) {
// 	return (
// 		<Card className="h-full">
// 			<CardHeader className="pb-1">
// 				<div className="flex items-center gap-2 text-xs text-muted-foreground">
// 					{icon}
// 					<span>{label}</span>
// 				</div>
// 			</CardHeader>
// 			<CardContent className="pt-0">
// 				<div className="text-2xl font-semibold tracking-tight">{value}</div>
// 				{hint && (
// 					<div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>
// 				)}
// 			</CardContent>
// 		</Card>
// 	);
// }

// export default function Dashboard() {
// 	const [range, setRange] = useState<"7d" | "30d" | "90d" | "ytd" | "all">(
// 		"30d"
// 	);
// 	const ov = mockOverview;

// 	return (
// 		<div className="space-y-6">
// 			{/* Header */}
// 			<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
// 				<div>
// 					<div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
// 						내 대시보드
// 					</div>
// 					<h1 className="text-2xl font-bold leading-tight">
// 						승률을 키우는{" "}
// 						<span className="bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 bg-clip-text text-transparent">
// 							AI 코칭 대시보드
// 						</span>
// 					</h1>
// 					<p
// 						className="text-sm text-muted-foOops!
// useChart must be used within a <ChartContainer />

// Error: useChart must be used within a <ChartContainer />reground mt-1"
// 					>
// 						규율과 리스크, 페이백 임팩트를 한눈에. 지금 필요한 한 가지 행동만
// 						제시합니다.
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

// 			{/* KPI Row (4) */}
// 			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// 				<KPI
// 					label="AI Edge Score"
// 					value={
// 						<div className="flex items-baseline gap-2 text-primary">
// 							<BrainCircuit className="h-4 w-4" />
// 							<span>{ov.aiEdge}</span>
// 						</div>
// 					}
// 					hint="승률·기대값·변동성·규율 종합"
// 				/>
// 				<KPI
// 					label="Net PnL (기간)"
// 					value={
// 						<div
// 							className={`flex items-baseline gap-2 ${ov.netPnl >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
// 						>
// 							<Wallet className="h-4 w-4" />
// 							<span>
// 								{ov.netPnl >= 0 ? "+" : ""}
// 								{nf1(ov.netPnl)} USDT
// 							</span>
// 						</div>
// 					}
// 					hint="수수료 포함"
// 				/>
// 				<KPI
// 					label="승률"
// 					value={<span>{nf1(ov.winRate)}%</span>}
// 					hint={`추세 ${sign(ov.winRateDelta)}%p`}
// 					icon={<Activity className="h-4 w-4" />}
// 				/>
// 				<KPI
// 					label="페이백 절감"
// 					value={<span>{nf1(ov.referralSaved)} USDT</span>}
// 					hint="TetherGrow 제휴 효과"
// 				/>
// 			</div>

// 			{/* Growth Chart */}
// 			<Card>
// 				<CardHeader className="pb-2">
// 					<div className="flex items-center justify-between">
// 						<CardTitle className="text-sm text-muted-foreground">
// 							성장 곡선 (누적 PnL & 거래 수)
// 						</CardTitle>
// 						<Badge variant="secondary">일간</Badge>
// 					</div>
// 				</CardHeader>
// 				<CardContent>
// 					<ChartContainer
// 						config={{
// 							pnlCum: {
// 								label: "누적 PnL",
// 								color: "hsl(var(--chart-1))",
// 							},
// 							trades: {
// 								label: "거래 수",
// 								color: "hsl(var(--chart-2))",
// 							},
// 						}}
// 						className="h-64"
// 					>
// 						<AreaChart
// 							data={mockSeries}
// 							margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
// 						>
// 							<defs>
// 								<linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
// 									<stop
// 										offset="5%"
// 										stopColor="currentColor"
// 										stopOpacity={0.25}
// 									/>
// 									<stop
// 										offset="95%"
// 										stopColor="currentColor"
// 										stopOpacity={0.03}
// 									/>
// 								</linearGradient>
// 							</defs>
// 							<CartesianGrid strokeDasharray="3 3" opacity={0.15} />
// 							<XAxis
// 								dataKey="day"
// 								fontSize={12}
// 								tickLine={false}
// 								axisLine={false}
// 							/>
// 							<YAxis fontSize={12} tickLine={false} axisLine={false} />
// 							<Tooltip content={<ChartTooltipContent />} />
// 							<Area
// 								type="monotone"
// 								dataKey="pnlCum"
// 								name="누적 PnL"
// 								stroke="currentColor"
// 								fill="url(#pnlFill)"
// 							/>
// 						</AreaChart>
// 					</ChartContainer>
// 					<div className="mt-2 text-[11px] text-muted-foreground">
// 						* 누적 PnL은 수수료 포함 기준, 데이터 지연 최대 1분.
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Focus & Discipline */}
// 			<div className="grid gap-4 lg:grid-cols-3">
// 				<Card className="lg:col-span-2">
// 					<CardHeader className="pb-2">
// 						<div className="flex items-center justify-between">
// 							<CardTitle className="text-sm text-muted-foreground">
// 								AI Focus (한 줄 요약)
// 							</CardTitle>
// 							<Badge>Beta</Badge>
// 						</div>
// 					</CardHeader>
// 					<CardContent className="space-y-3 text-sm">
// 						<FocusLine
// 							icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
// 							label="다음 액션"
// 							text={focus.nextAction}
// 						/>
// 						<FocusLine
// 							icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
// 							label="규칙 제안"
// 							text={focus.ruleTip}
// 						/>
// 						<FocusLine
// 							icon={<ShieldAlert className="h-4 w-4 text-amber-500" />}
// 							label="리스크"
// 							text={focus.riskAlert}
// 						/>
// 						<Separator />
// 						<div className="grid grid-cols-2 gap-3">
// 							<DisciplineCard
// 								title="규율 점수"
// 								value={`${mockOverview.disciplineScore}/100`}
// 								progress={mockOverview.disciplineScore}
// 								hint="계획 대비 진입·청산, 쿨다운 준수"
// 							/>
// 							<DisciplineCard
// 								title="연속 진입 감지"
// 								value="주의"
// 								progress={68}
// 								hint="단기 과매수 진입 경향"
// 							/>
// 						</div>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="pb-2">
// 						<CardTitle className="text-sm text-muted-foreground">
// 							페이백 스냅샷
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<ChartContainer
// 							config={{
// 								maker: {
// 									label: "Maker Fee",
// 									color: "hsl(var(--chart-1))",
// 								},
// 								taker: {
// 									label: "Taker Fee",
// 									color: "hsl(var(--chart-2))",
// 								},
// 								saved: {
// 									label: "절감",
// 									color: "hsl(var(--chart-3))",
// 								},
// 							}}
// 							className="h-48"
// 						>
// 							<BarChart data={referralSnapshot}>
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
// 								<Bar dataKey="maker" name="Maker Fee" radius={[6, 6, 0, 0]} />
// 								<Bar dataKey="taker" name="Taker Fee" radius={[6, 6, 0, 0]} />
// 								<Bar dataKey="saved" name="절감" radius={[6, 6, 0, 0]} />
// 							</BarChart>
// 						</ChartContainer>
// 						<div className="mt-2 text-[11px] text-muted-foreground">
// 							* 절감액은 제휴 요율 적용 추정치.
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Actions */}
// 			<Card>
// 				<CardHeader className="pb-2">
// 					<CardTitle className="text-sm text-muted-foreground">
// 						다음 한 걸음
// 					</CardTitle>
// 				</CardHeader>
// 				<CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
// 					<ActionItem
// 						title="리스크 설정"
// 						desc="포지션당 0.6R로 1주 시험"
// 						to="/settings/risk"
// 					/>
// 					<ActionItem
// 						title="전략 튜닝"
// 						desc="전략 A — TP +0.15R AB테스트"
// 						to="/strategies/a"
// 					/>
// 					<ActionItem
// 						title="페이백 최적화"
// 						desc="테이커 → 메이커 전환 가이드"
// 						to="/referral/optimizer"
// 					/>
// 				</CardContent>
// 			</Card>

// 			<div className="text-[11px] text-muted-foreground">
// 				* 본 대시보드는 참고용 정보이며, 투자는 본인의 책임 하에 결정되어야
// 				합니다.
// 			</div>
// 		</div>
// 	);
// }

// function FocusLine({
// 	icon,
// 	label,
// 	text,
// }: {
// 	icon?: React.ReactNode;
// 	label: string;
// 	text: string;
// }) {
// 	return (
// 		<div className="flex items-start gap-2">
// 			{icon}
// 			<div>
// 				<div className="text-[12px] text-muted-foreground">{label}</div>
// 				<div className="text-sm font-medium">{text}</div>
// 			</div>
// 		</div>
// 	);
// }

// function DisciplineCard({
// 	title,
// 	value,
// 	progress,
// 	hint,
// }: {
// 	title: string;
// 	value: string;
// 	progress: number;
// 	hint?: string;
// }) {
// 	return (
// 		<div className="rounded-xl border p-3">
// 			<div className="text-xs text-muted-foreground">{title}</div>
// 			<div className="text-base font-medium mt-0.5">{value}</div>
// 			<Progress value={progress} className="mt-2" />
// 			{hint && (
// 				<div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>
// 			)}
// 		</div>
// 	);
// }

// function ActionItem({
// 	title,
// 	desc,
// 	to,
// }: {
// 	title: string;
// 	desc: string;
// 	to: string;
// }) {
// 	return (
// 		<div className="rounded-2xl border p-4">
// 			<div className="mb-1 text-sm font-medium">{title}</div>
// 			<div className="text-xs text-muted-foreground">{desc}</div>
// 			<div className="mt-3">
// 				<Button variant="outline" size="sm" asChild>
// 					<Link to={to}>열기</Link>
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }
