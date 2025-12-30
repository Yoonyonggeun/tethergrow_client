// import { motion } from "framer-motion";
// import {
// 	ArrowRight,
// 	BarChart3,
// 	BellRing,
// 	Brain,
// 	LineChart,
// 	ShieldCheck,
// 	TrendingUp,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { Button } from "~/core/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	CardTitle,
// } from "~/core/components/ui/card";
// import { Badge } from "~/core/components/ui/badge";
// import { Link } from "react-router";

// // Tailwind helpers
// const container = {
// 	hidden: { opacity: 0, y: 12 },
// 	show: {
// 		opacity: 1,
// 		y: 0,
// 		transition: {
// 			duration: 0.6,
// 			ease: [0.42, 0, 0.58, 1] as const,
// 		},
// 	},
// };

// const stagger = {
// 	show: {
// 		transition: {
// 			staggerChildren: 0.08,
// 		},
// 	},
// };

// export function meta() {
// 	return [
// 		{ title: "TetherGrow 서비스 소개 | AI 거래 분석 기반 페이백 혁신" },
// 		{
// 			name: "description",
// 			content:
// 				"TetherGrow는 단순한 페이백 플랫폼이 아닙니다. AI 분석으로 거래 성향을 파악하고, 성공 확률을 높이는 맞춤형 솔루션을 제공합니다.",
// 		},
// 		{ name: "robots", content: "index,follow" },
// 		{ property: "og:type", content: "website" },
// 		{
// 			property: "og:title",
// 			content: "TetherGrow 서비스 소개 | AI 기반 거래 분석",
// 		},
// 		{
// 			property: "og:description",
// 			content: "AI가 거래 패턴을 분석해 수익을 높이는 혁신적 페이백 플랫폼.",
// 		},
// 		{
// 			property: "og:image",
// 			content: "https://tethergrow.app/og/tethergrow_opengraph.png",
// 		},
// 		{ property: "og:url", content: "https://tethergrow.app/service" },
// 	];
// }

// function AuroraBG() {
// 	return (
// 		<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
// 			<div className="absolute -top-32 left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-sky-400/20 blur-3xl" />
// 			<div className="absolute -bottom-20 right-1/2 h-[28rem] w-[50rem] translate-x-1/3 rounded-full bg-gradient-to-tr from-sky-400/20 via-violet-500/20 to-indigo-400/20 blur-3xl" />
// 		</div>
// 	);
// }

// function MiniChart() {
// 	return (
// 		<svg viewBox="0 0 300 120" className="w-full h-28">
// 			<defs>
// 				<linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
// 					<stop offset="0%" stopColor="rgb(139,92,246)" />
// 					<stop offset="50%" stopColor="rgb(217,70,239)" />
// 					<stop offset="100%" stopColor="rgb(56,189,248)" />
// 				</linearGradient>
// 			</defs>
// 			<polyline
// 				fill="none"
// 				stroke="url(#grad)"
// 				strokeWidth="3"
// 				points="0,90 30,80 60,85 90,60 120,65 150,50 180,70 210,40 240,60 270,35 300,50"
// 			/>
// 			<g fill="currentColor" className="text-violet-500">
// 				<circle cx="210" cy="40" r="4" />
// 				<circle cx="270" cy="35" r="4" />
// 			</g>
// 		</svg>
// 	);
// }

// export default function Service() {
// 	const { t } = useTranslation();

// 	return (
// 		<div className="relative min-h-screen w-full bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
// 			<AuroraBG />

// 			{/* Hero */}
// 			<section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
// 				<motion.div
// 					variants={container}
// 					initial="hidden"
// 					animate="show"
// 					className="text-center"
// 				>
// 					<Badge variant="secondary" className="mb-4 text-xs">
// 						{t("service.hero.badge")}
// 					</Badge>
// 					<h1 className="break-keep leading-12 mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl sm:leading-16 lg:text-6xl lg:leading-20">
// 						{t("service.hero.titlePart1")}{" "}
// 						<span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
// 							{t("service.hero.titleHighlight1")}
// 						</span>
// 						{t("service.hero.titlePart2")}
// 						<br />
// 						{t("service.hero.titlePart3")}{" "}
// 						<span className="bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
// 							{t("service.hero.titleHighlight2")}
// 						</span>
// 					</h1>
// 					<p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
// 						{t("service.hero.description")}
// 					</p>
// 					<div className="mt-8 flex items-center justify-center gap-3">
// 						<Button size="lg" className="gap-2" asChild>
// 							<Link to="/auth/join">
// 								{t("service.hero.buttonAnalyze")}{" "}
// 								<ArrowRight className="h-4 w-4" />
// 							</Link>
// 						</Button>
// 						{/* <Button size="lg" variant="outline">
// 							{t("service.hero.buttonDemo")}
// 						</Button> */}
// 					</div>
// 					<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
// 						{[
// 							{ label: t("service.hero.stats.monthlyReport"), value: "+13%" },
// 							{
// 								label: t("service.hero.stats.herdAlert"),
// 								value: t("service.hero.statsValues.realTime"),
// 							},
// 							{
// 								label: t("service.hero.stats.exchangeCompatible"),
// 								value: "Bybit · Binance · Bitget",
// 							},
// 						].map((k, i) => (
// 							<Card
// 								key={i}
// 								className="border-gray-200/60 dark:border-gray-800/60"
// 							>
// 								<CardContent className="flex items-center justify-between py-4 gap-2">
// 									<span className="break-keep text-sm text-gray-500 dark:text-gray-400">
// 										{k.label}
// 									</span>
// 									<span className="text-lg font-semibold">{k.value}</span>
// 								</CardContent>
// 							</Card>
// 						))}
// 					</div>
// 				</motion.div>
// 			</section>

// 			{/* Problem vs Solution */}
// 			<section className="mx-auto max-w-6xl px-6 py-10">
// 				<motion.div
// 					variants={stagger}
// 					initial="hidden"
// 					whileInView="show"
// 					viewport={{ once: true, margin: "-80px" }}
// 					className="grid grid-cols-1 gap-6 lg:grid-cols-2"
// 				>
// 					<motion.div variants={container} className="h-full">
// 						<Card className="h-full border-gray-200/60 dark:border-gray-800/60">
// 							<CardHeader>
// 								<CardTitle className="flex items-center gap-2 text-xl">
// 									<ShieldCheck className="h-5 w-5 text-gray-400" />{" "}
// 									{t("service.problem.title")}
// 								</CardTitle>
// 							</CardHeader>
// 							<CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
// 								<div className="flex items-start gap-3">
// 									<div className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
// 									<p>{t("service.problem.items.rateCompetition")}</p>
// 								</div>
// 								<div className="flex items-start gap-3">
// 									<div className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
// 									<p>{t("service.problem.items.highPayback")}</p>
// 								</div>
// 								<div className="flex items-start gap-3">
// 									<div className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
// 									<p>{t("service.problem.items.noAnalysis")}</p>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</motion.div>

// 					<motion.div variants={container} className="h-full">
// 						<Card className="h-full border-gray-200/60 dark:border-gray-800/60">
// 							<CardHeader>
// 								<CardTitle className="flex items-center gap-2 text-xl">
// 									<TrendingUp className="h-5 w-5 text-violet-500" />{" "}
// 									{t("service.solution.title")}
// 								</CardTitle>
// 							</CardHeader>
// 							<CardContent className="grid gap-4 text-sm">
// 								{[
// 									{
// 										icon: Brain,
// 										title: t("service.solution.features.aiAnalysis.title"),
// 										desc: t("service.solution.features.aiAnalysis.desc"),
// 									},
// 									{
// 										icon: BellRing,
// 										title: t("service.solution.features.herdDetection.title"),
// 										desc: t("service.solution.features.herdDetection.desc"),
// 									},
// 									{
// 										icon: BarChart3,
// 										title: t("service.solution.features.dashboard.title"),
// 										desc: t("service.solution.features.dashboard.desc"),
// 									},
// 									{
// 										icon: LineChart,
// 										title: t(
// 											"service.solution.features.paybackOptimization.title"
// 										),
// 										desc: t(
// 											"service.solution.features.paybackOptimization.desc"
// 										),
// 									},
// 								].map((f, i) => (
// 									<div key={i} className="flex items-start gap-3">
// 										<div className="rounded-xl bg-violet-600/10 p-2 text-violet-600">
// 											<f.icon className="h-5 w-5" />
// 										</div>
// 										<div>
// 											<p className="font-medium">{f.title}</p>
// 											<p className="text-gray-600 dark:text-gray-300">
// 												{f.desc}
// 											</p>
// 										</div>
// 									</div>
// 								))}
// 							</CardContent>
// 						</Card>
// 					</motion.div>
// 				</motion.div>
// 			</section>

// 			{/* Comparison */}
// 			<section className="mx-auto max-w-6xl px-6 py-10">
// 				<Card className="border-gray-200/60 dark:border-gray-800/60">
// 					<CardHeader>
// 						<CardTitle className="text-xl">
// 							{t("service.comparison.title")}
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
// 						<div className="rounded-2xl border border-gray-200/60 p-5 dark:border-gray-800/60">
// 							<p className="mb-3 text-sm font-semibold text-gray-500">
// 								{t("service.comparison.existingPlatform.title")}
// 							</p>
// 							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
// 								<li>
// 									• {t("service.comparison.existingPlatform.items.rateOnly")}
// 								</li>
// 								<li>
// 									• {t("service.comparison.existingPlatform.items.noAnalysis")}
// 								</li>
// 								<li>
// 									• {t("service.comparison.existingPlatform.items.temporary")}
// 								</li>
// 								<li>
// 									• {t("service.comparison.existingPlatform.items.rewardOnly")}
// 								</li>
// 							</ul>
// 						</div>
// 						<div className="rounded-2xl border border-violet-300/60 p-5 dark:border-violet-700/40">
// 							<p className="mb-3 text-sm font-semibold text-violet-600">
// 								TetherGrow
// 							</p>
// 							<ul className="space-y-2 text-sm">
// 								<li>• {t("service.comparison.tethergrow.items.aiAnalysis")}</li>
// 								<li>• {t("service.comparison.tethergrow.items.herdAlert")}</li>
// 								<li>
// 									• {t("service.comparison.tethergrow.items.personalized")}
// 								</li>
// 								<li>
// 									• {t("service.comparison.tethergrow.items.optimalPayback")}
// 								</li>
// 							</ul>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</section>

// 			{/* Dashboard Preview */}
// 			<section className="mx-auto max-w-6xl px-6 py-10">
// 				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
// 					<Card className="lg:col-span-2 border-gray-200/60 dark:border-gray-800/60">
// 						<CardHeader>
// 							<CardTitle className="flex items-center gap-2">
// 								<LineChart className="h-5 w-5 text-violet-500" />{" "}
// 								{t("service.dashboard.title")}
// 							</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 								<div className="rounded-xl border border-gray-200/60 p-4 dark:border-gray-800/60">
// 									<p className="text-xs text-gray-500">
// 										{t("service.dashboard.monthlyReturn.title")}
// 									</p>
// 									<MiniChart />
// 									<div className="mt-2 text-sm">
// 										<span className="font-semibold text-violet-600">+13%</span>{" "}
// 										{t("service.dashboard.monthlyReturn.change")}
// 									</div>
// 								</div>
// 								<div className="rounded-xl border border-gray-200/60 p-4 dark:border-gray-800/60">
// 									<p className="text-xs text-gray-500">
// 										{t("service.dashboard.herdWarning.title")}
// 									</p>
// 									<div className="mt-3 flex items-center gap-2 text-sm">
// 										<Badge variant="secondary">BTC/USDT</Badge>
// 										<span>{t("service.dashboard.herdWarning.pattern")}</span>
// 									</div>
// 									<div className="mt-4 text-xs text-gray-500">
// 										{t("service.dashboard.herdWarning.suggestion")}
// 									</div>
// 								</div>
// 								<div className="rounded-xl border border-gray-200/60 p-4 dark:border-gray-800/60">
// 									<p className="text-xs text-gray-500">
// 										{t("service.dashboard.exchangeRecommend.title")}
// 									</p>
// 									<div className="mt-3 text-sm">Bybit · Binance · Bitget</div>
// 									<div className="mt-1 text-xs text-gray-500">
// 										{t("service.dashboard.exchangeRecommend.desc")}
// 									</div>
// 								</div>
// 								<div className="rounded-xl border border-gray-200/60 p-4 dark:border-gray-800/60">
// 									<p className="text-xs text-gray-500">
// 										{t("service.dashboard.riskIndicator.title")}
// 									</p>
// 									<div className="mt-3 text-sm">
// 										{t("service.dashboard.riskIndicator.mdd")}{" "}
// 										<span className="font-semibold text-rose-500">-4.2%</span>
// 									</div>
// 									<div className="text-xs text-gray-500">
// 										{t("service.dashboard.riskIndicator.volatility")}
// 									</div>
// 								</div>
// 							</div>
// 						</CardContent>
// 					</Card>

// 					<Card className="border-gray-200/60 dark:border-gray-800/60">
// 						<CardHeader>
// 							<CardTitle>{t("service.dashboard.whyNow.title")}</CardTitle>
// 						</CardHeader>
// 						<CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
// 							<p>{t("service.dashboard.whyNow.items.habit")}</p>
// 							<p>{t("service.dashboard.whyNow.items.personalized")}</p>
// 							<p>{t("service.dashboard.whyNow.items.winWin")}</p>
// 						</CardContent>
// 					</Card>
// 				</div>
// 			</section>

// 			{/* Final CTA */}
// 			<section className="mx-auto max-w-6xl px-6 pb-24 pt-6">
// 				<Card className="border-violet-300/40 bg-gradient-to-br from-violet-50 to-sky-50 dark:from-gray-900 dark:to-gray-900">
// 					<CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
// 						<div>
// 							<h3 className="text-2xl font-semibold tracking-tight">
// 								{t("service.cta.title")}
// 							</h3>
// 							<p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
// 								{t("service.cta.description")}
// 							</p>
// 						</div>
// 						<div className="flex gap-3">
// 							<Button size="lg" className="gap-2" asChild>
// 								<Link to="/auth/join">
// 									{t("service.cta.buttonStart")}{" "}
// 									<ArrowRight className="h-4 w-4" />
// 								</Link>
// 							</Button>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</section>
// 		</div>
// 	);
// }
