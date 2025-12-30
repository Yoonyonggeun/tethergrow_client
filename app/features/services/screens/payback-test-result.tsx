// import { useState, useEffect } from "react";
// import type { Route } from "./+types/payback-test-result";
// import { useNavigate } from "react-router";
// import { Button } from "~/core/components/ui/button";
// import { Card, CardContent } from "~/core/components/ui/card";
// import { MagicCard } from "~/core/components/ui/magic-card";
// import { Badge } from "~/core/components/ui/badge";
// import { useTheme } from "remix-themes";
// import {
//   Sparkles,
//   TrendingUp,
//   Zap,
//   FlaskConical,
//   GraduationCap,
//   Crown,
//   Shield,
//   BarChart,
//   Flame,
//   Eye,
//   Activity,
//   Gauge,
//   Rocket,
// } from "lucide-react";
// import { cn } from "~/core/lib/utils";

// type ResultData = {
//   selectedExchangeData: any;
//   entrySeed: string;
//   leverage: string;
//   tradingFrequency: number;
//   thirtyDayPayback: { krw: number; usdt: number };
//   sixMonthPayback: { krw: number; usdt: number };
//   monthlyLosses: Array<{ month: string; krw: number; usdt: number }>;
// };

// // 거래 성향 유형 정의 함수들
// const getSeedProfile = (seed: number) => {
//   if (seed < 100)
//     return {
//       type: "소액 · 실험형",
//       description: `약 ${Math.round(seed)} USDT`,
//       icon: FlaskConical,
//       color: "text-purple-600 dark:text-purple-400",
//       bgColor: "bg-purple-100 dark:bg-purple-900/30",
//     };
//   if (seed < 500)
//     return {
//       type: "중소액 · 학습형",
//       description: `약 ${Math.round(seed)} USDT`,
//       icon: GraduationCap,
//       color: "text-blue-600 dark:text-blue-400",
//       bgColor: "bg-blue-100 dark:bg-blue-900/30",
//     };
//   if (seed < 2000)
//     return {
//       type: "중액 · 활동형",
//       description: `약 ${Math.round(seed)} USDT`,
//       icon: TrendingUp,
//       color: "text-green-600 dark:text-green-400",
//       bgColor: "bg-green-100 dark:bg-green-900/30",
//     };
//   return {
//     type: "대액 · 전문가형",
//     description: `약 ${Math.round(seed)} USDT`,
//     icon: Crown,
//     color: "text-amber-600 dark:text-amber-400",
//     bgColor: "bg-amber-100 dark:bg-amber-900/30",
//   };
// };

// const getLeverageProfile = (leverage: number) => {
//   if (leverage <= 5)
//     return {
//       type: "보수형",
//       description: `${leverage}x`,
//       icon: Shield,
//       color: "text-blue-600 dark:text-blue-400",
//       bgColor: "bg-blue-100 dark:bg-blue-900/30",
//     };
//   if (leverage <= 20)
//     return {
//       type: "안정형",
//       description: `${leverage}x`,
//       icon: BarChart,
//       color: "text-green-600 dark:text-green-400",
//       bgColor: "bg-green-100 dark:bg-green-900/30",
//     };
//   if (leverage <= 50)
//     return {
//       type: "공격형",
//       description: `${leverage}x`,
//       icon: Zap,
//       color: "text-orange-600 dark:text-orange-400",
//       bgColor: "bg-orange-100 dark:bg-orange-900/30",
//     };
//   return {
//     type: "극공격형",
//     description: `${leverage}x`,
//     icon: Flame,
//     color: "text-red-600 dark:text-red-400",
//     bgColor: "bg-red-100 dark:bg-red-900/30",
//   };
// };

// const getFrequencyProfile = (frequency: number) => {
//   if (frequency === 1)
//     return {
//       type: "저빈도 · 관망형",
//       description: "하루 1회",
//       icon: Eye,
//       color: "text-gray-600 dark:text-gray-400",
//       bgColor: "bg-gray-100 dark:bg-gray-900/30",
//     };
//   if (frequency <= 5)
//     return {
//       type: "중빈도 · 활동형",
//       description: `하루 ${frequency}회`,
//       icon: Activity,
//       color: "text-blue-600 dark:text-blue-400",
//       bgColor: "bg-blue-100 dark:bg-blue-900/30",
//     };
//   if (frequency <= 20)
//     return {
//       type: "고빈도 · 스캘핑",
//       description: `하루 ${frequency}회`,
//       icon: Gauge,
//       color: "text-orange-600 dark:text-orange-400",
//       bgColor: "bg-orange-100 dark:bg-orange-900/30",
//     };
//   return {
//     type: "초고빈도 · 데이트레이딩",
//     description: `하루 ${frequency}회 이상`,
//     icon: Rocket,
//     color: "text-red-600 dark:text-red-400",
//     bgColor: "bg-red-100 dark:bg-red-900/30",
//   };
// };

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "페이백 테스트 결과 | TetherGrow" },
//     {
//       name: "description",
//       content: "AI 시뮬레이션 결과를 확인하세요",
//     },
//   ];
// }

// export default function PaybackTestResult() {
//   const [theme] = useTheme();
//   const navigate = useNavigate();
//   const [resultData, setResultData] = useState<ResultData | null>(null);

//   useEffect(() => {
//     // 세션 스토리지에서 결과 데이터 가져오기
//     const storedData = sessionStorage.getItem("paybackTestResult");
//     if (storedData) {
//       try {
//         const data = JSON.parse(storedData);
//         setResultData(data);
//       } catch (error) {
//         console.error("Failed to parse result data", error);
//         navigate("/payback-test");
//       }
//     } else {
//       // 데이터가 없으면 테스트 페이지로 리다이렉트
//       navigate("/payback-test");
//     }
//   }, [navigate]);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("ko-KR").format(Math.round(amount));
//   };

//   if (!resultData) {
//     return null; // 로딩 중 또는 리다이렉트 중
//   }

//   const {
//     selectedExchangeData,
//     entrySeed,
//     leverage,
//     tradingFrequency,
//     thirtyDayPayback,
//     sixMonthPayback,
//   } = resultData;

//   const entrySeedNum = parseFloat(entrySeed);
//   const leverageNum = parseInt(leverage);

//   const seedProfile = getSeedProfile(entrySeedNum);
//   const leverageProfile = getLeverageProfile(leverageNum);
//   const frequencyProfile = getFrequencyProfile(tradingFrequency);

//   // AI 대시보드 구독료 상쇄 가능 여부 계산 (월 20 USDT 기준)
//   const monthlySubscriptionFee = 20;
//   const canCoverSubscription = thirtyDayPayback.usdt >= monthlySubscriptionFee;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       {/* 블록 A: AI 시뮬레이션 3줄 요약 */}
//       <Card className="mb-6">
//         <CardContent className="p-8">
//           <div className="space-y-6">
//             {/* 헤더 */}
//             <div className="text-center space-y-3">
//               <Badge
//                 variant="secondary"
//                 className="mt-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
//               >
//                 <Sparkles className="size-3 mr-1" />
//                 A.I
//               </Badge>
//               <div className="flex items-center justify-center gap-3">
//                 <img
//                   src={selectedExchangeData.logo}
//                   alt={selectedExchangeData.nameEn}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <h1 className="text-2xl font-bold">
//                     {selectedExchangeData.nameEn} 예상 페이백 A.I 분석 결과
//                   </h1>
//                 </div>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
//                 TetherGrow AI가 입력하신 진입시드 · 레버리지 · 거래 빈도를
//                 기준으로, 일반적인 선물 수수료 구조를 적용해 예상 페이백 규모를
//                 추정했습니다.
//                 <br />
//                 <span className="text-xs italic">
//                   (실제 거래 기록을 분석한 결과는 아닙니다.)
//                 </span>
//               </p>
//             </div>

//             {/* 3줄 요약 */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* 30일 기준 */}
//               <MagicCard
//                 gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//                 className="p-6"
//               >
//                 <div className="space-y-2 text-center">
//                   <p className="text-xs text-muted-foreground">
//                     30일 기준 예상 페이백
//                   </p>
//                   <p className="text-3xl font-bold text-primary">
//                     {formatCurrency(thirtyDayPayback.usdt)} USDT
//                   </p>
//                 </div>
//               </MagicCard>

//               {/* 6개월 누적 */}
//               <MagicCard
//                 gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//                 className="p-6"
//               >
//                 <div className="space-y-2 text-center">
//                   <p className="text-xs text-muted-foreground">
//                     6개월 동일 패턴 유지 시
//                   </p>
//                   <p className="text-3xl font-bold text-primary">
//                     {formatCurrency(sixMonthPayback.usdt)} USDT
//                   </p>
//                   <p className="text-xs text-muted-foreground">누적 페이백</p>
//                 </div>
//               </MagicCard>

//               {/* 구독료 상쇄 */}
//               <MagicCard
//                 gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//                 className={cn(
//                   "p-6",
//                   canCoverSubscription && "border-2 border-primary/20"
//                 )}
//               >
//                 <div className="space-y-2 text-center">
//                   <p className="text-xs text-muted-foreground">
//                     AI 대시보드 구독료
//                   </p>
//                   <div className="flex items-center justify-center gap-2">
//                     {canCoverSubscription ? (
//                       <>
//                         <TrendingUp className="size-4 text-green-500" />
//                         <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                           충분히 상쇄 가능
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <Zap className="size-4 text-muted-foreground" />
//                         <p className="text-lg font-bold text-muted-foreground">
//                           부분 상쇄 가능
//                         </p>
//                       </>
//                     )}
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     (월 {monthlySubscriptionFee} USDT 기준)
//                   </p>
//                 </div>
//               </MagicCard>
//             </div>

//             {/* 인사이트 */}
//             <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
//               <p className="text-sm">
//                 {canCoverSubscription ? (
//                   <>
//                     이 정도 패턴이라면, AI 대시보드 구독(월{" "}
//                     {monthlySubscriptionFee} USDT)을 받을 수 있는 수준입니다.
//                   </>
//                 ) : (
//                   <>
//                     이 정도 패턴이라면, AI 대시보드 구독(월{" "}
//                     {monthlySubscriptionFee} USDT)을 받기 위해서는 거래량을 더
//                     늘려 페이백을 {monthlySubscriptionFee} USDT 이상으로 늘려야
//                     합니다. TetherGrow AI와 함꼐 해보세요.
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 블록 B: 입력값 기반 거래 성향 프로파일 */}
//       <Card className="mb-6">
//         <CardContent className="p-8">
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold mb-4">거래 성향 프로파일</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* 시드 규모 */}
//               <div
//                 className={cn(
//                   "space-y-3 p-4 rounded-lg border bg-card",
//                   seedProfile.bgColor
//                 )}
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={cn(
//                       "p-2 rounded-lg",
//                       seedProfile.bgColor,
//                       "border border-current/20"
//                     )}
//                   >
//                     <seedProfile.icon
//                       className={cn("size-5", seedProfile.color)}
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground">시드 규모</p>
//                 </div>
//                 <p className={cn("text-lg font-semibold", seedProfile.color)}>
//                   {seedProfile.type}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {seedProfile.description}
//                 </p>
//               </div>

//               {/* 레버리지 성향 */}
//               <div
//                 className={cn(
//                   "space-y-3 p-4 rounded-lg border bg-card",
//                   leverageProfile.bgColor
//                 )}
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={cn(
//                       "p-2 rounded-lg",
//                       leverageProfile.bgColor,
//                       "border border-current/20"
//                     )}
//                   >
//                     <leverageProfile.icon
//                       className={cn("size-5", leverageProfile.color)}
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground">레버리지 성향</p>
//                 </div>
//                 <p
//                   className={cn("text-lg font-semibold", leverageProfile.color)}
//                 >
//                   {leverageProfile.type}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {leverageProfile.description}
//                 </p>
//               </div>

//               {/* 거래 스타일 */}
//               <div
//                 className={cn(
//                   "space-y-3 p-4 rounded-lg border bg-card",
//                   frequencyProfile.bgColor
//                 )}
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={cn(
//                       "p-2 rounded-lg",
//                       frequencyProfile.bgColor,
//                       "border border-current/20"
//                     )}
//                   >
//                     <frequencyProfile.icon
//                       className={cn("size-5", frequencyProfile.color)}
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground">거래 스타일</p>
//                 </div>
//                 <p
//                   className={cn(
//                     "text-lg font-semibold",
//                     frequencyProfile.color
//                   )}
//                 >
//                   {frequencyProfile.type}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {frequencyProfile.description}
//                 </p>
//               </div>
//             </div>

//             {/* <div className="mt-4 p-4 bg-muted/30 rounded-lg">
//               <p className="text-xs text-muted-foreground">
//                 위 수치는 사용자님이 입력하신 조건을 바탕으로 가정한 거래
//                 패턴입니다.
//                 <br />
//                 실제 손익·강제청산·복수매매 이력까지 포함한 정밀 분석은, 실제
//                 거래 기록을 연결한 AI 대시보드에서 제공될 예정입니다.
//               </p>
//             </div> */}
//           </div>
//         </CardContent>
//       </Card>

//       {/* 블록 C: CTA */}
//       <Card>
//         <CardContent className="p-8">
//           <div className="space-y-4 text-center">
//             <h2 className="text-xl font-bold">
//               지금은 입력값 기반 AI 분석, 이후에는 실거래 기반 AI 분석
//             </h2>
//             <div className="space-y-3 text-sm text-muted-foreground max-w-2xl mx-auto">
//               <p>
//                 지금 보신 내용은 사용자가 입력한 조건을 바탕으로 산출된 ‘예측
//                 결과’입니다.
//               </p>
//               <p>
//                 하지만 실제 트레이딩 패턴을 정확히 파악하려면
//                 <br />
//                 체결 이력·레버리지 조정·강제 청산 여부 등 실거래 데이터가 함께
//                 필요합니다.
//               </p>
//               <p className="font-semibold text-foreground">
//                 TetherGrow AI 대시보드에서는 거래소 API(Read-Only) 연동을 통해,
//                 <br />
//                 예상 페이백 규모는 물론, 실제 손익 패턴과 ‘필살기 패턴·치명적
//                 습관’까지
//                 <br />
//                 정밀하게 분석해 드릴 예정입니다.
//               </p>
//             </div>

//             <div className="pt-4">
//               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={() => navigate("/payback-test")}
//                 >
//                   다시 테스트하기
//                 </Button>
//                 <Button
//                   size="lg"
//                   onClick={() => {
//                     // TODO: 거래소 연동 및 AI 분석 결과 받기 기능 구현
//                     // 예: navigate(`/dashboard/${selectedExchangeData.detailPageParams}`)
//                     console.log(
//                       "거래소 연동 및 AI 분석 결과 받기 클릭됨",
//                       selectedExchangeData
//                     );
//                   }}
//                 >
//                   {selectedExchangeData.nameEn} 연동하고 AI 분석결과 받기
//                 </Button>
//               </div>
//               <p className="text-xs text-muted-foreground mt-3">
//                 TetherGrow AI 분석 서비스를 구독하고 실제 거래 데이터를 기반으로
//                 한 '필살기 패턴 탐색 리포트'를 제공받으세요.
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 하단 안내 */}
//       {/* <div className="mt-6 p-4 bg-muted/30 rounded-lg">
//         <p className="text-xs text-center text-muted-foreground">
//           본 결과는 입력값과 일반적인 수수료 구조를 기반으로 예측된 수치이며,
//           실제 거래 기록 분석은 AI 대시보드에서 제공됩니다.
//         </p>
//       </div> */}
//     </div>
//   );
// }
