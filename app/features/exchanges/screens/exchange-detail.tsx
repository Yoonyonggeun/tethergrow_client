// "";
// import { apiRequest } from "~/core/lib/api.server";
// import type { Route } from "./+types/exchange-detail";
// import { data, Link } from "react-router";
// import { useTranslation } from "react-i18next";
// import { Badge } from "~/core/components/ui/badge";
// import { ArrowDownCircle, ArrowRight } from "lucide-react";
// import { Button } from "~/core/components/ui/button";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "~/core/components/ui/popover";
// import { Card } from "~/core/components/ui/card";
// import { BorderBeam } from "~/core/components/ui/border-beam";
// import { Highlighter } from "~/core/components/ui/highlighter";
// import { NumberTicker } from "~/core/components/ui/number-ticker";

// export async function loader({ request, params }: Route.LoaderArgs) {
// 	const { detailPageParams } = params;
// 	const exchange = await apiRequest({
// 		request,
// 		endpoint: `/exchange/detail?exchangeName=${detailPageParams}`,
// 		method: "GET",
// 	});
// 	return data({ exchange: exchange.exchange });
// }

// export function meta({ loaderData }: Route.MetaArgs) {
// 	const { exchange } = loaderData;
// 	const name = exchange?.nameEn ?? "거래소";
// 	const url = `https://tethergrow.app/exchange/${exchange?.nameEn ?? ""}`;
// 	const image = `https://tethergrow.app/og/tethergrow_opengraph.png`;
// 	return [
// 		{ title: `${loaderData.exchange?.nameEn} | TetherGrow` },
// 		{
// 			name: "description",
// 			content: `${name} - 거래소 정보`,
// 		},
// 		{
// 			name: "keywords",
// 			content: `${name}, TetherGrow, 셀퍼럴, 페이백, 거래소, 코인 거래, AI 분석`,
// 		},
// 		{ property: "og:type", content: "website" },
// 		{
// 			property: "og:title",
// 			content: `${name} | TetherGrow`,
// 		},
// 		{
// 			property: "og:description",
// 			content: `${name} - 거래소 정보`,
// 		},
// 		{
// 			property: "og:image",
// 			content: image,
// 		},
// 		{
// 			property: "og:url",
// 			content: url,
// 		},
// 	];
// }

// export default function ExchangeDetail({ loaderData }: Route.ComponentProps) {
// 	const { exchange } = loaderData;
// 	const { t } = useTranslation();

// 	const howToJoin = [
// 		{
// 			smText: t("exchange.howToJoin.step1.description"),
// 			lgText: `<span class='text-primary font-bold'>${exchange.nameEn} ${t("exchange.howToJoin.step1.linkText")}</span>`,
// 		},
// 		{
// 			smText: t("exchange.howToJoin.step2.description"),
// 			lgText: `<span class='text-primary font-bold'>${exchange.nameEn} ${t("exchange.howToJoin.step2.uidLink")}</span>`,
// 		},
// 		{
// 			smText: t("exchange.howToJoin.step3.description"),
// 			lgText: `<span class='text-primary'>${t("exchange.howToJoin.step3.autoDeposit")}</span>`,
// 		},
// 	];

// 	return (
// 		<article className="mx-auto p-5 max-w-[840px] mt-8 md:mt-30">
// 			<section className="flex flex-col gap-4 md:gap-8">
// 				<div className="flex flex-col items-center gap-4 animate-fadeInUp">
// 					<img
// 						className="size-16 rounded-full object-cover md:size-24"
// 						src={exchange.logo}
// 						alt={exchange.nameEn}
// 					/>
// 					<h1 className="text-2xl font-bold md:text-3xl">{exchange.nameEn}</h1>
// 				</div>

// 				<div className="flex flex-col items-center gap-4 animate-fadeInUp md:flex-row md:justify-center">
// 					<Badge className="flex items-center">
// 						<span className="text-sm md:text-lg">
// 							{t("exchange.orderTypes.limitOrder")}
// 						</span>
// 						<span className="line-through text-xs text-muted-foreground md:text-sm">
// 							{exchange.normalLimitOrder}%
// 						</span>
// 						{/* arrow right*/}
// 						<ArrowRight className="size-2" />
// 						<span className="text-sm md:text-lg">
// 							{exchange.customLimitOrder}%
// 						</span>
// 					</Badge>
// 					<Badge>
// 						<span className="text-sm md:text-lg">
// 							{t("exchange.orderTypes.marketOrder")}
// 						</span>
// 						<span className="line-through text-xs text-muted-foreground md:text-sm">
// 							{exchange.normalMarketOrder}%
// 						</span>
// 						{/* arrow right*/}
// 						<ArrowRight className="size-2" />
// 						<span className="text-sm md:text-lg">
// 							{exchange.customMarketOrder}%
// 						</span>
// 					</Badge>
// 				</div>
// 				{/* 혜택 */}
// 				<div className="grid grid-cols-2 gap-4 max-w-[416px] mx-auto w-full md:flex md:justify-center">
// 					<Card className="flex flex-col gap-4 items-center justify-center relative overflow-hidden md:w-50">
// 						<BorderBeam
// 							duration={6}
// 							size={800}
// 							className="from-transparent red-500 to-transparent"
// 						/>
// 						<BorderBeam
// 							duration={6}
// 							delay={3}
// 							size={800}
// 							borderWidth={2}
// 							className="from-transparent blue-500 to-transparent"
// 						/>
// 						<div className="flex items-center gap-2">
// 							<h2 className=" font-semibold text-muted-foreground text-xs md:text-sm">
// 								{t("exchange.benefits.newBenefit")}
// 							</h2>
// 							<Popover>
// 								<PopoverTrigger asChild>
// 									<Button variant="outline" className="size-1 text-xs p-2">
// 										?
// 									</Button>
// 								</PopoverTrigger>
// 								<PopoverContent className="top-0 p-2 w-fit text-xs md:text-sm">
// 									<p>{t("exchange.benefits.newBenefitTooltip")}</p>
// 								</PopoverContent>
// 							</Popover>
// 						</div>
// 						<p className="text-center md:text-2xl">
// 							<span className="text-primary font-bold">
// 								{t("exchange.benefits.fee")}&nbsp;
// 								<NumberTicker
// 									value={exchange.paybackRate}
// 									className="font-bold dark:text-inherit"
// 								/>
// 								%
// 								<br />
// 							</span>
// 							{t("exchange.benefits.payback")}
// 						</p>
// 					</Card>
// 					<Card className="flex flex-col gap-4 items-center justify-center md:w-50">
// 						<div className="flex items-center gap-2">
// 							<h2 className=" font-semibold text-muted-foreground text-xs md:text-sm">
// 								{t("exchange.benefits.regularBenefit")}
// 							</h2>
// 						</div>
// 						<p className="text-center md:text-2xl">
// 							<span className="text-primary font-bold">
// 								{t("exchange.benefits.fee")}&nbsp;
// 								<NumberTicker
// 									value={50}
// 									className="font-bold dark:text-inherit"
// 								/>
// 								%
// 								<br />
// 							</span>
// 							{t("exchange.benefits.payback")}
// 						</p>
// 					</Card>
// 				</div>
// 				<div className="flex flex-col gap-4 mt-4">
// 					{howToJoin.map((item, index) => (
// 						<div key={index} className="flex flex-col items-center gap-2">
// 							<p className="text-sm text-muted-foreground md:text-lg">
// 								{item.smText}
// 							</p>
// 							<p
// 								className="text-lg break-keep font-bold md:text-2xl"
// 								dangerouslySetInnerHTML={{ __html: item.lgText }}
// 							/>
// 							{index === 0 && (
// 								<Button
// 									className="hidden p-2 md:flex md:text-lg md:my-4"
// 									asChild
// 								>
// 									<Link to={exchange.joinLink} target="_blank">
// 										{exchange.nameEn} {t("exchange.joinButton")}
// 									</Link>
// 								</Button>
// 							)}
// 							{index < howToJoin.length - 1 && (
// 								<ArrowDownCircle size={20} className="text-muted-foreground" />
// 							)}
// 						</div>
// 					))}
// 					<div className="flex flex-col items-center gap-2 mt-8">
// 						<div className="text-4xl md:text-6xl">🤔</div>
// 						<p className="text-lg font-bold md:text-2xl">
// 							{t("exchange.help.title")}
// 						</p>
// 						<p className="text-sm text-muted-foreground md:text-lg">
// 							{t("exchange.help.description")}
// 						</p>
// 						<div className="flex gap-2">
// 							<Button variant="ghost" className="p-2 md:text-lg" asChild>
// 								<Link to="https://www.google.com" target="_blank">
// 									<Highlighter action="highlight">
// 										{t("exchange.help.newRegistration")}
// 									</Highlighter>
// 								</Link>
// 							</Button>
// 							<Button variant="ghost" className=" p-2 md:text-lg" asChild>
// 								<Link to="https://www.google.com" target="_blank">
// 									<Highlighter action="highlight">
// 										{t("exchange.help.changeRegistration")}
// 									</Highlighter>
// 								</Link>
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 			<Button
// 				variant="default"
// 				className="w-[94%] fixed bottom-5 left-[50%] translate-x-[-50%] mx-auto max-w-[840px] md:hidden"
// 				asChild
// 			>
// 				<Link to={exchange.joinLink} target="_blank">
// 					{exchange.nameEn} {t("exchange.joinButton")}
// 				</Link>
// 			</Button>
// 		</article>
// 	);
// }
