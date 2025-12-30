import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, BarChart3, Eye, Lock, Shield } from "lucide-react";
import type { FetcherWithComponents } from "react-router";
import { Link, useFetcher } from "react-router";
import { Button } from "~/core/components/ui/button";
import { toast } from "sonner";
import DiagnosisForm from "./form-section/DiagnosisForm";
import LoadingCard from "./form-section/LoadingCard";
import ResultView from "./form-section/ResultView";
import SecurityInfo from "./form-section/SecurityInfo";
import TrustBadges from "./form-section/TrustBadges";

export type FormState = "form" | "loading" | "result" | "insufficient-data";

export interface FormDataState {
  exchange: string;
  accessKey: string;
  secretKey: string;
  passphrase: string;
  email: string;
}

export interface FormSectionProps {
  exchanges?: Array<{
    _id: string;
    nameEn: string;
    nameKo: string;
    order: number;
  }>;
}

export type AnalyzeFetcher = FetcherWithComponents<any>;

const loadingSteps = [
  "API 연결 확인 중...",
  "거래 내역 불러오는 중...",
  "수수료 계산 중...",
  "분석 완료!",
];

const FormSection = ({ exchanges = [] }: FormSectionProps) => {
  const [formState, setFormState] = useState<FormState>("form");
  const [formData, setFormData] = useState<FormDataState>({
    exchange: "",
    accessKey: "dc45d7fb-ea8e-4a9a-bf16-d01576e3ad37",
    secretKey: "E5F069D53C9D2D9C9BFDB7FBF34826BF",
    passphrase: "Test251117!",
    email: "tkfkdgo3057@gmail.com",
  });
  const analyzeFetcher = useFetcher();

  useEffect(() => {
    if (analyzeFetcher.state === "submitting" || analyzeFetcher.state === "loading") {
      setFormState("loading");
      return;
    }

    if (!analyzeFetcher.data) return;

    if (analyzeFetcher.data.code === "080104") {
      setFormState("insufficient-data");
      toast.error(
        analyzeFetcher.data.msg || "분석을 위해서는 최소 100개 이상의 거래 데이터가 필요합니다.",
        {
          position: "bottom-right",
        }
      );
      return;
    }

    if (analyzeFetcher.data.code === "080102") {
      toast.error(analyzeFetcher.data.msg || "이미 사용중인 이메일입니다.", {
        position: "bottom-right",
      });
      setFormData((prev) => ({ ...prev, email: "" }));
      setFormState("form");
      return;
    }

    if (analyzeFetcher.data.code) {
      toast.error(analyzeFetcher.data.msg || "오류가 발생했습니다.", {
        position: "bottom-right",
      });
      setFormState("form");
      return;
    }

    if (analyzeFetcher.data.report) {
      console.log("[FormSection] Report received:", analyzeFetcher.data.report);
      setFormState("result");
      toast.success("진단 분석이 완료되었습니다!", {
        position: "bottom-right",
      });
      return;
    }

    if (analyzeFetcher.data.msg && !analyzeFetcher.data.code) {
      console.log("[FormSection] Success message received (no report):", analyzeFetcher.data);
      setFormState("result");
      return;
    }

    console.log("[FormSection] Unhandled response:", analyzeFetcher.data);
  }, [analyzeFetcher.state, analyzeFetcher.data]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const supportedExchanges = ["bitget", "okx"];

    if (!formData.exchange) {
      toast.error("지원하는 거래소를 선택해주세요. (Bitget, OKX)", {
        position: "bottom-right",
      });
      return;
    }

    if (!supportedExchanges.includes(formData.exchange)) {
      toast.error("현재 Bitget과 OKX만 지원합니다.", {
        position: "bottom-right",
      });
      return;
    }

    if (!formData.accessKey || !formData.secretKey || !formData.passphrase) {
      toast.error("API Key, Secret Key, Passphrase를 모두 입력해주세요.", {
        position: "bottom-right",
      });
      return;
    }

    analyzeFetcher.submit(
      {
        actionType: "analyze-exchange",
        exchange: formData.exchange,
        apiKey: formData.accessKey,
        secretKey: formData.secretKey,
        passphrase: formData.passphrase,
        email: formData.email || null,
      },
      {
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const handleFinalSubmit = () => {
    toast.success("🎉 초기 멤버 등록 완료!", {
      position: "bottom-right",
    });
  };

  const securityFeatures = [
    {
      icon: Eye,
      title: "Read-Only",
      description: "조회 전용 키만 입력받습니다. 출금 불가.",
    },
    {
      icon: Lock,
      title: "Encryption",
      description: "AES-256 암호화 저장.",
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "개인화 모델링 용도로만 사용.",
    },
  ];

  return (
    <section id="form-section" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-background to-background" />

      <div className="px-5 relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 <span className="text-gradient-primary">무료 진단</span>
            받기
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            30초 만에 API를 연동하고 트레이딩 분석 결과를 확인하세요.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 px-6 py-5 text-base font-semibold"
            >
              <Link to="/demo-trading-diagnosis">
                <BarChart3 className="w-5 h-5 mr-2" />
                데모 트레이딩 진단 결과 미리보기
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              실제 API 연동 없이 분석 결과를 체험해보세요
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SecurityInfo securityFeatures={securityFeatures} headingIcon={Shield} />
            <TrustBadges />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {formState === "form" && (
                <DiagnosisForm
                  formData={formData}
                  setFormData={setFormData}
                  analyzeFetcher={analyzeFetcher}
                  exchanges={exchanges}
                  handleSubmit={handleSubmit}
                />
              )}

              {formState === "loading" && <LoadingCard steps={loadingSteps} />}

              {formState === "insufficient-data" && (
                <motion.div
                  key="insufficient-data"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-8"
                >
                  <div className="p-5 bg-loss/10 border border-loss/20 rounded-xl mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-loss" />
                      <h4 className="font-semibold text-loss">데이터 부족</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      분석을 위해서는 최소 100개 이상의 거래 데이터가 필요합니다.
                    </p>
                    {analyzeFetcher.data?.dataCount && (
                      <div className="mt-3 p-3 bg-background/50 rounded-lg text-sm">
                        <p className="font-mono text-foreground mb-1">
                          현재 데이터: {analyzeFetcher.data.dataCount.total}개
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Fills: {analyzeFetcher.data.dataCount.fills}개</p>
                          <p>Orders: {analyzeFetcher.data.dataCount.orders}개</p>
                          <p>Positions: {analyzeFetcher.data.dataCount.positions}개</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      setFormState("form");
                      setFormData({
                        exchange: formData.exchange,
                        accessKey: "",
                        secretKey: "",
                        passphrase: "",
                        email: formData.email,
                      });
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    다시 시도
                  </Button>
                </motion.div>
              )}

              {formState === "result" && (
                <ResultView analyzeFetcher={analyzeFetcher} onFinalSubmit={handleFinalSubmit} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
