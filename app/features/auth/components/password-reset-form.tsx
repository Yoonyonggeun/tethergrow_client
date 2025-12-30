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
// import { Eye, EyeOff, Lock } from "lucide-react";
// import { useForm } from "@tanstack/react-form";
// import { useTranslation } from "react-i18next";
// import { useEffect, useMemo, useState } from "react";
// import { passwordResetFormSchema } from "../schema";
// import { redirect, useFetcher } from "react-router";
// import type { action } from "../screens/password-reset";

// interface PasswordResetFormProps {
//   email: string | null;
// }

// export function PasswordResetForm({ email }: PasswordResetFormProps) {
//   const { t } = useTranslation();
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const passwordResetSchema = useMemo(() => passwordResetFormSchema(t), [t]);
//   const passwordResetFetcher = useFetcher<typeof action>();
//   const form = useForm({
//     defaultValues: {
//       email: email,
//       password1: "",
//       password2: "",
//     },
//     validators: {
//       onChange: passwordResetSchema,
//       onSubmit: passwordResetSchema,
//       onMount: passwordResetSchema,
//     },
//     onSubmit: async ({ value }) => {
//       passwordResetFetcher.submit(
//         { ...value, actionType: "passwordReset" },
//         {
//           method: "POST",
//           encType: "application/json",
//         }
//       );
//     },
//   });

//   useEffect(() => {
//     if (passwordResetFetcher.state === "idle" && passwordResetFetcher.data) {
//       const data = passwordResetFetcher.data;
//       if (!data.code) {
//         redirect("/auth/login");
//       }
//     }
//   }, [passwordResetFetcher.state, passwordResetFetcher.data]);

//   return (
//     <div className="flex flex-col gap-4 max-w-[384px] mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle>비밀번호 재설정</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form
//             id="password-reset-form"
//             onSubmit={(e) => {
//               e.preventDefault();
//               form.handleSubmit();
//             }}
//           >
//             <FieldGroup>
//               {/* Password1 Field */}
//               <form.Field
//                 name="password1"
//                 children={(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <InputGroup>
//                         <InputGroupAddon>
//                           <Lock />
//                         </InputGroupAddon>
//                         <InputGroupInput
//                           id={field.name}
//                           name={field.name}
//                           value={field.state.value}
//                           onBlur={field.handleBlur}
//                           onChange={(e) => field.handleChange(e.target.value)}
//                           aria-invalid={isInvalid}
//                           type={showPassword1 ? "text" : "password"}
//                           placeholder={t("auth.login.passwordLabel")}
//                           autoComplete="current-password"
//                           maxLength={20}
//                         />
//                         <InputGroupAddon align="inline-end">
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setShowPassword1(!showPassword1)}
//                           >
//                             {showPassword1 ? <Eye /> : <EyeOff />}
//                           </Button>
//                         </InputGroupAddon>
//                       </InputGroup>
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   );
//                 }}
//               />

//               {/* Password Field */}
//               <form.Field
//                 name="password2"
//                 children={(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <InputGroup>
//                         <InputGroupAddon>
//                           <Lock />
//                         </InputGroupAddon>
//                         <InputGroupInput
//                           id={field.name}
//                           name={field.name}
//                           value={field.state.value}
//                           onBlur={field.handleBlur}
//                           onChange={(e) => field.handleChange(e.target.value)}
//                           aria-invalid={isInvalid}
//                           type={showPassword2 ? "text" : "password"}
//                           placeholder={t("auth.login.passwordLabel")}
//                           autoComplete="current-password"
//                           maxLength={20}
//                         />
//                         <InputGroupAddon align="inline-end">
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setShowPassword2(!showPassword2)}
//                           >
//                             {showPassword2 ? <Eye /> : <EyeOff />}
//                           </Button>
//                         </InputGroupAddon>
//                       </InputGroup>
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   );
//                 }}
//               />
//               <form.Subscribe
//                 selector={(state) => [state.canSubmit, state.isSubmitting]}
//                 children={([canSubmit, isSubmitting]) => (
//                   <Button
//                     type="submit"
//                     form="password-reset-form"
//                     disabled={!canSubmit}
//                   >
//                     비밀번호 재설정
//                   </Button>
//                 )}
//               />
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
