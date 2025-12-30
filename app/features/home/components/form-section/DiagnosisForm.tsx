import type { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "~/core/components/ui/button";
import { Input } from "~/core/components/ui/input";
import { Label } from "~/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/core/components/ui/select";
import type { AnalyzeFetcher, FormDataState, FormSectionProps } from "../FormSection";
import ApiGuideDialog from "./ApiGuideDialog";

interface DiagnosisFormProps {
  formData: FormDataState;
  setFormData: Dispatch<SetStateAction<FormDataState>>;
  analyzeFetcher: AnalyzeFetcher;
  exchanges?: FormSectionProps["exchanges"];
  handleSubmit: (event: React.FormEvent) => void;
}

const DiagnosisForm = ({
  formData,
  setFormData,
  analyzeFetcher,
  exchanges = [],
  handleSubmit,
}: DiagnosisFormProps) => {
  const isSubmitting = analyzeFetcher.state === "submitting" || analyzeFetcher.state === "loading";

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="exchange">거래소 선택</Label>
          <Select
            value={formData.exchange}
            onValueChange={(value) => setFormData({ ...formData, exchange: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="거래소를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {exchanges.length > 0
                ? exchanges.map((exchange) => (
                    <SelectItem key={exchange._id} value={exchange.nameEn?.toLowerCase() || ""}>
                      {exchange.nameEn}
                    </SelectItem>
                  ))
                : [
                    <SelectItem key="bitget" value="bitget">
                      Bitget
                    </SelectItem>,
                    <SelectItem key="okx" value="okx">
                      OKX
                    </SelectItem>,
                  ]}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessKey">API Key</Label>
          <Input
            id="accessKey"
            type="password"
            placeholder="API KEY를 입력하세요"
            value={formData.accessKey}
            onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
            className="font-mono"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secretKey">Secret Key</Label>
          <Input
            id="secretKey"
            type="password"
            placeholder="SECRET KEY를 입력하세요"
            value={formData.secretKey}
            onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
            className="font-mono"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passphrase">Passphrase</Label>
          <Input
            id="passphrase"
            type="password"
            placeholder="Passphrase를 입력하세요"
            value={formData.passphrase}
            onChange={(e) => setFormData({ ...formData, passphrase: e.target.value })}
            className="font-mono"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              분석 중...
            </>
          ) : (
            "내 트레이딩 진단하기"
          )}
        </Button>

        <ApiGuideDialog />
      </form>
    </motion.div>
  );
};

export default DiagnosisForm;
