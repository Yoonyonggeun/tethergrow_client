// uid 연동 폼 스키마
import { z } from "zod";
import type { TFunction } from "i18next";

export const uidFormSchema = (t: TFunction) =>
  z.object({
    uid: z.string().min(1, { message: t("validation.home.uid.required") }),
    exchangeID: z.string(),
  });

export type UidFormSchemaT = z.infer<typeof uidFormSchema>;
