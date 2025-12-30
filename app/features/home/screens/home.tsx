// import { LightRays } from "~/core/components/ui/light-rays";
// import type { Route } from "./+types/home";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "~/core/components/ui/card";
// import { data, Link } from "react-router";
// import { AnimatedGradientText } from "~/core/components/ui/animated-gradient-text";
// import { Button } from "~/core/components/ui/button";
// import { apiRequest } from "~/core/lib/api.server";
// import { useTranslation } from "react-i18next";
// import { Badge } from "~/core/components/ui/badge";
// import { MagicCard } from "~/core/components/ui/magic-card";
// import { useTheme } from "remix-themes";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "TetherGrow | AI 기반 거래 분석으로 수익을 높이는 페이백 플랫폼" },
//     {
//       name: "description",
//       content:
//         "단순한 페이백률 비교는 끝! TetherGrow는 AI 거래 분석으로 회원의 수익률을 높이고, 거래 패턴을 개선하여 플랫폼과 회원 모두가 성장하는 혁신적인 셀퍼럴 플랫폼입니다.",
//     },
//     {
//       name: "keywords",
//       content: "TetherGrow, 셀퍼럴, 페이백, 거래소, 코인 거래, AI 분석",
//     },
//     { property: "og:type", content: "website" },
//     {
//       property: "og:title",
//       content: "TetherGrow | AI 거래 분석 페이백 플랫폼",
//     },
//     {
//       property: "og:description",
//       content: "AI 분석으로 거래 패턴을 개선하고 수익률을 높이세요.",
//     },
//     {
//       property: "og:image",
//       content: "https://tethergrow.app/og/tethergrow_opengraph.png",
//     },
//     { property: "og:url", content: "https://tethergrow.app" },
//   ];
// }

// export async function loader({ request }: Route.LoaderArgs) {
//   const exchanges = await apiRequest({
//     request,
//     endpoint: "/exchange/all",
//     method: "GET",
//   });

//   return data({
//     exchanges: exchanges.exchanges,
//   });
// }

// export default function Home({ loaderData }: Route.ComponentProps) {
//   const { exchanges } = loaderData;
//   const [theme] = useTheme();
//   const { t } = useTranslation();

//   return (
//     <article className="flex flex-col gap-8">
//       {/* Hero */}
//       <section className="relative h-[320px] w-full overflow-hidden ">
//         <LightRays />
//         <div className="flex flex-col items-center justify-center absolute inset-0">
//           <p className="text-lg break-keep text-center"></p>
//           <h1 className="text-2xl font-bold text-center">
//             {t("home.hero.titleLine1")}
//             <br />
//             <AnimatedGradientText
//               speed={1}
//               colorFrom="#8b5cf6"
//               colorTo="#06b6d4"
//             >
//               {t("home.hero.titleLine2")}
//               <br />
//               {t("home.hero.titleLine3")}
//             </AnimatedGradientText>
//           </h1>
//           <br />
//           <h2 className="text-sm text-muted-foreground text-center mt-2">
//             {t("home.hero.subtitle")}
//           </h2>
//           {/* CTA */}
//           <div className="mt-8">
//             <Button asChild>
//               <Link to="/auth/login">{t("home.hero.ctaButton")}</Link>
//             </Button>
//             {/* FIXME: 대쉬보드 이동 또는 uid 검색 */}
//             {/* <Link to="/auth/login">AI Analytics 보러가기</Link> */}
//           </div>
//         </div>
//       </section>

//       {/* Exchanges */}
//       <section className="mx-auto p-5 w-full max-w-[840px] lg:p-0">
//         <h2 className="text-lg font-semibold">{t("home.exchanges.title")}</h2>
//         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {exchanges.map((item: any) => {
//             return (
//               <Link to={`/exchange/${item.nameEn}`} key={item.nameEn}>
//                 <Card key={item._id} className="p-0 border-none shadow-none">
//                   <MagicCard
//                     gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//                     className="py-4"
//                   >
//                     <CardHeader>
//                       <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-4">
//                         <div className="flex items-center gap-2">
//                           <img
//                             className="size-8 rounded-full object-cover"
//                             src={item.logo}
//                             alt={item.nameEn}
//                           />
//                           <CardTitle className="text-lg">
//                             {item.nameEn}
//                           </CardTitle>
//                         </div>
//                         <Badge variant="secondary" className="text-sm">
//                           {t("exchange.benefits.payback")}
//                           <span className="font-bold text-primary">
//                             {item.paybackRate}%
//                           </span>
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center gap-4">
//                         <p className="text-md text-muted-foreground font-bold">
//                           {t("exchange.orderTypes.limitOrder")}
//                         </p>
//                         <p className="text-lg font-bold">
//                           {item.customLimitOrder}%
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <p className="text-md text-muted-foreground font-bold">
//                           {t("exchange.orderTypes.marketOrder")}
//                         </p>
//                         <p className="text-lg font-bold">
//                           {item.customMarketOrder}%
//                         </p>
//                       </div>
//                     </CardContent>
//                   </MagicCard>
//                 </Card>
//               </Link>
//             );
//           })}
//         </div>
//       </section>
//     </article>
//   );
// }
