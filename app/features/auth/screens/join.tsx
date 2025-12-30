// import { useForm } from "@tanstack/react-form";
// import { useTranslation } from "react-i18next";
// import { toast } from "sonner";
// import { Button } from "~/core/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "~/core/components/ui/card";
// import { Field, FieldError, FieldGroup } from "~/core/components/ui/field";
// import { ShineBorder } from "~/core/components/ui/shine-border";
// // import { createJoinFormSchema } from "../schema";
// import { useEffect, useMemo, useState, useRef } from "react";
// import {
// 	InputGroup,
// 	InputGroupAddon,
// 	InputGroupInput,
// } from "~/core/components/ui/input-group";
// import { MailIcon, Lock, Eye, EyeOff, CheckIcon } from "lucide-react";
// import { Spinner } from "~/core/components/ui/spinner";
// import {
// 	Link,
// 	useFetcher,
// 	useNavigate,
// 	data as routerData,
// 	redirect,
// } from "react-router";
// import { Checkbox } from "~/core/components/ui/checkbox";
// import { Label } from "~/core/components/ui/label";
// import { useGeetestCaptcha } from "~/core/hooks/useGeetestCaptcha";
// import GeetestCaptcha from "~/core/components/captcha";
// import type { Route } from "./+types/join";
// import {
// 	createUserSession,
// 	getAuthToken,
// } from "~/core/lib/auth-session.server";
// import { apiRequest } from "~/core/lib/api.server";
// import { joinFormSchema } from "../schema";
// import { OTPForm } from "~/core/components/otp-form";

// export async function loader({ request }: Route.LoaderArgs) {
// 	// 로그인 상태면 접근불가 메인으로 이동
// 	const token = await getAuthToken(request);
// 	if (token) {
// 		return redirect("/");
// 	}
// }

// export function meta() {
// 	return [
// 		{ title: "회원가입 | TetherGrow - AI 거래 분석 페이백 플랫폼" },
// 		{
// 			name: "description",
// 			content:
// 				"AI 거래 분석과 자동 수익 리포트를 제공하는 TetherGrow에 지금 가입하세요.",
// 		},
// 		{ name: "robots", content: "noindex,nofollow" },
// 		{ property: "og:type", content: "website" },
// 		{ property: "og:title", content: "회원가입 | TetherGrow" },
// 		{
// 			property: "og:description",
// 			content: "AI 거래 분석과 페이백 비교로 수익을 높이는 첫걸음.",
// 		},
// 		{
// 			property: "og:image",
// 			content: "https://tethergrow.app/og/tethergrow_opengraph.png",
// 		},
// 		{ property: "og:url", content: "https://tethergrow.app/auth/join" },
// 	];
// }

// export default function Join() {
// 	const { t } = useTranslation();
// 	const navigate = useNavigate();
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [emailDuplicateError, setEmailDuplicateError] = useState(false);
// 	const [emailAuthId, setEmailAuthId] = useState<string | null>(null);
// 	const [formUIType, setFormUIType] = useState<
// 		"form" | "otp" | "passwordReset"
// 	>("form");
// 	const joinSchema = useMemo(() => joinFormSchema(t), [t]);
// 	const emailCheckFetcher = useFetcher<typeof action>();
// 	const joinFetcher = useFetcher<typeof action>();
// 	const secdEmailAuthCodeFetcher = useFetcher<typeof action>();
// 	const checkEmailAuthCodeFetcher = useFetcher<typeof action>();

// 	// Geetest 캡차 Hook
// 	const {
// 		captchaConfig,
// 		showCaptcha,
// 		getValidate,
// 		reset: resetCaptcha,
// 		isInitialized,
// 	} = useGeetestCaptcha({
// 		captchaId: import.meta.env.VITE_GEETEST_CAPTCHA_ID,
// 		language: "kor",
// 		product: "bind",
// 		onSuccess: () => {
// 			form.handleSubmit();
// 		},
// 	});

// 	// TanStack Form 설정
// 	const form = useForm({
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 			emailVerified: false,
// 			legalAgreement: false,
// 		},
// 		validators: {
// 			onChange: joinSchema,
// 			onSubmit: joinSchema,
// 			onMount: joinSchema,
// 		},
// 		onSubmit: async ({ value }) => {
// 			// 캡차 초기화 확인
// 			if (!isInitialized()) {
// 				toast.error("캡차 초기화 중입니다. 잠시만 기다려주세요.", {
// 					position: "bottom-right",
// 				});
// 				return;
// 			}

// 			// 캡차 검증 결과 가져오기
// 			const captchaResult = getValidate();

// 			if (!captchaResult) {
// 				// bind 모드면 캡차 팝업 표시
// 				const shown = showCaptcha();

// 				if (!shown) {
// 					toast.error("캡차를 완료해주세요.", {
// 						position: "bottom-right",
// 					});
// 				}
// 				return;
// 			}

// 			// submit
// 			try {
// 				// send email auth code
// 				secdEmailAuthCodeFetcher.submit(
// 					{ email: value.email, actionType: "emailAuthSendEmailAuthCode" },
// 					{
// 						method: "POST",
// 						encType: "application/json",
// 					}
// 				);

// 				// 성공 후 캡차 리셋
// 				resetCaptcha();
// 			} catch (error) {
// 				toast.error("회원가입에 실패했습니다.", {
// 					position: "bottom-right",
// 				});
// 				// 실패 시에도 캡차 리셋
// 				resetCaptcha();
// 			}
// 		},
// 	});

// 	// 이메일 중복확인 핸들러 (서버 action 호출)
// 	const handleCheckDuplicate = () => {
// 		const email = form.state.values.email;
// 		if (!email) return;

// 		// React Router action으로 이메일 중복 확인 (API key는 서버에서만 사용)
// 		emailCheckFetcher.submit(
// 			{ email, actionType: "checkEmail" },
// 			{ method: "POST", encType: "application/json" }
// 		);
// 	};

// 	// emailCheckFetcher 응답 처리
// 	useEffect(() => {
// 		if (emailCheckFetcher.state === "idle" && emailCheckFetcher.data) {
// 			const data = emailCheckFetcher.data;

// 			if (!data.code) {
// 				toast.success("Success");
// 				form.setFieldValue("emailVerified", true);
// 				setEmailDuplicateError(false);
// 			} else {
// 				toast.error(t(`error.common.${data.code}`));
// 				setEmailDuplicateError(true);
// 			}
// 		}
// 	}, [emailCheckFetcher.state, emailCheckFetcher.data, form, t]);

// 	// secdEmailAuthCodeFetcher 응답 처리
// 	useEffect(() => {
// 		if (
// 			secdEmailAuthCodeFetcher.state === "idle" &&
// 			secdEmailAuthCodeFetcher.data
// 		) {
// 			const data = secdEmailAuthCodeFetcher.data;
// 			if (!data.code) {
// 				setEmailAuthId(data.emailAuthID);
// 				setFormUIType("otp");
// 			}
// 		}
// 	}, [secdEmailAuthCodeFetcher.state, secdEmailAuthCodeFetcher.data]);

// 	// joinFetcher 응답 처리 - 회원가입 완료 후
// 	useEffect(() => {
// 		if (joinFetcher.state === "idle" && joinFetcher.data) {
// 			const data = joinFetcher.data;

// 			// 백엔드에서 token을 반환하면 성공으로 간주
// 			if (data.token || data.user) {
// 				// 회원가입 성공

// 				// 성공 메시지
// 				toast.success(data.msg || "회원가입이 완료되었습니다!");

// 				// 캡차 리셋 및 폼 리셋
// 				resetCaptcha();
// 				form.reset();

// 				// 홈으로 리다이렉트
// 				navigate("/");
// 			} else {
// 				// 회원가입 실패
// 				const errorMsg = data.msg || "회원가입에 실패했습니다.";
// 				toast.error(errorMsg, {
// 					position: "bottom-right",
// 				});
// 				// 캡차 리셋
// 				resetCaptcha();
// 			}
// 		}
// 	}, [joinFetcher.state, joinFetcher.data, navigate, resetCaptcha, form]);

// 	return (
// 		<div className="flex flex-col gap-4 max-w-[384px] mx-auto my-16 w-full px-5 md:my-32">
// 			{formUIType === "form" && (
// 				<>
// 					<Card className="relative w-full max-w-sm overflow-hidden border-none p-0 shadow-none mx-auto">
// 						<ShineBorder
// 							shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
// 							className="p-0"
// 						/>
// 						<CardHeader className="border-border border-b p-4 block">
// 							<CardTitle>{t("auth.join.title")}</CardTitle>
// 						</CardHeader>
// 						<CardContent className="p-4">
// 							<form
// 								id="join-form"
// 								onSubmit={(e) => {
// 									e.preventDefault();
// 									form.handleSubmit();
// 								}}
// 							>
// 								<FieldGroup>
// 									{/* Email Field */}
// 									<form.Field
// 										name="email"
// 										children={(field) => (
// 											<form.Field
// 												name="emailVerified"
// 												mode="value"
// 												children={(emailVerifiedField) => {
// 													const isInvalid =
// 														field.state.meta.isTouched &&
// 														!field.state.meta.isValid;
// 													const isEmailValid = field.state.meta.isValid;
// 													const emailVerified = emailVerifiedField.state.value;
// 													const hasEmailValue =
// 														field.state.value.trim().length > 0;
// 													const showCheckButton =
// 														!emailVerified && isEmailValid && hasEmailValue;

// 													return (
// 														<Field
// 															data-invalid={isInvalid || emailDuplicateError}
// 														>
// 															<InputGroup>
// 																<InputGroupAddon>
// 																	<MailIcon />
// 																</InputGroupAddon>
// 																<InputGroupInput
// 																	id={field.name}
// 																	name={field.name}
// 																	value={field.state.value}
// 																	onBlur={field.handleBlur}
// 																	onChange={(e) => {
// 																		field.handleChange(e.target.value);
// 																		// 이메일 값이 변경되면 중복확인 초기화 및 에러 초기화
// 																		if (emailVerified) {
// 																			emailVerifiedField.handleChange(false);
// 																		}
// 																		// 중복 에러 초기화
// 																		setEmailDuplicateError(false);
// 																	}}
// 																	aria-invalid={
// 																		isInvalid || emailDuplicateError
// 																	}
// 																	type="email"
// 																	placeholder={t("auth.login.emailLabel")}
// 																	autoComplete="email"
// 																/>
// 																{/* 중복확인 버튼 - 이메일이 빈값이 아니고 형식에 맞을 때만 노출 */}
// 																{showCheckButton && (
// 																	<InputGroupAddon
// 																		align="inline-end"
// 																		className="py-0"
// 																	>
// 																		<Button
// 																			type="button"
// 																			variant="ghost"
// 																			onClick={handleCheckDuplicate}
// 																			className="text-yellow-600 dark:text-yellow-500 hover:bg-transparent"
// 																		>
// 																			<CheckIcon />
// 																			{t("auth.join.checkDuplicate")}
// 																		</Button>
// 																	</InputGroupAddon>
// 																)}
// 																{/* 중복확인 완료 시 체크 아이콘만 표시 (violet 컬러) */}
// 																{emailVerified && (
// 																	<InputGroupAddon align="inline-end">
// 																		<CheckIcon className="text-primary" />
// 																	</InputGroupAddon>
// 																)}
// 															</InputGroup>
// 															{/* 이메일 필드 에러 메시지 */}
// 															{isInvalid && (
// 																<FieldError errors={field.state.meta.errors} />
// 															)}
// 															{/* 이메일 중복 에러 메시지 */}
// 															{emailDuplicateError && (
// 																<FieldError
// 																	errors={[
// 																		t(
// 																			"validation.auth.email.alreadyRegistered"
// 																		),
// 																	]}
// 																/>
// 															)}
// 														</Field>
// 													);
// 												}}
// 											/>
// 										)}
// 									/>

// 									{/* Password Field */}
// 									<form.Field
// 										name="password"
// 										children={(field) => {
// 											const isInvalid =
// 												field.state.meta.isTouched && !field.state.meta.isValid;
// 											return (
// 												<Field data-invalid={isInvalid}>
// 													<InputGroup>
// 														<InputGroupAddon>
// 															<Lock />
// 														</InputGroupAddon>
// 														<InputGroupInput
// 															id={field.name}
// 															name={field.name}
// 															value={field.state.value}
// 															onBlur={field.handleBlur}
// 															onChange={(e) =>
// 																field.handleChange(e.target.value)
// 															}
// 															aria-invalid={isInvalid}
// 															type={showPassword ? "text" : "password"}
// 															placeholder={t("auth.login.passwordLabel")}
// 															autoComplete="current-password"
// 															maxLength={20}
// 														/>
// 														<InputGroupAddon align="inline-end">
// 															<Button
// 																type="button"
// 																variant="ghost"
// 																size="icon"
// 																onClick={() => setShowPassword(!showPassword)}
// 															>
// 																{showPassword ? <Eye /> : <EyeOff />}
// 															</Button>
// 														</InputGroupAddon>
// 													</InputGroup>
// 													{isInvalid && (
// 														<FieldError errors={field.state.meta.errors} />
// 													)}
// 												</Field>
// 											);
// 										}}
// 									/>

// 									{/* Hidden Email Verified Field - 중복확인 상태를 검증하기 위한 숨겨진 필드 */}
// 									<form.Field
// 										name="emailVerified"
// 										children={(field) => {
// 											return (
// 												<input
// 													type="hidden"
// 													id={field.name}
// 													name={field.name}
// 													value={field.state.value ? "true" : "false"}
// 												/>
// 											);
// 										}}
// 									/>

// 									<form.Field
// 										name="legalAgreement"
// 										children={(field) => {
// 											const isInvalid =
// 												field.state.meta.isTouched && !field.state.meta.isValid;
// 											return (
// 												<Field data-invalid={isInvalid}>
// 													<Label className="border p-2 rounded-md flex items-center gap-2 cursor-pointer">
// 														<Checkbox
// 															id={field.name}
// 															name={field.name}
// 															checked={field.state.value}
// 															onCheckedChange={(checked) => {
// 																field.handleChange(checked === true);
// 																field.handleBlur();
// 															}}
// 														/>
// 														{/* 선택 여부에따른 텍스트 투명도 조절 */}
// 														<p className="leading-relaxed ml-2">
// 															<span className="opacity-30">
// 																(필수) 슈파플레이트의&nbsp;
// 															</span>
// 															<Link
// 																to="/terms-of-service"
// 																className="text-primary underline"
// 																onClick={(e) => e.stopPropagation()}
// 															>
// 																이용약관
// 															</Link>{" "}
// 															<span className="opacity-30">및</span>
// 															<br />
// 															<Link
// 																to="/privacy-policy"
// 																className="text-primary underline"
// 																onClick={(e) => e.stopPropagation()}
// 															>
// 																개인정보 처리방침
// 															</Link>
// 															<span className="opacity-30">에 동의합니다</span>
// 														</p>
// 													</Label>
// 													{isInvalid && (
// 														<FieldError errors={field.state.meta.errors} />
// 													)}
// 												</Field>
// 											);
// 										}}
// 									/>
// 								</FieldGroup>
// 							</form>
// 							{/* Geetest 캡차 */}
// 							<GeetestCaptcha captchaConfig={captchaConfig} />
// 						</CardContent>
// 						<CardFooter className="border-border border-t p-4 flex gap-2">
// 							<form.Subscribe
// 								selector={(state) => [state.canSubmit, state.isSubmitting]}
// 								children={([canSubmit, isSubmitting]) => (
// 									<Button
// 										type="submit"
// 										form="join-form"
// 										className="flex-1"
// 										disabled={!canSubmit}
// 									>
// 										{t("auth.join.submitButton")}
// 										{isSubmitting ? <Spinner /> : null}
// 									</Button>
// 								)}
// 							/>
// 						</CardFooter>
// 					</Card>

// 					<div className="flex justify-end">
// 						<Link to="/auth/login" className="text-sm text-foreground/50">
// 							로그인
// 						</Link>
// 					</div>
// 				</>
// 			)}
// 			{formUIType === "otp" && !!emailAuthId && (
// 				<OTPForm
// 					emailAuthId={emailAuthId}
// 					setFormUIType={setFormUIType}
// 					pageType="join"
// 					checkEmailAuthCodeFetcher={checkEmailAuthCodeFetcher}
// 					joinFetcher={joinFetcher}
// 					joinFormValues={form.state.values}
// 					email={form.state.values.email}
// 					resendEmailAuthCodeFetcher={secdEmailAuthCodeFetcher}
// 				/>
// 			)}
// 		</div>
// 	);
// }

// // 서버 사이드 action - API key가 브라우저에 노출되지 않음!
// export async function action({ request }: Route.ActionArgs) {
// 	const formJson = await request.json();
// 	const { actionType, email, password } = formJson;

// 	// 이메일 중복 확인
// 	if (actionType === "checkEmail") {
// 		try {
// 			const responseData = await apiRequest({
// 				request,
// 				endpoint: "/common/check-email",
// 				method: "POST",
// 				body: { userID: email },
// 			});

// 			return routerData(responseData);
// 		} catch (error) {
// 			console.error("이메일 중복 확인 에러:", error);
// 			return routerData(
// 				{ msg: "이메일 중복 확인에 실패했습니다.", error: String(error) },
// 				{ status: 500 }
// 			);
// 		}
// 	}

// 	// 이메일 인증 코드 발송
// 	if (actionType === "emailAuthSendEmailAuthCode") {
// 		const { email } = formJson;

// 		try {
// 			const responseData = await apiRequest({
// 				request,
// 				endpoint: "/common/send-email-auth-code",
// 				method: "POST",
// 				body: { userID: email },
// 			});
// 			return routerData(responseData);
// 		} catch (error) {
// 			console.error("이메일 인증 코드 발송 에러:", error);
// 			return routerData(
// 				{ msg: "이메일 인증 코드 발송에 실패했습니다.", error: String(error) },
// 				{ status: 500 }
// 			);
// 		}
// 	}

// 	// 이메일 인증 코드 검증
// 	if (actionType === "checkEmailAuthCode") {
// 		const { otp, emailAuthID } = formJson;
// 		try {
// 			const responseData = await apiRequest({
// 				request,
// 				endpoint: "/common/check-email-auth-code",
// 				method: "POST",
// 				body: { emailAuthID: emailAuthID, authCode: otp },
// 			});
// 			return routerData(responseData);
// 		} catch (error) {
// 			console.error("이메일 인증 코드 검증 에러:", error);
// 			return routerData(
// 				{ msg: "이메일 인증 코드 검증에 실패했습니다.", error: String(error) },
// 				{ status: 500 }
// 			);
// 		}
// 	}

// 	// 회원 가입
// 	if (actionType === "join") {
// 		try {
// 			const responseData = await apiRequest({
// 				request,
// 				endpoint: "/user/sign-up",
// 				method: "PUT",
// 				body: {
// 					userID: email,
// 					password: password,
// 				},
// 			});

// 			// ✅ 백엔드에서 토큰을 반환하면 세션에 저장
// 			if (responseData.token) {
// 				// const { createUserSession } = await import(
// 				// 	"~/core/lib/auth-session.server"
// 				// );
// 				const sessionResult = await createUserSession({
// 					request,
// 					token: responseData.token,
// 					redirectTo: "/",
// 				});

// 				// 세션 쿠키를 포함해서 응답 (data() 헬퍼 사용)
// 				return routerData(responseData, {
// 					headers: sessionResult.headers,
// 				});
// 			}

// 			return routerData(responseData);
// 		} catch (error) {
// 			console.error("회원가입 에러:", error);
// 			return routerData(
// 				{ msg: "회원가입에 실패했습니다.", error: String(error) },
// 				{ status: 500 }
// 			);
// 		}
// 	}
// }
