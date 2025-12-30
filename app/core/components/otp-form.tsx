import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, type FetcherWithComponents } from "react-router";
import { toast } from "sonner";
import { Button } from "~/core/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/core/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "~/core/components/ui/field";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "~/core/components/ui/input-otp";
import { createOTPSchema } from "~/features/auth/schema";

interface OTPFormProps {
	emailAuthId: string | null;
	setFormUIType: (formUIType: "form" | "otp" | "passwordReset") => void;
	pageType: "login" | "join" | "passwordReset";
	checkEmailAuthCodeFetcher: FetcherWithComponents<any>;
	joinFetcher?: FetcherWithComponents<any>;
	joinFormValues?: any;
	email?: string;
	resendEmailAuthCodeFetcher?: FetcherWithComponents<any>;
	loginFetcher?: FetcherWithComponents<any>;
	loginFormValues?: any;
}

export function OTPForm({
	emailAuthId,
	setFormUIType,
	pageType,
	checkEmailAuthCodeFetcher,
	joinFetcher,
	joinFormValues,
	email,
	resendEmailAuthCodeFetcher,
	loginFetcher,
	loginFormValues,
}: OTPFormProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const otpSchema = useMemo(() => createOTPSchema(t), [t]);

	// Resend 타이머 상태
	const [countdown, setCountdown] = useState(30);
	const [isResendDisabled, setIsResendDisabled] = useState(true);
	// 재전송 요청 여부를 추적하는 상태
	const [hasRequestedResend, setHasRequestedResend] = useState(false);

	const form = useForm({
		defaultValues: {
			otp: "",
			emailAuthID: emailAuthId,
		},
		validators: {
			onChange: otpSchema,
			onSubmit: otpSchema,
			onMount: otpSchema,
		},
		onSubmit: async ({ value }) => {
			checkEmailAuthCodeFetcher.submit(
				{
					otp: value.otp,
					emailAuthID: value.emailAuthID,
					actionType: "checkEmailAuthCode",
				},
				{
					method: "POST",
					encType: "application/json",
				}
			);
		},
	});

	// checkEmailAuthCodeFetcher 응답 처리
	useEffect(() => {
		if (
			checkEmailAuthCodeFetcher.state === "idle" &&
			checkEmailAuthCodeFetcher.data
		) {
			const responseData = checkEmailAuthCodeFetcher.data;
			if (responseData.code) {
				form.setFieldMeta("otp", (prev) => ({
					...prev,
					errors: [responseData.code],
					errorMap: {
						onChange: responseData.code,
					},
				}));
			} else {
				if (pageType === "passwordReset") {
					setFormUIType("passwordReset");
					toast.success("인증번호가 검증되었습니다.");
				} else if (pageType === "login") {
					loginFetcher?.submit(
						{ ...loginFormValues, actionType: "login" },
						{
							method: "POST",
							encType: "application/json",
						}
					);
					toast.success("로그인 성공");
					navigate("/");
				} else if (pageType === "join") {
					// 회원가입 fetcher 실행
					joinFetcher?.submit(
						{ ...joinFormValues, actionType: "join" },
						{
							method: "POST",
							encType: "application/json",
						}
					);
				}
			}
		}
	}, [checkEmailAuthCodeFetcher.state, checkEmailAuthCodeFetcher.data]);

	// 타이머 useEffect
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
			return () => clearTimeout(timer);
		} else {
			setIsResendDisabled(false);
		}
	}, [countdown]);

	// resendEmailAuthCodeFetcher 응답 처리
	useEffect(() => {
		if (
			resendEmailAuthCodeFetcher &&
			resendEmailAuthCodeFetcher.state === "idle" &&
			resendEmailAuthCodeFetcher.data &&
			hasRequestedResend // 재전송 요청이 있었을 때만 토스트 표시
		) {
			const responseData = resendEmailAuthCodeFetcher.data;
			if (!responseData.code) {
				toast.success("인증번호가 재전송되었습니다.");
				// 타이머 리셋
				setCountdown(30);
				setIsResendDisabled(true);
			} else {
				toast.error("인증번호 재전송에 실패했습니다.");
			}
			// 응답 처리 후 플래그 리셋하여 중복 처리 방지
			setHasRequestedResend(false);
		}
	}, [
		resendEmailAuthCodeFetcher?.state,
		resendEmailAuthCodeFetcher?.data,
		hasRequestedResend,
	]);

	// 재전송 핸들러
	const handleResend = () => {
		if (email && resendEmailAuthCodeFetcher) {
			setHasRequestedResend(true); // 재전송 요청 플래그 설정
			resendEmailAuthCodeFetcher.submit(
				{ email, actionType: "emailAuthSendEmailAuthCode" },
				{
					method: "POST",
					encType: "application/json",
				}
			);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Enter verification code</CardTitle>
				<CardDescription>We sent a 6-digit code to your email.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="otp-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="otp"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="otp">Verification code</FieldLabel>
										<InputOTP
											maxLength={6}
											id="otp"
											value={field.state.value}
											onChange={(value) => {
												// 에러 초기화
												field.setMeta((prev) => ({
													...prev,
													errors: [],
													errorMap: {},
												}));
												// 값 변경
												field.handleChange(value);
											}}
											onBlur={field.handleBlur}
										>
											<InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
										<FieldDescription>
											Enter the 6-digit code sent to your email.
										</FieldDescription>
									</Field>
								);
							}}
						/>
						<FieldGroup>
							<form.Subscribe
								selector={(state) => [
									state.canSubmit,
									state.isSubmitting,
									state.values.otp,
								]}
								children={([canSubmit, isSubmitting, otp]) => {
									const otpValue = otp as string;
									return (
										<Button
											type="submit"
											form="otp-form"
											disabled={!canSubmit || otpValue.length !== 6}
										>
											Verify
										</Button>
									);
								}}
							/>
							<FieldDescription className="text-center">
								Didn&apos;t receive the code?{" "}
								<Button
									type="button"
									variant="ghost"
									onClick={(e) => {
										e.preventDefault();
										handleResend();
									}}
									disabled={isResendDisabled}
									className={
										isResendDisabled ? "cursor-not-allowed opacity-50" : ""
									}
								>
									{isResendDisabled ? `Resend (${countdown}s)` : "Resend"}
								</Button>
							</FieldDescription>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
