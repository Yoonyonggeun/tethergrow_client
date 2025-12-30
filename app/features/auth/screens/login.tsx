// import { useEffect, useMemo, useState } from "react";
// import { useForm } from "@tanstack/react-form";
// import { useTranslation } from "react-i18next";
// import { toast } from "sonner";
// import { Button } from "~/core/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "~/core/components/ui/card";
// import { Field, FieldError, FieldGroup } from "~/core/components/ui/field";
// import { ShineBorder } from "~/core/components/ui/shine-border";
// import { createLoginFormSchema } from "../schema";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "~/core/components/ui/input-group";
// import { Eye, EyeOff, Lock, MailIcon } from "lucide-react";
// import { Spinner } from "~/core/components/ui/spinner";

// import {
//   Link,
//   useFetcher,
//   useNavigate,
//   data as routerData,
//   redirect,
// } from "react-router";
// import type { Route } from "./+types/login";
// import {
//   createUserSession,
//   getAuthToken,
// } from "~/core/lib/auth-session.server";
// import { apiRequest } from "~/core/lib/api.server";
// import GeetestCaptcha from "~/core/components/captcha";
// import { useGeetestCaptcha } from "~/core/hooks/useGeetestCaptcha";
// import { OTPForm } from "~/core/components/otp-form";

// export async function loader({ request }: Route.LoaderArgs) {
//   // 로그인 상태면 접근불가 메인으로 이동
//   const token = await getAuthToken(request);
//   if (token) {
//     return redirect("/");
//   }
// }

// export function meta() {
//   return [
//     { title: "로그인 | TetherGrow" },
//     {
//       name: "description",
//       content:
//         "AI 기반 거래 분석 플랫폼 TetherGrow에 로그인하세요. 맞춤형 거래 인사이트를 제공합니다.",
//     },
//     { name: "robots", content: "noindex,nofollow" },
//     { property: "og:type", content: "website" },
//     { property: "og:title", content: "로그인 | TetherGrow" },
//     { property: "og:description", content: "회원 전용 AI 거래 대시보드 접속." },
//     {
//       property: "og:image",
//       content: "https://tethergrow.app/og/tethergrow_opengraph.png",
//     },
//     { property: "og:url", content: "https://tethergrow.app/auth/login" },
//   ];
// }

// export default function Login() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailAuthId, setEmailAuthId] = useState<string | null>(null);
//   const [formUIType, setFormUIType] = useState<
//     "form" | "otp" | "passwordReset"
//   >("form");
//   const loginSchema = useMemo(() => createLoginFormSchema(t), [t]);
//   const loginInfoCheckFetcher = useFetcher<typeof action>();
//   const loginFetcher = useFetcher<typeof action>();
//   const secdEmailAuthCodeFetcher = useFetcher<typeof action>();
//   const checkEmailAuthCodeFetcher = useFetcher<typeof action>();
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
//       form.handleSubmit();
//     },
//   });

//   // TanStack Form 설정
//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     validators: {
//       onChange: loginSchema,
//       onSubmit: loginSchema,
//       onMount: loginSchema,
//     },
//     onSubmit: async ({ value }) => {
//       if (!isInitialized()) {
//         toast.error("캡차 초기화 중입니다. 잠시만 기다려주세요.", {
//           position: "bottom-right",
//         });
//         return;
//       }

//       const captchaResult = getValidate();

//       if (!captchaResult) {
//         const shown = showCaptcha();
//         if (!shown) {
//           toast.error("캡차를 완료해주세요.", {
//             position: "bottom-right",
//           });
//         }
//         return;
//       }

//       // 폼 제출 처리
//       loginInfoCheckFetcher.submit(
//         { ...value, actionType: "loginInfoCheck" },
//         {
//           method: "POST",
//           encType: "application/json",
//         }
//       );
//     },
//   });

//   // loginInfoCheckFetcher 응답 처리
//   useEffect(() => {
//     if (loginInfoCheckFetcher.state === "idle" && loginInfoCheckFetcher.data) {
//       const data = loginInfoCheckFetcher.data;

//       if (data.token) {
//         // 이메일 인증 코드 발송
//         secdEmailAuthCodeFetcher.submit(
//           {
//             email: form.state.values.email,
//             password: form.state.values.password,
//             actionType: "emailAuthSendEmailAuthCode",
//           },
//           {
//             method: "POST",
//             encType: "application/json",
//           }
//         );
//       } else if (data.code === "020203") {
//         toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
//         form.reset();
//       }
//     }
//   }, [loginInfoCheckFetcher.state, loginInfoCheckFetcher.data]);

//   // secdEmailAuthCodeFetcher 응답 처리
//   useEffect(() => {
//     if (
//       secdEmailAuthCodeFetcher.state === "idle" &&
//       secdEmailAuthCodeFetcher.data
//     ) {
//       const data = secdEmailAuthCodeFetcher.data;
//       if (!data.code) {
//         setEmailAuthId(data.emailAuthID);
//         setFormUIType("otp");
//       }
//     }
//   }, [secdEmailAuthCodeFetcher.state, secdEmailAuthCodeFetcher.data]);

//   // loginFetcher 응답 처리
//   useEffect(() => {
//     if (loginFetcher.state === "idle" && loginFetcher.data) {
//       const data = loginFetcher.data;

//       // 로그인 성공
//       if (data.token || data.user) {
//         // TODO: 다국어 처리
//       } else {
//         // TODO: 로그인 실패 다국어 처리
//         if (data.code === "020201") {
//           form.setFieldMeta("email", (prev) => ({
//             ...prev,
//             errors: ["이메일을 입력해주세요"],
//             errorMap: {
//               onChange: "이메일을 입력해주세요",
//             },
//           }));
//         } else if (data.code === "020202") {
//           form.setFieldMeta("password", (prev) => ({
//             ...prev,
//             errors: ["비밀번호를 입력해주세요"],
//             errorMap: {
//               onChange: "비밀번호를 입력해주세요",
//             },
//           }));
//         } else if (data.code === "020203") {
//         }
//       }
//     }
//   }, [loginFetcher.state, loginFetcher.data, navigate, form]);

//   return (
//     <div className="flex flex-col gap-4 max-w-[384px] mx-auto my-16 w-full px-5 md:my-32">
//       {formUIType === "form" && (
//         <>
//           <Card className="relative w-full max-w-sm overflow-hidden border-none p-0 shadow-none mx-auto">
//             <ShineBorder
//               shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
//               className="p-0"
//             />
//             <CardHeader className="border-border border-b p-4 block">
//               <CardTitle>{t("auth.login.title")}</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <form
//                 id="login-form"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   form.handleSubmit();
//                 }}
//               >
//                 <FieldGroup>
//                   {/* Email Field */}
//                   <form.Field
//                     name="email"
//                     children={(field) => {
//                       const isInvalid =
//                         field.state.meta.isTouched && !field.state.meta.isValid;
//                       return (
//                         <Field data-invalid={isInvalid}>
//                           <InputGroup>
//                             <InputGroupInput
//                               id={field.name}
//                               name={field.name}
//                               value={field.state.value}
//                               onBlur={field.handleBlur}
//                               onChange={(e) =>
//                                 field.handleChange(e.target.value)
//                               }
//                               aria-invalid={isInvalid}
//                               type="email"
//                               placeholder={t("auth.login.emailLabel")}
//                               autoComplete="email"
//                             />
//                             <InputGroupAddon>
//                               <MailIcon />
//                             </InputGroupAddon>
//                           </InputGroup>
//                           {isInvalid && (
//                             <FieldError errors={field.state.meta.errors} />
//                           )}
//                         </Field>
//                       );
//                     }}
//                   />

//                   {/* Password Field */}
//                   <form.Field
//                     name="password"
//                     children={(field) => {
//                       const isInvalid =
//                         field.state.meta.isTouched && !field.state.meta.isValid;
//                       return (
//                         <Field data-invalid={isInvalid}>
//                           <InputGroup>
//                             <InputGroupAddon>
//                               <Lock />
//                             </InputGroupAddon>
//                             <InputGroupInput
//                               id={field.name}
//                               name={field.name}
//                               value={field.state.value}
//                               onBlur={field.handleBlur}
//                               onChange={(e) =>
//                                 field.handleChange(e.target.value)
//                               }
//                               aria-invalid={isInvalid}
//                               type={showPassword ? "text" : "password"}
//                               placeholder={t("auth.login.passwordLabel")}
//                               autoComplete="current-password"
//                               maxLength={20}
//                             />
//                             <InputGroupAddon align="inline-end">
//                               <Button
//                                 type="button"
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => setShowPassword(!showPassword)}
//                               >
//                                 {showPassword ? <Eye /> : <EyeOff />}
//                               </Button>
//                             </InputGroupAddon>
//                           </InputGroup>
//                           {isInvalid && (
//                             <FieldError errors={field.state.meta.errors} />
//                           )}
//                         </Field>
//                       );
//                     }}
//                   />
//                 </FieldGroup>
//               </form>
//             </CardContent>
//             <CardFooter className="border-border border-t p-4 flex gap-2">
//               <form.Subscribe
//                 selector={(state) => [state.canSubmit, state.isSubmitting]}
//                 children={([canSubmit, isSubmitting]) => (
//                   <Button
//                     type="submit"
//                     form="login-form"
//                     className="flex-1"
//                     disabled={!canSubmit}
//                   >
//                     {t("auth.login.submitButton")}
//                     {isSubmitting ? <Spinner /> : null}
//                   </Button>
//                 )}
//               />
//             </CardFooter>
//           </Card>
//           <div className="flex justify-end gap-4 text-sm text-foreground/50">
//             <Link to="/auth/password-reset" viewTransition>
//               비밀번호 재설정
//             </Link>
//             <Link to="/auth/join">회원가입</Link>
//           </div>
//           <GeetestCaptcha captchaConfig={captchaConfig} />
//         </>
//       )}
//       {formUIType === "otp" && !!emailAuthId && (
//         <OTPForm
//           emailAuthId={emailAuthId}
//           setFormUIType={setFormUIType}
//           pageType="login"
//           checkEmailAuthCodeFetcher={checkEmailAuthCodeFetcher}
//           loginFetcher={loginFetcher}
//           loginFormValues={form.state.values}
//           email={form.state.values.email}
//           resendEmailAuthCodeFetcher={secdEmailAuthCodeFetcher}
//         />
//       )}
//     </div>
//   );
// }

// // 서버 사이드 action - 로그인 처리
// export async function action({ request }: Route.ActionArgs) {
//   const formJson = await request.json();
//   const { actionType, email, password } = formJson;

//   if (actionType === "loginInfoCheck") {
//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/user/sign-in",
//         method: "POST",
//         body: { userID: email, password },
//       });
//       return routerData(responseData);
//     } catch (error) {
//       console.error("로그인 정보 확인 에러:", error);
//       return routerData(
//         { msg: "로그인 정보 확인에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (actionType === "emailAuthSendEmailAuthCode") {
//     const { email } = formJson;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/common/send-email-auth-code",
//         method: "POST",
//         body: { userID: email },
//       });
//       return routerData(responseData);
//     } catch (error) {
//       console.error("이메일 인증 코드 발송 에러:", error);
//       return routerData(
//         { msg: "이메일 인증 코드 발송에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (actionType === "checkEmailAuthCode") {
//     const { otp, emailAuthID } = formJson;

//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/common/check-email-auth-code",
//         method: "POST",
//         body: { emailAuthID: emailAuthID, authCode: otp },
//       });

//       if (responseData.token) {
//         const sessionResult = await createUserSession({
//           request,
//           token: responseData.token,
//           redirectTo: "/",
//         });

//         return routerData(responseData, {
//           headers: sessionResult.headers,
//         });
//       }
//       return routerData(responseData);
//     } catch (error) {
//       console.error("이메일 인증 코드 검증 에러:", error);
//       return routerData(
//         { msg: "이메일 인증 코드 검증에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }

//   if (actionType === "login") {
//     try {
//       const responseData = await apiRequest({
//         request,
//         endpoint: "/user/sign-in",
//         method: "POST",
//         body: {
//           userID: email,
//           password: password,
//         },
//       });

//       // ✅ 백엔드에서 토큰을 반환하면 세션에 저장
//       if (responseData.token) {
//         // const { createUserSession } = await import(
//         // 	"~/core/lib/auth-session.server"
//         // );
//         const sessionResult = await createUserSession({
//           request,
//           token: responseData.token,
//           redirectTo: "/",
//         });

//         // 세션 쿠키를 포함해서 응답 (data() 헬퍼 사용)
//         return routerData(responseData, {
//           headers: sessionResult.headers,
//         });
//       }

//       return routerData(responseData);
//     } catch (error) {
//       console.error("로그인 에러:", error);
//       return routerData(
//         { msg: "로그인에 실패했습니다.", error: String(error) },
//         { status: 500 }
//       );
//     }
//   }
// }
