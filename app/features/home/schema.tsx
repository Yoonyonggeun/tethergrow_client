import { z } from "zod";

// Exchange API 키 입력 폼 스키마
// Bitget 또는 OKX 선택 시에만 API 키 필드들이 필수
export const bitgetApiKeyFormSchema = z
  .object({
    exchange: z.string().min(1, { message: "거래소를 선택해주세요." }),
    apiKey: z.string(),
    secret: z.string(),
    passphrase: z.string(),
  })
  .refine(
    (data) => {
      // Bitget 또는 OKX가 아닌 경우 항상 통과
      if (data.exchange !== "bitget" && data.exchange !== "okx") {
        return true;
      }
      // Bitget 또는 OKX인 경우 모든 필드 필수
      return (
        !!data.apiKey &&
        data.apiKey.length > 0 &&
        !!data.secret &&
        data.secret.length > 0 &&
        !!data.passphrase &&
        data.passphrase.length > 0
      );
    },
    {
      message: "모든 필드를 입력해주세요.",
      path: ["apiKey"], // 첫 번째 필드에 에러 표시
    }
  );

export type BitgetApiKeyFormSchemaT = z.infer<typeof bitgetApiKeyFormSchema>;

// 베타 등록 폼 스키마
// 이메일만 필수
export const betaWaitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일 주소를 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
});

export type BetaWaitlistFormSchemaT = z.infer<typeof betaWaitlistFormSchema>;
