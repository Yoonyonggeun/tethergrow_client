import { z } from "zod";
import type { TFunction } from "i18next";

// 이메일 스키마
export const emailSchema = (t: TFunction) =>
	z
		.string()
		.min(1, { error: t("validation.auth.email.required") })
		.email({ error: t("validation.auth.email.invalid") });

// 비밀번호 스키마
export const passwordSchema = (t: TFunction) =>
	z
		.string()
		.min(8, { error: t("validation.auth.password.minLength") })
		.superRefine((value, ctx) => {
			// 숫자 체크
			if (!/\d/.test(value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("validation.auth.password.requireFormat"),
				});
				return;
			}
			// 특수문자 체크
			if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("validation.auth.password.requireFormat"),
				});
			}
		});

// 로그인 폼 스키마
export const createLoginFormSchema = (t: TFunction) =>
	z.object({
		email: emailSchema(t),
		password: passwordSchema(t),
	});

// 회원가입 폼 스키마
export const joinFormSchema = (t: TFunction) =>
	z.object({
		email: emailSchema(t),
		password: passwordSchema(t),
		// 이메일 인증 여부
		emailVerified: z.boolean().refine((val) => val === true, {
			message: t("validation.auth.emailVerified.required"),
		}),
		// 약관 동의 여부
		legalAgreement: z.boolean().refine((val) => val === true, {
			message: t("validation.auth.legalAgreement.required"),
		}),
	});

export type JoinFormSchemaT = z.infer<typeof joinFormSchema>;

// 비밀번호 재설정 이메일 체크 폼 스키마
export const passwordResetCheckEmail = (t: TFunction) =>
	z.object({
		email: z
			.string()
			.min(1, { error: t("validation.auth.email.required") })
			.email({ error: t("validation.auth.email.invalid") }),
	});

// 인증번호 폼 스키마
export const createOTPSchema = (t: TFunction) =>
	z.object({
		otp: z.string().superRefine((value, ctx) => {
			// 숫자가 아닌 문자가 하나라도 있으면 에러
			if (!/^\d*$/.test(value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "숫자만 입력 가능합니다.",
				});
			}
		}),
		emailAuthID: z.string(),
	});

// 비밀번호 재설정 폼 스키마
export const passwordResetFormSchema = (t: TFunction) =>
	z
		.object({
			email: emailSchema(t),
			password1: passwordSchema(t),
			password2: z.string(),
		})
		.refine((data) => data.password1 === data.password2, {
			message: t("validation.auth.password.mismatch"),
			path: ["password2"],
		});
