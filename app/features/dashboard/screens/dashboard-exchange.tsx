// import { apiRequest } from "~/core/lib/api.server";
// import {
//   ComposedChart,
//   Line,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
// } from "recharts";
// import { data, useNavigation, useFetcher } from "react-router";
// import type { Route } from "./+types/dashboard-exchange";
// import { CheckCircle2, Loader2 } from "lucide-react";
// import { useEffect, useMemo } from "react";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "~/core/components/ui/card";
// import { Input } from "~/core/components/ui/input";
// import { Button } from "~/core/components/ui/button";
// import { Label } from "~/core/components/ui/label";
// import { useForm } from "@tanstack/react-form";
// import { uidFormSchema } from "~/features/dashboard/schema";
// import { useTranslation } from "react-i18next";
// import { useGeetestCaptcha } from "~/core/hooks/useGeetestCaptcha";
// import GeetestCaptcha from "~/core/components/captcha";
// import { toast } from "sonner";
// import { FieldError } from "~/core/components/ui/field";

// export async function loader({ request, params }: Route.LoaderArgs) {
//   const { dashboardPageParams } = params;
//   // 1) 거래소 기본 정보
//   const exchange = await apiRequest({
//     request,
//     endpoint: `/exchange/detail?exchangeName=${dashboardPageParams}`,
//     method: "GET",
//   });

//   const exchangeID = exchange.exchange._id;

//   // 2) 회원-거래소 연동 상태
//   // 3) Bitget 선물 체결 데이터 수집 상태
//   const [integrationRes, dataStatusRes, timelineRes] = await Promise.all([
//     apiRequest({
//       request,
//       endpoint: `/my-page/integration/status?exchangeID=${exchangeID}`,
//       method: "GET",
//     }),
//     apiRequest({
//       request,
//       endpoint: `/bitget-api/data-status?exchangeID=${exchangeID}`,
//       method: "GET",
//     }),
//     apiRequest({
//       request,
//       endpoint: `/bitget-api/futures/timeline?exchangeID=${exchangeID}&range=30d&productType=USDT-FUTURES`,
//       method: "GET",
//     }),
//     apiRequest({
//       request,
//       endpoint: `/bitget-api/top-symbols?exchangeID=${exchangeID}&range=30d&productType=USDT-FUTURES`,
//       method: "GET",
//     }),
//   ]);

//   let overview: any = null;
//   let funding: any = null;
//   let fundingSymbolUsed: string | null = null;
//   let fundingSymbolReason: "top-symbol" | "fallback" | null = null;
//   let tradeSummary: any = null;
//   let topSymbols: any[] = [];
//   let insights: any = null;

//   // 4) 연동이 "approved" 인 경우에만 overview / funding 호출
//   if (integrationRes.integration?.status === "approved") {
//     try {
//       // 1) 실시간 개요
//       overview = await apiRequest({
//         request,
//         endpoint: `/bitget-api/overview?exchangeID=${exchangeID}&productType=USDT-FUTURES`,
//         method: "GET",
//       });

//       // 2) 최근 30일 요약
//       const tradeSummaryRes = await apiRequest({
//         request,
//         endpoint: `/bitget-api/trade-summary?exchangeID=${exchangeID}&range=30d`,
//         method: "GET",
//       });
//       tradeSummary = tradeSummaryRes.data;

//       // 3) 심볼별 브레이크다운
//       const topSymbolsRes = await apiRequest({
//         request,
//         endpoint: `/bitget-api/top-symbols?exchangeID=${exchangeID}&range=30d&productType=USDT-FUTURES&limit=5`,
//         method: "GET",
//       });
//       topSymbols = topSymbolsRes.data || [];

//       // 4) Funding에 사용할 심볼 결정
//       if (Array.isArray(topSymbols) && topSymbols.length > 0) {
//         fundingSymbolUsed = topSymbols[0].symbol; // 가장 많이 거래한 코인
//         fundingSymbolReason = "top-symbol";
//       } else {
//         fundingSymbolUsed = "BTCUSDT"; // 거래 내역 없으면 BTCUSDT 기본
//         fundingSymbolReason = "fallback";
//       }

//       // 5) Funding 호출
//       funding = await apiRequest({
//         request,
//         endpoint: `/bitget-api/funding?symbol=${fundingSymbolUsed}&productType=USDT-FUTURES`,
//         method: "GET",
//       });
//       // AI 인사이트 최신 1개 조회
//       const insightsRes = await apiRequest({
//         request,
//         endpoint: `/bitget-api/insights/get?exchangeID=${exchangeID}&productType=USDT-FUTURES`,
//         method: "GET",
//       });
//       insights = insightsRes.data || null;
//     } catch (e) {
//       // overview / funding 실패해도 페이지 전체가 죽지는 않도록
//       console.error("overview/funding load error", e);
//     }
//   }

//   return {
//     exchangeID,
//     integration: integrationRes.integration,
//     uid: integrationRes.uid,
//     dataStatus: dataStatusRes, // { hasData, totals, lastJob }
//     timeline: timelineRes,
//     overview,
//     funding,
//     fundingSymbolUsed,
//     fundingSymbolReason,
//     tradeSummary,
//     topSymbols,
//     insights,
//   };
// }

// export default function DashboardExchange({
//   loaderData,
//   actionData,
// }: Route.ComponentProps) {
//   const {
//     exchangeID,
//     integration,
//     uid,
//     dataStatus,
//     timeline,
//     overview,
//     funding,
//     fundingSymbolUsed,
//     fundingSymbolReason,
//     tradeSummary,
//     topSymbols,
//     insights,
//   } = loaderData;
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";
//   const { t, i18n } = useTranslation();
//   const connectUidFetcher = useFetcher<typeof action>();

//   // UID 폼 스키마
//   const uidFormSchemaMemo = useMemo(() => uidFormSchema(t), [i18n.language]);

//   // Geetest 캡차 Hook
//   const {
//     captchaConfig,
//     showCaptcha,
//     getValidate,
//     reset: resetCaptcha,
//     isInitialized,
//   } = useGeetestCaptcha({
//     captchaId: import.meta.env.VITE_GEETEST_CAPTCHA_ID,
//     language: "kor",
//     product: "bind",
//     onSuccess: () => {
//       uidForm.handleSubmit();
//     },
//   });

//   // TanStack Form 설정
//   const uidForm = useForm({
//     defaultValues: {
//       uid: "",
//       exchangeID: exchangeID,
//     },
//     validators: {
//       onChange: uidFormSchemaMemo,
//       onSubmit: uidFormSchemaMemo,
//     },
//     onSubmit: async ({ value }) => {
//       // 캡차 초기화 확인
//       if (!isInitialized()) {
//         toast.error("캡차 초기화 중입니다. 잠시만 기다려주세요.", {
//           position: "bottom-right",
//         });
//         return;
//       }

//       // 캡차 검증 결과 가져오기
//       const captchaResult = getValidate();

//       if (!captchaResult) {
//         // bind 모드면 캡차 팝업 표시
//         const shown = showCaptcha();

//         if (!shown) {
//           toast.error("캡차를 완료해주세요.", {
//             position: "bottom-right",
//           });
//         }
//         return;
//       }

//       // 캡차 결과가 있으면 action으로 폼 정보 제출
//       connectUidFetcher.submit(
//         {
//           _action: "connect-uid",
//           exchangeID: value.exchangeID,
//           uid: value.uid,
//         },
//         {
//           method: "POST",
//           encType: "application/x-www-form-urlencoded",
//         }
//       );

//       // 제출 후 캡차 리셋
//       resetCaptcha();
//     },
//   });

//   // connectUidFetcher 응답 처리
//   useEffect(() => {
//     if (connectUidFetcher.state === "idle" && connectUidFetcher.data) {
//       const isIntegration = connectUidFetcher.data.result.integration;
//       if (isIntegration) {
//         toast.success(
//           "UID가 등록되었습니다. 관리자가 승인하면 연동이 활성화됩니다.",
//           {
//             position: "bottom-right",
//           }
//         );
//       } else {
//         toast.error(
//           `${t(`error.integration.${connectUidFetcher.data.result.code}`)}`
//         );
//       }
//     }
//   }, [connectUidFetcher.state, connectUidFetcher.data]);

//   // action 결과 분기 (다른 액션들용)
//   const lastAction = (actionData || null) as {
//     _action: string;
//     result: any;
//   } | null;
//   const saveApiKeysResult =
//     lastAction?._action === "save-api-keys" ? lastAction.result : null;
//   const ingestResult =
//     lastAction?._action === "start-ingest" ? lastAction.result : null;
//   const insightsBuildResult =
//     lastAction?._action === "build-insights" ? lastAction.result : null;

//   const hasData = dataStatus?.data.hasData;
//   const futuresCount = dataStatus?.data.totals?.futures_fills ?? 0;
//   const lastJob = dataStatus?.data.lastJob ?? null;

//   const summary = tradeSummary || {
//     trades: 0,
//     totalNotional: 0,
//     totalFee: 0,
//     symbolCount: 0,
//     firstTs: null,
//     lastTs: null,
//   };

//   const symbols = Array.isArray(topSymbols) ? topSymbols : [];

//   // 👇 overview / funding에서 자주 쓸 값들 유도리 있게 뽑기
//   const mixAccount = overview?.mixAccount || overview?.account || null;
//   const positions = overview?.positions || [];
//   const openPositionsCount = Array.isArray(positions) ? positions.length : 0;
//   const vip = overview?.vipMix || overview?.vip || null;

//   const fundingCurrent =
//     funding?.current || funding?.data?.current || funding?.data || null;
//   const fundingRate = fundingCurrent?.fundingRate ?? fundingCurrent?.rate;
//   const fundingTime =
//     fundingCurrent?.nextSettleTime ||
//     fundingCurrent?.fundingTime ||
//     fundingCurrent?.time;

//   return (
//     <div className="mt-10 mx-auto flex w-full max-w-5xl flex-col items-stretch space-y-6 md:space-y-8">
//       {/* Case 1: 미연동 or 거절 */}
//       {(!integration || integration.status === "rejected") && (
//         <>
//           <Card className="w-full border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
//             <CardHeader className="space-y-2">
//               <CardTitle className="text-lg font-semibold text-zinc-100 md:text-xl">
//                 Bitget 계정을 연동해주세요
//               </CardTitle>
//               <CardDescription className="text-sm text-zinc-400">
//                 Bitget 거래소 UID를 입력하면, 관리자가 계정을 확인한 뒤 연동을
//                 승인합니다.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form
//                 id="uid-form"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   uidForm.handleSubmit();
//                 }}
//                 className="space-y-4"
//               >
//                 <uidForm.Field
//                   name="exchangeID"
//                   children={(field) => (
//                     <input type="hidden" value={field.state.value} />
//                   )}
//                 />
//                 <uidForm.Field
//                   name="uid"
//                   children={(field) => {
//                     const isInvalid =
//                       field.state.meta.isTouched && !field.state.meta.isValid;
//                     return (
//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="uid"
//                           className="text-sm font-medium text-zinc-200"
//                         >
//                           Bitget UID
//                         </Label>
//                         <Input
//                           id="uid"
//                           name="uid"
//                           type="text"
//                           value={field.state.value}
//                           onChange={(e) => field.handleChange(e.target.value)}
//                           onBlur={field.handleBlur}
//                           className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-violet-500/20 aria-invalid:border-red-500"
//                           placeholder="UID"
//                           aria-invalid={isInvalid}
//                         />
//                         <FieldError errors={field.state.meta.errors} />
//                       </div>
//                     );
//                   }}
//                 />

//                 {/* <Button
//                   type="submit"
//                   form="uid-form"
//                   disabled={
//                     !uidForm.state.isValid ||
//                     connectUidFetcher.state === "submitting"
//                   }
//                   className="w-full bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500/20"
//                   size="lg"
//                 >
//                   {connectUidFetcher.state === "submitting" ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       UID 등록 중...
//                     </>
//                   ) : (
//                     "UID 등록 및 연동 요청"
//                   )}
//                 </Button> */}
//                 <uidForm.Subscribe
//                   selector={(state: any) => [
//                     state.canSubmit,
//                     state.isSubmitting,
//                   ]}
//                   children={([canSubmit, isSubmitting]: any[]) => (
//                     <Button type="submit" form="uid-form" disabled={!canSubmit}>
//                       {isSubmitting
//                         ? "UID 등록 중..."
//                         : "UID 등록 및 연동 요청"}
//                     </Button>
//                   )}
//                 />
//               </form>
//             </CardContent>
//           </Card>
//           {/* Geetest 캡차 */}
//           <GeetestCaptcha captchaConfig={captchaConfig} />
//         </>
//       )}
//       {/* =========================
//             Case 2: 승인 대기
//         ========================== */}
//       {integration?.status === "pending" && (
//         <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7 text-center">
//           <div className="mb-4 flex items-center justify-center">
//             <img
//               src={integration.exchangeID.logo}
//               alt={integration.exchangeID.nameEn}
//               className="size-12 rounded-full object-cover ring-2 ring-violet-600/50 md:size-14"
//             />
//           </div>
//           <h2 className="mb-1 text-base font-semibold text-zinc-200 md:text-lg">
//             {integration.exchangeID.nameEn}
//           </h2>
//           <p className="mb-4 text-[11px] text-zinc-400 md:text-sm">
//             UID: {uid.slice(0, -4)}****
//           </p>
//           <div className="flex items-center justify-center gap-2 text-violet-400">
//             <Loader2 className="h-4 w-4 animate-spin" />
//             <span className="text-xs font-medium md:text-sm">
//               관리자 승인 대기중입니다...
//             </span>
//           </div>
//         </section>
//       )}

//       {/* =========================
//             Case 3: 승인 완료
//         ========================== */}
//       {integration?.status === "approved" && (
//         <div className="flex w-full flex-col space-y-6 md:space-y-8">
//           {/* 3-A. 연동 완료 헤더 카드 */}
//           <section className="w-full rounded-2xl border border-emerald-600/30 bg-emerald-950/40 p-4 md:p-6">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={integration.exchangeID.logo}
//                   alt={integration.exchangeID.nameEn}
//                   className="size-10 rounded-full object-cover ring-1 ring-emerald-400/40"
//                 />
//                 <div>
//                   <h2 className="text-sm font-semibold text-emerald-200 md:text-base">
//                     {integration.exchangeID.nameEn}
//                   </h2>
//                   <p className="text-[11px] text-emerald-100/80 md:text-xs">
//                     UID : {uid.slice(0, -4)}****
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/40 px-3 py-1 text-[10px] text-emerald-200 md:self-auto">
//                 <CheckCircle2 className="h-4 w-4" />
//                 <span className="font-medium">연동 완료</span>
//               </div>
//             </div>
//             <p className="mt-3 text-[11px] text-emerald-100/80 md:text-xs">
//               이 계정의 거래 내역을 기반으로 AI 분석 대시보드를 제공합니다.
//             </p>
//           </section>

//           {/* 3-A. 아직 API 키 없음 → API 키 등록 폼 */}
//           {!integration.hasApiKeys && (
//             <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 md:p-6">
//               <h3 className="mb-2 text-sm font-semibold text-zinc-100">
//                 Bitget API 키 등록
//               </h3>
//               <p className="mb-4 text-[11px] text-zinc-400 md:text-xs">
//                 선물/현물 거래 내역을 불러오기 위해 Bitget에서 발급한 API 키를
//                 등록해주세요. 이 키는 암호화되어 안전하게 저장되며, 다시 화면에
//                 노출되지 않습니다.
//               </p>

//               <form method="post" className="space-y-3">
//                 <input type="hidden" name="exchangeID" value={exchangeID} />

//                 <div className="space-y-1">
//                   <label className="block text-[11px] font-medium text-zinc-300">
//                     API Key
//                   </label>
//                   <input
//                     name="apiKey"
//                     type="text"
//                     required
//                     className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-[11px] font-medium text-zinc-300">
//                     API Secret
//                   </label>
//                   <input
//                     name="apiSecret"
//                     type="password"
//                     required
//                     className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-[11px] font-medium text-zinc-300">
//                     Passphrase
//                   </label>
//                   <input
//                     name="passphrase"
//                     type="password"
//                     required
//                     className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
//                   />
//                 </div>

//                 <button
//                   className="mt-1 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60 md:text-sm"
//                   name="_action"
//                   value="save-api-keys"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting && lastAction?._action === "save-api-keys"
//                     ? "API 키 저장 중..."
//                     : "API 키 저장 및 데이터 수집 준비"}
//                 </button>

//                 {saveApiKeysResult && (
//                   <p className="text-[11px] text-zinc-400">
//                     {saveApiKeysResult.ok
//                       ? "API 키가 저장되었습니다. 이제 거래 데이터를 수집하고 분석할 수 있습니다."
//                       : `API 키 저장 중 오류가 발생했습니다: ${
//                           saveApiKeysResult.error || "알 수 없는 오류"
//                         }`}
//                   </p>
//                 )}
//               </form>
//             </section>
//           )}

//           {/* 3-B. 데이터 수집 상태 섹션 */}
//           {integration.hasApiKeys && (
//             <>
//               <section className="w-full rounded-2xl border border-emerald-600/20 bg-emerald-950/50 p-4 md:p-6">
//                 {!hasData ? (
//                   <div className="text-center">
//                     <h3 className="mb-2 text-sm font-semibold text-emerald-200">
//                       아직 분석 가능한 거래 내역이 없어요
//                     </h3>
//                     <p className="mb-4 text-[11px] leading-relaxed text-emerald-100/80 md:text-xs">
//                       Bitget 계정이 연동되었지만, 아직 저장된 선물 체결 내역이
//                       없습니다.
//                       <br className="hidden sm:block" />
//                       아래 버튼을 눌러 최근 거래 내역을 수집하면, 추후 AI 분석을
//                       위한 기초 데이터가 쌓입니다.
//                     </p>

//                     <form
//                       method="post"
//                       id="start-ingest-form"
//                       className="space-y-2"
//                     >
//                       <button
//                         className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-600 disabled:opacity-60 md:text-sm"
//                         name="_action"
//                         value="start-ingest"
//                         form="start-ingest-form"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting
//                           ? "내 거래 분석 준비 중..."
//                           : "내 거래 분석 시작"}
//                       </button>

//                       {ingestResult && (
//                         <p className="mt-1 text-[11px] text-emerald-100/80">
//                           {ingestResult.ok
//                             ? `이번 수집에서 선물 체결 ${
//                                 ingestResult.stats?.futures_fills ?? 0
//                               }건을 가져왔습니다.`
//                             : `수집 중 오류가 발생했습니다: ${ingestResult.error}`}
//                         </p>
//                       )}
//                     </form>
//                   </div>
//                 ) : (
//                   <div className="text-left">
//                     <h3 className="mb-1 text-sm font-semibold text-emerald-200">
//                       이미 선물 체결 {futuresCount}건의 데이터를 수집했어요.
//                     </h3>
//                     {lastJob?.finishedAt && (
//                       <p className="mb-2 text-[11px] text-emerald-100/80 md:text-xs">
//                         마지막 수집:{" "}
//                         {new Date(lastJob.finishedAt).toLocaleString("ko-KR")}
//                       </p>
//                     )}

//                     {ingestResult && (
//                       <p className="mb-2 text-[11px] text-emerald-100/80">
//                         {ingestResult.ok
//                           ? `이번 수집에서 선물 체결 ${
//                               ingestResult.stats?.futures_fills ?? 0
//                             }건을 추가로 확인했습니다.`
//                           : `수집 중 오류가 발생했습니다: ${ingestResult.error}`}
//                       </p>
//                     )}

//                     <p className="text-[11px] leading-relaxed text-emerald-100/70 md:text-xs">
//                       앞으로는 이 데이터를 기반으로 코인별 성과, 수수료, 포지션
//                       패턴을 분석하고 AI 인사이트를 제공할 예정입니다.
//                     </p>
//                   </div>
//                 )}
//               </section>
//               {/* =========================
//                 STEP2: 실시간 계정 개요 + Funding
//             ========================== */}
//               <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
//                 <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//                   <h3 className="text-sm font-semibold text-zinc-100">
//                     실시간 계정 개요
//                   </h3>
//                   <p className="text-[10px] text-zinc-400 md:text-[11px]">
//                     Bitget API 기준 현재 잔고와 포지션, 펀딩 정보를 보여줍니다.
//                   </p>
//                 </div>

//                 {/* 상단 요약 카드들 */}
//                 <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
//                   {/* 총 선물 자산 */}
//                   <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                     <p className="mb-1 text-[10px] text-zinc-400">
//                       선물 계정 자산
//                     </p>
//                     <p className="text-base font-semibold text-zinc-100">
//                       {mixAccount?.equity != null
//                         ? `${Number(mixAccount.equity).toLocaleString("ko-KR")} USDT`
//                         : "-"}
//                     </p>
//                     <p className="mt-1 text-[10px] text-zinc-500">
//                       사용 가능:{" "}
//                       {mixAccount?.available != null
//                         ? `${Number(mixAccount.available).toLocaleString(
//                             "ko-KR"
//                           )} USDT`
//                         : "-"}
//                     </p>
//                   </div>

//                   {/* 오픈 포지션 수 */}
//                   <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                     <p className="mb-1 text-[10px] text-zinc-400">
//                       오픈 포지션
//                     </p>
//                     <p className="text-base font-semibold text-zinc-100">
//                       {openPositionsCount}개
//                     </p>
//                     <p className="mt-1 text-[10px] text-zinc-500">
//                       현재 보유 중인 선물 포지션 수
//                     </p>
//                   </div>

//                   {/* VIP / 수수료 레벨 */}
//                   <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                     <p className="mb-1 text-[10px] text-zinc-400">
//                       수수료 레벨
//                     </p>
//                     <p className="text-base font-semibold text-zinc-100">
//                       {vip?.level != null ? `VIP ${vip.level}` : "정보 없음"}
//                     </p>
//                     <p className="mt-1 text-[10px] text-zinc-500">
//                       Maker{" "}
//                       {vip?.makerFeeRate != null ? `${vip.makerFeeRate}%` : "-"}{" "}
//                       / Taker{" "}
//                       {vip?.takerFeeRate != null ? `${vip.takerFeeRate}%` : "-"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* 하단: 포지션 리스트 + Funding */}
//                 <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
//                   {/* 포지션 리스트 (2칸 차지) */}
//                   <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 md:p-4 lg:col-span-2">
//                     <div className="mb-3 flex items-center justify-between">
//                       <h4 className="text-xs font-semibold text-zinc-100">
//                         현재 오픈 포지션
//                       </h4>
//                       <span className="text-[10px] text-zinc-500">
//                         {openPositionsCount}개
//                       </span>
//                     </div>

//                     {openPositionsCount === 0 ? (
//                       <p className="text-[11px] text-zinc-500">
//                         현재 열려 있는 포지션이 없습니다.
//                       </p>
//                     ) : (
//                       <div className="max-h-64 space-y-2 overflow-auto pr-1">
//                         {positions.map((pos: any, idx: number) => (
//                           <div
//                             key={pos.positionId || pos.symbol + idx}
//                             className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/80 px-3 py-2"
//                           >
//                             <div>
//                               <p className="text-xs font-semibold text-zinc-100">
//                                 {pos.symbol}
//                               </p>
//                               <p className="text-[10px] text-zinc-500">
//                                 {pos.holdSide || pos.side} · 진입가{" "}
//                                 {pos.openPriceAvg ?? pos.entryPrice}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-xs text-zinc-100">
//                                 수량 {pos.total ?? pos.size}
//                               </p>
//                               <p className="text-[10px] text-zinc-500">
//                                 미실현{" "}
//                                 {pos.unrealisedPL ?? pos.unrealizedPnl ?? "-"}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Funding 카드 */}
//                   <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 md:p-4">
//                     <h4 className="mb-1 text-xs font-semibold text-zinc-100">
//                       Funding 정보 ({fundingSymbolUsed || "BTCUSDT"})
//                     </h4>

//                     {fundingSymbolReason && (
//                       <p className="mb-2 text-[10px] text-zinc-500">
//                         {fundingSymbolReason === "top-symbol"
//                           ? "최근 30일 동안 가장 많이 거래한 코인을 기준으로 Funding 정보를 보여줍니다."
//                           : "거래 내역이 충분하지 않아 BTCUSDT를 기준으로 Funding 정보를 보여줍니다."}
//                       </p>
//                     )}

//                     {fundingCurrent ? (
//                       <>
//                         <p className="mb-1 text-sm text-zinc-100">
//                           현재 펀딩 비율:{" "}
//                           {fundingRate != null ? `${fundingRate}` : "-"}
//                         </p>
//                         {fundingTime && (
//                           <p className="mb-3 text-[10px] text-zinc-500">
//                             다음 정산:{" "}
//                             {new Date(fundingTime).toLocaleString("ko-KR")}
//                           </p>
//                         )}
//                         <p className="text-[10px] leading-relaxed text-zinc-500 md:text-[11px]">
//                           Funding 비율이 높은 구간에서 장기간 포지션을 유지하면,
//                           수익률이 펀딩 비용에 의해 잠식될 수 있습니다. 이후 AI
//                           분석에서는 이 코인에서의 포지션 유지 시간과 펀딩
//                           비용까지 함께 평가할 예정입니다.
//                         </p>
//                       </>
//                     ) : (
//                       <p className="text-[11px] text-zinc-500">
//                         현재 불러올 수 있는 Funding 정보가 없습니다.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </section>

//               {/* STEP3: 최근 30일 스냅샷 */}
//               {hasData && (
//                 <>
//                   <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
//                     <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//                       <h3 className="text-sm font-semibold text-zinc-100">
//                         최근 30일 선물 거래 스냅샷
//                       </h3>
//                       <p className="text-[10px] text-zinc-400 md:text-[11px]">
//                         Bitget 선물 체결 데이터를 기반으로 간단한 요약 통계를
//                         보여줍니다.
//                       </p>
//                     </div>

//                     {summary.trades === 0 ? (
//                       <p className="text-[11px] text-zinc-500">
//                         최근 30일 동안 저장된 선물 체결 내역이 없습니다.
//                       </p>
//                     ) : (
//                       <>
//                         <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                           {/* 총 체결 수 */}
//                           <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                             <p className="mb-1 text-[10px] text-zinc-400">
//                               총 체결 수
//                             </p>
//                             <p className="text-base font-semibold text-zinc-100">
//                               {summary.trades.toLocaleString("ko-KR")} 건
//                             </p>
//                             <p className="mt-1 text-[10px] text-zinc-500">
//                               최근 30일 동안 발생한 선물 체결 횟수
//                             </p>
//                           </div>

//                           {/* 총 거래 규모 */}
//                           <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                             <p className="mb-1 text-[10px] text-zinc-400">
//                               총 거래 규모 (추정)
//                             </p>
//                             <p className="text-base font-semibold text-zinc-100">
//                               {Number(
//                                 summary.totalNotional || 0
//                               ).toLocaleString("ko-KR")}{" "}
//                               USDT
//                             </p>
//                             <p className="mt-1 text-[10px] text-zinc-500">
//                               체결 가격 × 수량을 기준으로 계산한 총 거래
//                               금액입니다.
//                             </p>
//                           </div>

//                           {/* 총 수수료 */}
//                           <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                             <p className="mb-1 text-[10px] text-zinc-400">
//                               지불한 수수료
//                             </p>
//                             <p className="text-base font-semibold text-zinc-100">
//                               {Number(summary.totalFee || 0).toLocaleString(
//                                 "ko-KR"
//                               )}{" "}
//                               USDT
//                             </p>
//                             <p className="mt-1 text-[10px] text-zinc-500">
//                               최근 30일 동안 선물 거래로 지불한 총 수수료입니다.
//                             </p>
//                           </div>

//                           {/* 거래한 코인 수 */}
//                           <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
//                             <p className="mb-1 text-[10px] text-zinc-400">
//                               거래한 코인 수
//                             </p>
//                             <p className="text-base font-semibold text-zinc-100">
//                               {summary.symbolCount ?? 0} 종목
//                             </p>
//                             <p className="mt-1 text-[10px] text-zinc-500">
//                               최근 30일 동안 선물 거래에 사용한 심볼 수입니다.
//                             </p>
//                           </div>
//                         </div>

//                         <p className="text-[10px] leading-relaxed text-zinc-500 md:text-[11px]">
//                           이 구간의 데이터는 향후 AI 분석에서{" "}
//                           <span className="text-zinc-300">
//                             거래 빈도, 코인 분산도, 수수료 비중
//                           </span>
//                           을 평가하는 데 사용됩니다. 다음 단계에서는 코인별
//                           성과와 패턴을 더 세부적으로 나눠서 볼 수 있도록 확장할
//                           예정입니다.
//                         </p>
//                       </>
//                     )}
//                   </section>

//                   {/* 섹션 1: 최근 30일 거래 활동 차트 */}
//                   <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm md:text-base font-semibold text-zinc-100">
//           최근 30일 선물 거래 활동
//         </h3>
//         <p className="text-xs text-zinc-500">
//           일별 거래 건수 / 거래 금액 / 수수료 흐름을 보여줍니다.
//         </p>
//       </div>

//       {timeline && timeline.data.length > 0 ? (
//         <div className="h-60 md:h-72">
//           <FuturesTimelineChart data={timeline.data} />
//         </div>
//       ) : (
//         <p className="text-xs text-zinc-500">
//           최근 30일 동안 집계 가능한 선물 거래 데이터가 없습니다.
//         </p>
//       )}
//     </section>

//                   {/* 섹션 2: 주요 거래 코인 분포 */}
//                   <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm md:text-base font-semibold text-zinc-100">
//           최근 30일 주요 거래 코인
//         </h3>
//         <p className="text-xs text-zinc-500">
//           심볼별 거래 빈도를 기준으로 상위 코인을 보여줍니다.
//         </p>
//       </div>

//       {topSymbols && topSymbols.length > 0 ? (
//         <div className="h-60 md:h-72">
//           <TopSymbolsBarChart data={topSymbols} />
//         </div>
//       ) : (
//         <p className="text-xs text-zinc-500">
//           아직 집계 가능한 선물 거래 코인 정보가 없습니다.
//         </p>
//       )}
//     </section>
//                 </>
//               )}

//               {/* STEP4: Top symbols */}
//               {hasData && (
//                 <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
//                   <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//                     <h3 className="text-sm font-semibold text-zinc-100">
//                       최근 30일 주요 거래 코인
//                     </h3>
//                     <p className="text-[10px] text-zinc-400 md:text-[11px]">
//                       선물 체결 횟수 기준 상위 코인들을 모아 보여줍니다.
//                     </p>
//                   </div>

//                   {symbols.length === 0 ? (
//                     <p className="text-[11px] text-zinc-500">
//                       아직 심볼별로 나눠 볼 수 있는 거래 내역이 없습니다.
//                     </p>
//                   ) : (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full border-collapse text-[10px] md:text-[11px]">
//                         <thead>
//                           <tr className="border-b border-zinc-800 text-zinc-400">
//                             <th className="py-2 pr-3 text-left font-medium">
//                               코인
//                             </th>
//                             <th className="py-2 pr-3 text-right font-medium">
//                               체결 수
//                             </th>
//                             <th className="py-2 pr-3 text-right font-medium">
//                               거래 규모 (USDT)
//                             </th>
//                             <th className="py-2 pr-3 text-right font-medium">
//                               수수료 (USDT)
//                             </th>
//                             <th className="py-2 pr-3 text-right font-medium">
//                               첫 거래 ~ 마지막 거래
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {symbols.map((s: any) => (
//                             <tr
//                               key={s.symbol}
//                               className="border-b border-zinc-900/80 last:border-b-0"
//                             >
//                               <td className="py-2 pr-3 text-left text-zinc-100">
//                                 {s.symbol}
//                               </td>
//                               <td className="py-2 pr-3 text-right text-zinc-100">
//                                 {s.trades?.toLocaleString("ko-KR")}
//                               </td>
//                               <td className="py-2 pr-3 text-right text-zinc-100">
//                                 {Number(s.totalNotional || 0).toLocaleString(
//                                   "ko-KR"
//                                 )}
//                               </td>
//                               <td className="py-2 pr-3 text-right text-zinc-100">
//                                 {Number(s.totalFee || 0).toLocaleString(
//                                   "ko-KR"
//                                 )}
//                               </td>
//                               <td className="py-2 pr-3 text-right text-zinc-400">
//                                 {s.firstTs
//                                   ? new Date(s.firstTs).toLocaleDateString(
//                                       "ko-KR"
//                                     )
//                                   : "-"}{" "}
//                                 ~{" "}
//                                 {s.lastTs
//                                   ? new Date(s.lastTs).toLocaleDateString(
//                                       "ko-KR"
//                                     )
//                                   : "-"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}

//                   {symbols.length > 0 && (
//                     <p className="mt-3 text-[10px] leading-relaxed text-zinc-500 md:text-[11px]">
//                       특정 코인에 거래가 과도하게 몰려 있거나, 거래 규모 대비
//                       수수료 비중이 높은 코인은 향후 AI 인사이트에서 위험
//                       요인으로 표시될 수 있습니다.
//                     </p>
//                   )}
//                 </section>
//               )}

//               {/* STEP5: AI 인사이트 자리 */}
//               <section className="w-full rounded-2xl border border-violet-700/40 bg-zinc-950/90 p-4 md:p-6">
//                 <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//                   <h3 className="text-sm font-semibold text-zinc-50">
//                     AI 기반 내 거래 패턴 분석 (준비 중)
//                   </h3>
//                   <span className="inline-flex items-center self-start rounded-full border border-violet-500/40 px-2 py-[2px] text-[10px] text-violet-200 sm:self-auto">
//                     BETA 계획
//                   </span>
//                 </div>
//                 {/* case 1: 분석 데이터가 아직 없음 */}
//                 {!hasData && (
//                   <>
//                     <p className="mb-2 text-[11px] text-zinc-400">
//                       아직 분석에 활용할 거래 이력이 충분하지 않습니다.
//                     </p>
//                     <p className="text-[10px] leading-relaxed text-zinc-500 md:text-[11px]">
//                       Bitget에서 실제 거래가 누적되면, 이 영역에서{" "}
//                       <span className="text-zinc-200">
//                         코인별 성과, 진입/청산 패턴, 수수료 비중, 펀딩 비용
//                       </span>
//                       등을 종합적으로 분석한 AI 인사이트를 제공할 예정입니다.
//                     </p>
//                   </>
//                 )}

//                 {/* case 2: 데이터는 있음 */}
//                 {hasData && (
//                   <div className="space-y-4">
//                     {/* 2-A. 이미 저장된 인사이트가 있는 경우 */}
//                     {insights ? (
//                       <div className="space-y-2">
//                         <p className="text-[10px] text-zinc-400 md:text-[11px]">
//                           최근 생성된 인사이트 기준:{" "}
//                           <span className="text-zinc-200">
//                             {new Date(insights.createdAt).toLocaleString(
//                               "ko-KR"
//                             )}
//                           </span>
//                         </p>
//                         <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 md:p-4">
//                           <p className="whitespace-pre-line text-[11px] leading-relaxed text-zinc-100">
//                             <Markdown remarkPlugins={[remarkGfm]}>
//                               {insights.summaryText}
//                               {/* {markdown} */}
//                             </Markdown>
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       // 2-B. 아직 인사이트가 없으면, 현재 요약 숫자 기반 안내
//                       <div className="space-y-2 text-[10px] text-zinc-200 md:text-[11px]">
//                         <p className="leading-relaxed">
//                           최근 30일 동안 선물 체결{" "}
//                           <span className="font-semibold">
//                             {summary.trades.toLocaleString("ko-KR")}건
//                           </span>
//                           , 거래 규모는 약{" "}
//                           <span className="font-semibold">
//                             {Number(summary.totalNotional || 0).toLocaleString(
//                               "ko-KR"
//                             )}{" "}
//                             USDT
//                           </span>
//                           이고,{" "}
//                           <span className="font-semibold">
//                             {summary.symbolCount ?? 0}개
//                           </span>
//                           의 코인을 거래했습니다.
//                         </p>

//                         {symbols.length > 0 && (
//                           <p className="text-zinc-300">
//                             <span className="text-zinc-400">
//                               주요 거래 코인:{" "}
//                             </span>
//                             {symbols
//                               .slice(0, 3)
//                               .map((s: any) => s.symbol)
//                               .join(", ")}
//                             {symbols.length > 3 && " 외"}
//                           </p>
//                         )}

//                         <p className="leading-relaxed text-zinc-500">
//                           아래 버튼을 누르면, 이 데이터를 기반으로 AI가 거래
//                           습관과 리스크를 분석한 요약 리포트를 생성합니다.
//                         </p>
//                       </div>
//                     )}

//                     {/* 2-C. AI 인사이트 생성 / 재생성 버튼 */}
//                     <form method="post" className="space-y-1">
//                       <input
//                         type="hidden"
//                         name="exchangeID"
//                         value={exchangeID}
//                       />
//                       <button
//                         className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-violet-700 disabled:opacity-60 md:text-sm"
//                         name="_action"
//                         value="build-insights"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting &&
//                         lastAction?._action === "build-insights"
//                           ? "AI 인사이트 생성 중..."
//                           : insights
//                             ? "AI 인사이트 다시 생성"
//                             : "AI 인사이트 생성"}
//                       </button>

//                       {/* 2-D. build-insights 결과 피드백 */}
//                       {insightsBuildResult && (
//                         <p className="text-[10px] text-zinc-400 md:text-[11px]">
//                           {insightsBuildResult.ok
//                             ? "새로운 인사이트가 생성되었습니다. 페이지를 새로고침하면 최신 내용이 반영됩니다."
//                             : `인사이트 생성 중 오류가 발생했습니다: ${
//                                 insightsBuildResult.error || "알 수 없는 오류"
//                               }`}
//                         </p>
//                       )}
//                     </form>
//                   </div>
//                 )}

//                 {/* {hasData && (
//               <>
//                 <div className="mb-3 text-[10px] leading-relaxed text-zinc-200 md:text-[11px]">
//                   최근 30일 동안 선물 체결{" "}
//                   <span className="font-semibold">
//                     {summary.trades.toLocaleString("ko-KR")}건
//                   </span>
//                   , 거래 규모는 약{" "}
//                   <span className="font-semibold">
//                     {Number(summary.totalNotional || 0).toLocaleString("ko-KR")}{" "}
//                     USDT
//                   </span>
//                   이고,{" "}
//                   <span className="font-semibold">
//                     {summary.symbolCount ?? 0}개
//                   </span>
//                   의 코인을 거래했습니다.
//                 </div>

//                 {symbols.length > 0 && (
//                   <div className="mb-3 text-[10px] text-zinc-300 md:text-[11px]">
//                     <span className="text-zinc-400">주요 거래 코인: </span>
//                     {symbols
//                       .slice(0, 3)
//                       .map((s: any) => s.symbol)
//                       .join(", ")}
//                     {symbols.length > 3 && " 외"}
//                   </div>
//                 )}

//                 <p className="text-[10px] leading-relaxed text-zinc-500 md:text-[11px]">
//                   향후에는 이 데이터를 기반으로 AI가{" "}
//                   <span className="text-zinc-200">
//                     과도한 손실이 반복되는 코인, 수수료 비중이 높은 구간, 펀딩
//                     비용에 비해 효율이 떨어지는 포지션
//                   </span>
//                   등을 자동으로 탐지하여 알려줄 예정입니다. 현재는 통계 기반
//                   요약만 제공되며, AI 분석 기능은 순차적으로 확장될 계획입니다.
//                 </p>
//               </>
//             )} */}

//                 {/* ()} */}
//               </section>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData();
//   const _action = formData.get("_action");
//   const actionType = typeof _action === "string" ? _action : "";

//   // Case 1: UID 연동
//   if (actionType === "connect-uid") {
//     const exchangeID = formData.get("exchangeID");
//     const uid = formData.get("uid");

//     if (!exchangeID || !uid) {
//       return data({
//         _action: "connect-uid",
//         result: { ok: false, error: "exchangeID와 uid가 필요합니다." },
//       });
//     }

//     const result = await apiRequest({
//       request,
//       endpoint: "/integration/apply",
//       method: "POST",
//       body: {
//         exchangeID: exchangeID,
//         uid,
//       },
//     });

//     return data({
//       _action: "connect-uid",
//       result,
//     });
//   }

//   // Case 2: Bitget API 키 저장
//   if (actionType === "save-api-keys") {
//     const exchangeID = formData.get("exchangeID");
//     const apiKey = formData.get("apiKey");
//     const apiSecret = formData.get("apiSecret");
//     const passphrase = formData.get("passphrase");

//     if (!exchangeID || !apiKey || !apiSecret || !passphrase) {
//       return data({
//         _action: "save-api-keys",
//         result: { ok: false, error: "모든 필드를 입력해주세요." },
//       });
//     }

//     const result = await apiRequest({
//       request,
//       endpoint: "/bitget-api/credentials/save",
//       method: "POST",
//       body: {
//         exchangeID: exchangeID,
//         apiKey,
//         apiSecret,
//         passphrase,
//       },
//     });

//     return data({
//       _action: "save-api-keys",
//       result,
//     });
//   }
//   if (actionType === "start-ingest") {
//     const result = await apiRequest({
//       request,
//       endpoint: "/bitget-api/ingest/start",
//       method: "POST",
//       body: {
//         productType: "USDT-FUTURES",
//       },
//     });

//     return data({
//       _action: "start-ingest",
//       result,
//     });
//   }

//   if (actionType === "build-insights") {
//     const exchangeID = formData.get("exchangeID");
//     if (!exchangeID || typeof exchangeID !== "string") {
//       return data({
//         _action: "build-insights",
//         result: { ok: false, error: "exchangeID is missing" },
//       });
//     }
//     const result = await apiRequest({
//       request,
//       endpoint: "/bitget-api/insights/build",
//       method: "POST",
//       body: {
//         exchangeID: exchangeID, // loader에서 쓴 exchange._id
//         productType: "USDT-FUTURES",
//         rangeDays: 30,
//       },
//     });
//     return data({
//       _action: "build-insights",
//       result,
//     });
//   }

//   // 기본값
//   return data({
//     _action: "unknown",
//     result: { ok: false, error: "unknown action" },
//   });
// }

// type TimelinePoint = {
//   date: string; // "2025-11-10"
//   trades: number;
//   notional: number;
//   fee: number;
// };

// function FuturesTimelineChart({ data }: { data: TimelinePoint[] }) {
//   // 혹시 데이터 구조가 잘 들어오는지 확인
//   // console.log("timeline data", data);

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <ComposedChart
//         data={data}
//         margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//         <XAxis
//           dataKey="date"
//           tick={{ fontSize: 10, fill: "#a1a1aa" }}
//           tickMargin={8}
//         />
//         <YAxis
//           yAxisId="left"
//           tick={{ fontSize: 10, fill: "#a1a1aa" }}
//           tickFormatter={(v) => `${v}`}
//         />
//         <YAxis
//           yAxisId="right"
//           orientation="right"
//           tick={{ fontSize: 10, fill: "#a1a1aa" }}
//           tickFormatter={(v) => `${v}`}
//         />
//         <Tooltip
//           contentStyle={{
//             backgroundColor: "#020617",
//             border: "1px solid #27272a",
//             borderRadius: 12,
//           }}
//           labelStyle={{ fontSize: 12 }}
//         />

//         {/* 거래 건수: 라인 */}
//         <Line
//           yAxisId="left"
//           type="monotone"
//           dataKey="trades"
//           stroke="#a855f7"
//           strokeWidth={2}
//           dot={{ r: 2 }}
//           name="거래 건수"
//         />

//         {/* 거래 금액: 막대 */}
//         <Bar
//           yAxisId="right"
//           dataKey="notional"
//           fill="#22c55e"
//           radius={[4, 4, 0, 0]}
//           name="거래 금액(대략)"
//         />
//       </ComposedChart>
//     </ResponsiveContainer>
//   );
// }

// // Recharts에서는 ComposedChart를 써도 되지만,
// // 여기서는 간단히 BarChart를 한 번 더 감싼 컴포넌트로 분리
// function BarChartBarNotional({ data }: { data: TimelinePoint[] }) {
//   return (
//     <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//       <Bar
//         yAxisId="right"
//         dataKey="notional"
//         fill="#22c55e"
//         radius={[4, 4, 0, 0]}
//         name="거래 금액(대략)"
//       />
//     </BarChart>
//   );
// }
// type TopSymbol = {
//   symbol: string;
//   trades: number;
//   totalNotional: number;
//   totalFee: number;
// };

// function TopSymbolsBarChart({ data }: { data: TopSymbol[] }) {
//   // console.log("top symbols data", data);

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart
//         data={data}
//         margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//         <XAxis
//           dataKey="symbol"
//           tick={{ fontSize: 11, fill: "#a1a1aa" }}
//           tickMargin={8}
//         />
//         <YAxis
//           tick={{ fontSize: 10, fill: "#a1a1aa" }}
//           tickFormatter={(v) => `${v}`}
//         />
//         <Tooltip
//           contentStyle={{
//             backgroundColor: "#020617",
//             border: "1px solid #27272a",
//             borderRadius: 12,
//           }}
//           labelStyle={{ fontSize: 12 }}
//           formatter={(value: any, name: string, props: any) => {
//             const item = props?.payload as TopSymbol;
//             if (name === "trades") {
//               return [`${value}건`, "거래 횟수"];
//             }
//             if (name === "totalNotional") {
//               return [`${value.toLocaleString()} USDT`, "거래 금액"];
//             }
//             if (name === "totalFee") {
//               return [`${value.toLocaleString()} USDT`, "수수료"];
//             }
//             return [value, name];
//           }}
//         />
//         <Bar
//           dataKey="trades"
//           fill="#4f46e5"
//           radius={[6, 6, 0, 0]}
//           name="거래 횟수"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
