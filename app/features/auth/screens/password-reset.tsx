// import { useTranslation } from "react-i18next";
// import { passwordResetCheckEmail } from "../schema";
// import { useForm } from "@tanstack/react-form";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "~/core/components/ui/card";
// import { Field, FieldError, FieldGroup } from "~/core/components/ui/field";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "~/core/components/ui/input-group";
// import { MailIcon } from "lucide-react";
// import { Button } from "~/core/components/ui/button";
// import { data, redirect, useFetcher } from "react-router";
// import type { Route } from "./+types/password-reset";
// import { useGeetestCaptcha } from "~/core/hooks/useGeetestCaptcha";
// import { apiRequest } from "~/core/lib/api.server";
// import { toast } from "sonner";
// import GeetestCaptcha from "~/core/components/captcha";
// import { OTPForm } from "~/core/components/otp-form";
// import { PasswordResetForm } from "../components/password-reset-form";
// import { getAuthToken } from "~/core/lib/auth-session.server";

// export async function loader({ request }: Route.LoaderArgs) {
//   // 로그인 상태면 접근불가 메인으로 이동
//   const token = await getAuthToken(request);
//   if (token) {
//     return redirect("/");
//   }
// }

// export default function PasswordReset() {
//   const { t } = useTranslation();
//   const resetSchema = useMemo(() => passwordResetCheckEmail(t), [t]);
//   const checkEmailExistFetcher = useFetcher<typeof action>();
//   const sendEmailAuthCodeFetcher = useFetcher<typeof action>();
//   const checkEmailAuthCodeFetcher = useFetcher<typeof action>();
//   const [formUIType, setFormUIType] = useState<
//     "form" | "otp" | "passwordReset"
//   >("form");
//   const [emailAuthId, setEmailAuthId] = useState<string | null>(null);
//   const [email, setEmail] = useState<string | null>(null);

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
//       // 캡차 성공 시 form 제출
//       form.handleSubmit();
//     },
//   });

//   const form = useForm({
//     defaultValues: {
//       email: "",
//     },
//     validators: {
//       onChange: resetSchema,
//       onMount: resetSchema,
//       onSubmit: resetSchema,
//     },
//     onSubmit: async ({ value }) => {
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

//       checkEmailExistFetcher.submit(
//         { email: value.email, actionType: "checkEmail" },
//         {
//           method: "POST",
//           encType: "application/json",
//         }
//       );
//     },
//   });

//   // checkEmailExistFetcher 응답 처리
//   useEffect(() => {
//     if (
//       checkEmailExistFetcher.state === "idle" &&
//       checkEmailExistFetcher.data
//     ) {
//       const responseData = checkEmailExistFetcher.data;

//       if (responseData.code) {
//         // 에러가 있는 경우 - 필드 에러 표시
//         form.setFieldMeta("email", (prev) => ({
//           ...prev,
//           errors: [t(`error.user.${responseData.code}`)],
//           errorMap: {
//             onChange: t(`error.user.${responseData.code}`),
//           },
//         }));
//       } else {
//         // 성공 - 이메일 인증 코드 발송
//         setEmail(form.state.values.email);
//         sendEmailAuthCodeFetcher.submit(
//           { email: form.state.values.email, actionType: "sendEmailAuthCode" },
//           {
//             method: "POST",
//             encType: "application/json",
//           }
//         );
//         setFormUIType("otp");
//       }
//     }
//   }, [checkEmailExistFetcher.state, checkEmailExistFetcher.data]);

//   // sendEmailAuthCodeFetcher 응답 처리
//   useEffect(() => {
//     if (
//       sendEmailAuthCodeFetcher.state === "idle" &&
//       sendEmailAuthCodeFetcher.data
//     ) {
//       const responseData = sendEmailAuthCodeFetcher.data;

//       if (!responseData.code) {
//         // 성공 - OTP 입력 화면으로 전환

//         setEmailAuthId(responseData.emailAuthID);
//         setFormUIType("otp");
//         toast.success("인증번호가 발송되었습니다.", {
//           position: "bottom-right",
//         });
//       } else {
//         // 에러 - 토스트로 표시
//         toast.error(responseData.msg || "인증번호 발송에 실패했습니다.", {
//           position: "bottom-right",
//         });
//       }
//     }
//   }, [sendEmailAuthCodeFetcher.state, sendEmailAuthCodeFetcher.data]);

//   return (
//     <div className="flex flex-col gap-4 max-w-[384px] mx-auto my-16 w-full px-5 md:my-32">
//       {formUIType === "form" && (
//         <Card>
//           <CardHeader>
//             <CardTitle>비밀번호 재설정</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form
//               id="reset-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 form.handleSubmit();
//               }}
//             >
//               <FieldGroup>
//                 <form.Field
//                   name="email"
//                   children={(field) => {
//                     const isInvalid =
//                       field.state.meta.isTouched && !field.state.meta.isValid;
//                     return (
//                       <Field data-invalid={isInvalid}>
//                         <InputGroup>
//                           <InputGroupInput
//                             id={field.name}
//                             name={field.name}
//                             value={field.state.value}
//                             onBlur={field.handleBlur}
//                             onChange={(e) => field.handleChange(e.target.value)}
//                             aria-invalid={isInvalid}
//                             type="email"
//                             placeholder={t("auth.login.emailLabel")}
//                             autoComplete="email"
//                           />
//                           <InputGroupAddon>
//                             <MailIcon />
//                           </InputGroupAddon>
//                         </InputGroup>
//                         {isInvalid && (
//                           <FieldError errors={field.state.meta.errors} />
//                         )}
//                       </Field>
//                     );
//                   }}
//                 />
//                 <form.Subscribe
//                   selector={(state) => [state.canSubmit, state.isSubmitting]}
//                   children={([canSubmit, isSubmitting]) => (
//                     <Button
//                       type="submit"
//                       form="reset-form"
//                       disabled={!canSubmit}
//                     >
//                       인증번호 발송
//                     </Button>
//                   )}
//                 />
//               </FieldGroup>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//       {formUIType === "otp" && !!emailAuthId && (
//         <OTPForm
//           emailAuthId={emailAuthId}
//           setFormUIType={setFormUIType}
//           pageType="passwordReset"
//           checkEmailAuthCodeFetcher={checkEmailAuthCodeFetcher}
//           email={email || undefined}
//           resendEmailAuthCodeFetcher={sendEmailAuthCodeFetcher}
//         />
//       )}
//       {formUIType === "passwordReset" && <PasswordResetForm email={email} />}
//       {/* Geetest 캡차 */}
//       <GeetestCaptcha captchaConfig={captchaConfig} />
//     </div>
//   );
// }

// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.json();

//   if (formData.actionType === "checkEmail") {
//     const { email } = formData;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/user/check-email-exist",
//         method: "POST",
//         body: { userID: email },
//       });

//       return data(responseData);
//     } catch (error) {
//       console.error("이메일 중복 확인 에러:", error);
//       return data(
//         { msg: "이메일 중복 확인에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (formData.actionType === "sendEmailAuthCode") {
//     const { email } = formData;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/common/send-email-auth-code",
//         method: "POST",
//         body: { userID: email },
//       });

//       return data(responseData);
//     } catch (error) {
//       console.error("이메일 인증 코드 발송 에러:", error);
//       return data(
//         { msg: "이메일 인증 코드 발송에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (formData.actionType === "checkEmailAuthCode") {
//     const { otp, emailAuthID } = formData;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/common/check-email-auth-code",
//         method: "POST",
//         body: { emailAuthID: emailAuthID, authCode: otp },
//       });
//       return data(responseData);
//     } catch (error) {
//       console.error("이메일 인증 코드 검증 에러:", error);
//       return data(
//         { msg: "이메일 인증 코드 검증에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (formData.actionType === "passwordReset") {
//     const { password1, password2, email } = formData;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/user/reset-pw",
//         method: "POST",
//         body: { password1, password2, userID: email },
//       });
//       if (!responseData.code) {
//         return redirect("/auth/login");
//       } else {
//         return data(responseData);
//       }
//     } catch (error) {
//       console.error("비밀번호 재설정 에러:", error);
//       return data(
//         { msg: "비밀번호 재설정에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }
// }
