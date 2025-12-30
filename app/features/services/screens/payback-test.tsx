// import { useState, useEffect } from "react";
// import type { Route } from "./+types/payback-test";
// import { data, useNavigate } from "react-router";
// import { apiRequest } from "~/core/lib/api.server";
// import { Button } from "~/core/components/ui/button";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
//   InputGroupText,
//   InputGroupButton,
// } from "~/core/components/ui/input-group";
// import { Card, CardContent } from "~/core/components/ui/card";
// import { MorphingText } from "~/core/components/ui/morphing-text";
// import { Trash2 } from "lucide-react";
// import { cn } from "~/core/lib/utils";
// import { MagicCard } from "~/core/components/ui/magic-card";
// import { useTheme } from "remix-themes";
// import { Progress } from "~/core/components/ui/progress";

// // 페이백 테스트 수수료율 (0.03%)
// const PAYBACK_TEST_FEE_RATE = 0.000102;
// // 페이백율 (100%)
// const PAYBACK_RATE = 1.0;
// // USDT-원화 환율 (임시, 나중에 API로 교체)
// const USDT_TO_KRW_RATE = 1400;

// // 거래 빈도 옵션
// const TRADING_FREQUENCY_OPTIONS = [
//   { label: "하루에 1번 할까 말까해요", value: 1 },
//   { label: "하루에 1회 - 2회 거래해요", value: 2 },
//   { label: "하루에 2회 - 5회 거래해요", value: 5 },
//   { label: "하루에 5회 - 10회 거래해요", value: 10 },
//   { label: "하루에 10회 이상 거래해요", value: 20 },
// ];

// // 계산 중 워딩들
// const AI_ANALYSIS_TEXTS = [
//   "입력 정보 확인 중...",
//   "데이터 처리 중...",
//   "결과 도출 중...",
//   "최종 검토 중...",
//   "계산 완료 중...",
// ];

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "페이백 테스트 | TetherGrow" },
//     {
//       name: "description",
//       content: "거래소별 예상 페이백을 계산해보세요",
//     },
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

// type Step = 1 | 2 | 3 | 4 | 5;

// export default function PaybackTest({ loaderData }: Route.ComponentProps) {
//   const { exchanges } = loaderData;
//   const [theme] = useTheme();
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState<Step>(1);
//   const [selectedExchangeId, setSelectedExchangeId] = useState<string | null>(
//     null
//   );
//   const [selectedExchangeData, setSelectedExchangeData] = useState<any | null>(
//     null
//   );
//   const [entrySeed, setEntrySeed] = useState<string>("");
//   const [leverage, setLeverage] = useState<string>("");
//   const [tradingFrequency, setTradingFrequency] = useState<number | null>(null);

//   // 페이백 계산 함수
//   const calculatePayback = (
//     entrySeed: number,
//     leverage: number,
//     tradingFrequency: number,
//     days: number
//   ) => {
//     const result =
//       entrySeed *
//       leverage *
//       tradingFrequency *
//       PAYBACK_TEST_FEE_RATE *
//       PAYBACK_RATE *
//       days;
//     return {
//       usdt: result,
//       krw: result * USDT_TO_KRW_RATE,
//     };
//   };

//   // 결과 보기 클릭 시 로딩 화면으로 이동
//   const handleShowResults = () => {
//     if (!entrySeed || !leverage || tradingFrequency === null) return;
//     // 로딩 화면으로 이동
//     setCurrentStep(5);
//   };

//   // 로딩 완료 후 결과 페이지로 이동
//   useEffect(() => {
//     if (
//       currentStep === 5 &&
//       entrySeed &&
//       leverage &&
//       tradingFrequency !== null
//     ) {
//       const timer = setTimeout(() => {
//         const entrySeedNum = parseFloat(entrySeed);
//         const leverageNum = parseInt(leverage);

//         // 30일 기준 계산
//         const thirtyDay = calculatePayback(
//           entrySeedNum,
//           leverageNum,
//           tradingFrequency,
//           30
//         );

//         // 6개월 기준 계산
//         const sixMonth = calculatePayback(
//           entrySeedNum,
//           leverageNum,
//           tradingFrequency,
//           180
//         );

//         // 월별 손실 계산 (현재 월 포함 6개월)
//         const currentDate = new Date();
//         const losses: Array<{ month: string; krw: number; usdt: number }> = [];
//         for (let i = 0; i < 6; i++) {
//           const targetMonth = currentDate.getMonth() + i;
//           const targetYear = currentDate.getFullYear();
//           const date = new Date(targetYear, targetMonth, 1);
//           const monthName = `${date.getMonth() + 1}월`;
//           const monthlyPayback = calculatePayback(
//             entrySeedNum,
//             leverageNum,
//             tradingFrequency,
//             30
//           );
//           losses.push({
//             month: monthName,
//             krw: monthlyPayback.krw,
//             usdt: monthlyPayback.usdt,
//           });
//         }

//         // 결과 데이터를 세션 스토리지에 저장
//         const resultData = {
//           selectedExchangeData,
//           entrySeed,
//           leverage,
//           tradingFrequency,
//           thirtyDayPayback: thirtyDay,
//           sixMonthPayback: sixMonth,
//           monthlyLosses: losses,
//         };
//         sessionStorage.setItem("paybackTestResult", JSON.stringify(resultData));
//         // 결과 페이지로 이동
//         navigate("/payback-test-result");
//       }, 3000); // 3초 후 결과 페이지로 전환
//       return () => clearTimeout(timer);
//     }
//   }, [
//     currentStep,
//     entrySeed,
//     leverage,
//     tradingFrequency,
//     selectedExchangeData,
//     navigate,
//   ]);

//   // 숫자만 입력 가능하도록 처리
//   const handleNumericInput = (
//     value: string,
//     setter: (value: string) => void,
//     maxLength?: number
//   ) => {
//     const numericValue = value.replace(/[^0-9]/g, "");
//     if (maxLength && numericValue.length > maxLength) return;
//     setter(numericValue);
//   };

//   // 레버리지 입력 처리 (1-125 범위)
//   const handleLeverageChange = (value: string) => {
//     const numericValue = value.replace(/[^0-9]/g, "");
//     if (numericValue === "") {
//       setLeverage("");
//       return;
//     }
//     const num = parseInt(numericValue);
//     if (num === 0) {
//       setLeverage("1");
//     } else if (num > 125) {
//       setLeverage("125");
//     } else {
//       setLeverage(numericValue);
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < 5) {
//       setCurrentStep((prev) => (prev + 1) as Step);
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => (prev - 1) as Step);
//     }
//   };

//   // 단계 변경 시 스크롤을 최상단으로 이동
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentStep]);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("ko-KR").format(Math.round(amount));
//   };

//   // 진행률 계산 (총 8단계)
//   const progressValue = (currentStep / 8) * 100;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       {/* 진행 단계 표시 */}
//       <div className="mb-8">
//         <Progress value={progressValue} className="h-2" />
//       </div>

//       {/* 스텝별 컨텐츠 */}
//       <Card className="min-h-[400px]">
//         <CardContent className="p-8">
//           {/* 1단계: 거래소 선택 */}
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-center">
//                 거래소를 선택해주세요
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {exchanges.map((exchange: any) => (
//                   <button
//                     key={exchange._id}
//                     onClick={() => {
//                       setSelectedExchangeId(exchange._id);
//                       setSelectedExchangeData(exchange);
//                     }}
//                     className={cn(
//                       "p-4 rounded-lg border-2 transition-all",
//                       selectedExchangeId === exchange._id
//                         ? "border-primary bg-primary/10"
//                         : "border-muted hover:border-primary/50"
//                     )}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={exchange.logo}
//                         alt={exchange.nameEn}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div className="text-left">
//                         <p className="font-semibold">{exchange.nameEn}</p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* 2단계: 진입시드 입력 */}
//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-center">
//                 진입시드를 입력해주세요
//               </h2>
//               <div className="max-w-md mx-auto">
//                 <InputGroup>
//                   <InputGroupInput
//                     type="text"
//                     inputMode="numeric"
//                     value={entrySeed}
//                     onChange={(e) =>
//                       handleNumericInput(e.target.value, setEntrySeed, 20)
//                     }
//                     placeholder="진입시드를 입력하세요"
//                   />
//                   <InputGroupAddon align="inline-end">
//                     <InputGroupText>USDT</InputGroupText>
//                   </InputGroupAddon>
//                 </InputGroup>
//               </div>
//             </div>
//           )}

//           {/* 3단계: 레버리지 입력 */}
//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-center">
//                 레버리지를 입력해주세요
//               </h2>
//               <div className="max-w-md mx-auto">
//                 <InputGroup>
//                   <InputGroupInput
//                     type="text"
//                     inputMode="numeric"
//                     value={leverage}
//                     onChange={(e) => handleLeverageChange(e.target.value)}
//                     placeholder="1-125 사이의 값을 입력하세요"
//                   />
//                   <InputGroupAddon align="inline-end">
//                     <InputGroupButton
//                       onClick={() => setLeverage("")}
//                       disabled={!leverage}
//                     >
//                       <Trash2 className="size-4" />
//                     </InputGroupButton>
//                   </InputGroupAddon>
//                 </InputGroup>
//                 <p className="text-sm text-muted-foreground text-center mt-2">
//                   1-125 사이의 정수만 입력 가능합니다
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* 4단계: 거래 빈도 선택 */}
//           {currentStep === 4 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-center">
//                 거래 빈도를 선택해주세요
//               </h2>
//               <div className="space-y-3 max-w-2xl mx-auto">
//                 {TRADING_FREQUENCY_OPTIONS.map((option) => (
//                   <button
//                     key={option.value}
//                     onClick={() => setTradingFrequency(option.value)}
//                     className={cn(
//                       "w-full p-4 rounded-lg border-2 text-left transition-all",
//                       tradingFrequency === option.value
//                         ? "border-primary bg-primary/10"
//                         : "border-muted hover:border-primary/50"
//                     )}
//                   >
//                     <p className="font-medium">{option.label}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* 5단계: AI 분석 로딩 */}
//           {currentStep === 5 && (
//             <div className="space-y-8 flex flex-col items-center justify-center min-h-[400px]">
//               <div className="w-full">
//                 <MorphingText
//                   texts={AI_ANALYSIS_TEXTS}
//                   className="text-2xl md:text-3xl lg:text-3xl"
//                 />
//               </div>
//               {/* <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" /> */}
//               <p className="text-muted-foreground text-center">
//                 입력하신 정보를 기반으로 계산 중입니다...
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* 네비게이션 버튼 - 분석 중(5단계)일 때는 표시하지 않음 */}
//       {currentStep !== 5 && (
//         <div className="flex justify-between mt-8">
//           <Button
//             variant="outline"
//             onClick={handlePrev}
//             disabled={currentStep === 1}
//           >
//             이전
//           </Button>
//           {currentStep === 4 ? (
//             <Button
//               onClick={handleShowResults}
//               disabled={tradingFrequency === null}
//             >
//               결과 보기
//             </Button>
//           ) : currentStep < 5 ? (
//             <Button
//               onClick={handleNext}
//               disabled={
//                 (currentStep === 1 && !selectedExchangeId) ||
//                 (currentStep === 2 && entrySeed.length === 0) ||
//                 (currentStep === 3 && leverage.length === 0)
//               }
//             >
//               다음
//             </Button>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// }
