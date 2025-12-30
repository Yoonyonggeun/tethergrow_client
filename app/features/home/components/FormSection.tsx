import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  HelpCircle,
  CheckCircle,
  Loader2,
  Gift,
  ArrowRight,
  BarChart3,
  AlertCircle,
  TrendingUp,
  Target,
  Zap,
  Activity,
  Info,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/core/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { Button } from "~/core/components/ui/button";
import { Link, useFetcher } from "react-router";
import { Input } from "~/core/components/ui/input";
import { Label } from "~/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/core/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/core/components/ui/dialog";
import { toast } from "sonner";

type FormState = "form" | "loading" | "result" | "insufficient-data";

interface FormSectionProps {
  exchanges?: Array<{
    _id: string;
    nameEn: string;
    nameKo: string;
    order: number;
  }>;
}

const FormSection = ({ exchanges = [] }: FormSectionProps) => {
  const [formState, setFormState] = useState<FormState>("form");
  const [formData, setFormData] = useState({
    exchange: "",
    // accessKey: "bg_c5cda9db6c83d74c3a1e51149c9c74db",
    // secretKey:
    //   "a99ff62a5c7f927cb9077cb697c7dc188c87a27cfcc17d804c65f8fa6502f2fc",
    // passphrase: "dydwnddnl9",
    // email: "rna5yoon@naver.com",
    accessKey: "dc45d7fb-ea8e-4a9a-bf16-d01576e3ad37",
    secretKey: "E5F069D53C9D2D9C9BFDB7FBF34826BF",
    passphrase: "Test251117!",
    email: "tkfkdgo3057@gmail.com",
  });
  const analyzeFetcher = useFetcher();

  // Fetcher 상태 및 응답 처리
  useEffect(() => {
    // 로딩 중일 때
    if (
      analyzeFetcher.state === "submitting" ||
      analyzeFetcher.state === "loading"
    ) {
      setFormState("loading");
      return;
    }

    // 응답이 없으면 리턴
    if (!analyzeFetcher.data) return;

    // 에러 케이스 처리
    if (analyzeFetcher.data.code === "080104") {
      // 데이터 부족 에러 (100개 미만)
      setFormState("insufficient-data");
      toast.error(
        analyzeFetcher.data.msg ||
          "분석을 위해서는 최소 100개 이상의 거래 데이터가 필요합니다.",
        {
          position: "bottom-right",
        }
      );
      return;
    }

    if (analyzeFetcher.data.code === "080102") {
      // 이메일 중복 에러
      toast.error(analyzeFetcher.data.msg || "이미 사용중인 이메일입니다.", {
        position: "bottom-right",
      });
      setFormData((prev) => ({ ...prev, email: "" }));
      setFormState("form");
      return;
    }

    if (analyzeFetcher.data.code) {
      // 기타 에러
      toast.error(analyzeFetcher.data.msg || "오류가 발생했습니다.", {
        position: "bottom-right",
      });
      setFormState("form");
      return;
    }

    // 성공 케이스 - report가 있으면 결과 표시
    if (analyzeFetcher.data.report) {
      console.log("[FormSection] Report received:", analyzeFetcher.data.report);
      setFormState("result");
      toast.success("진단 분석이 완료되었습니다!", {
        position: "bottom-right",
      });
      return;
    }

    // report가 없어도 msg가 있고 code가 없으면 성공으로 간주 (레거시 지원)
    if (analyzeFetcher.data.msg && !analyzeFetcher.data.code) {
      console.log(
        "[FormSection] Success message received (no report):",
        analyzeFetcher.data
      );
      setFormState("result");
      return;
    }

    // 응답이 있지만 처리되지 않은 경우 (디버깅용)
    console.log("[FormSection] Unhandled response:", analyzeFetcher.data);
  }, [analyzeFetcher.state, analyzeFetcher.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bitget만 지원
    if (formData.exchange !== "bitget") {
      toast.error("현재 Bitget만 지원합니다.", {
        position: "bottom-right",
      });
      return;
    }

    // 필수 필드 검증
    if (!formData.accessKey || !formData.secretKey || !formData.passphrase) {
      toast.error("API Key, Secret Key, Passphrase를 모두 입력해주세요.", {
        position: "bottom-right",
      });
      return;
    }

    // 분석 요청
    analyzeFetcher.submit(
      {
        actionType: "analyze-bitget",
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

  const loadingSteps = [
    "API 연결 확인 중...",
    "거래 내역 불러오는 중...",
    "수수료 계산 중...",
    "분석 완료!",
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
          {/* Left - Security Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-profit" />
                보안 및 개인정보 보호
              </h3>

              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-profit/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-profit" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground text-center">
                전 세계 <span className="font-mono text-primary">2,847+</span>{" "}
                트레이더가 신뢰합니다
              </p>
              <div className="flex justify-center gap-4 mt-4">
                {["256-bit SSL", "GDPR", "ISO 27001"].map((badge) => (
                  <div
                    key={badge}
                    className="px-3 py-1 bg-secondary/50 rounded-md text-xs font-mono text-muted-foreground border border-border/50"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form / Loading / Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {formState === "form" && (
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
                        onValueChange={(value) =>
                          setFormData({ ...formData, exchange: value })
                        }
                        disabled={
                          analyzeFetcher.state === "submitting" ||
                          analyzeFetcher.state === "loading"
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="거래소를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {exchanges.length > 0
                            ? exchanges.map((exchange) => (
                                <SelectItem
                                  key={exchange._id}
                                  value={exchange.nameEn?.toLowerCase() || ""}
                                >
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accessKey: e.target.value,
                          })
                        }
                        className="font-mono"
                        disabled={
                          analyzeFetcher.state === "submitting" ||
                          analyzeFetcher.state === "loading"
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secretKey">Secret Key</Label>
                      <Input
                        id="secretKey"
                        type="password"
                        placeholder="SECRET KEY를 입력하세요"
                        value={formData.secretKey}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secretKey: e.target.value,
                          })
                        }
                        className="font-mono"
                        disabled={
                          analyzeFetcher.state === "submitting" ||
                          analyzeFetcher.state === "loading"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secretKey">Passphrase</Label>
                      <Input
                        id="passphrase"
                        type="password"
                        placeholder="Passphrase를 입력하세요"
                        value={formData.passphrase}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passphrase: e.target.value,
                          })
                        }
                        className="font-mono"
                        disabled={
                          analyzeFetcher.state === "submitting" ||
                          analyzeFetcher.state === "loading"
                        }
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
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          disabled={
                            analyzeFetcher.state === "submitting" ||
                            analyzeFetcher.state === "loading"
                          }
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
                      disabled={
                        analyzeFetcher.state === "submitting" ||
                        analyzeFetcher.state === "loading"
                      }
                    >
                      {analyzeFetcher.state === "submitting" ||
                      analyzeFetcher.state === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          분석 중...
                        </>
                      ) : (
                        "내 트레이딩 진단하기"
                      )}
                    </Button>

                    {/* Helper link */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="flex items-center gap-2 text-sm text-primary hover:underline mx-auto"
                        >
                          <HelpCircle className="w-4 h-4" />
                          API 키 발급 방법을 모르시나요? 30초 가이드 보기
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>API 키 발급 가이드</DialogTitle>
                        </DialogHeader>
                        <ApiGuideContent />
                      </DialogContent>
                    </Dialog>
                  </form>
                </motion.div>
              )}

              {formState === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="relative mb-8">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/20" />
                  </div>
                  <LoadingSteps steps={loadingSteps} />
                </motion.div>
              )}

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
                      분석을 위해서는 최소 100개 이상의 거래 데이터가
                      필요합니다.
                    </p>
                    {analyzeFetcher.data?.dataCount && (
                      <div className="mt-3 p-3 bg-background/50 rounded-lg text-sm">
                        <p className="font-mono text-foreground mb-1">
                          현재 데이터: {analyzeFetcher.data.dataCount.total}개
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Fills: {analyzeFetcher.data.dataCount.fills}개</p>
                          <p>
                            Orders: {analyzeFetcher.data.dataCount.orders}개
                          </p>
                          <p>
                            Positions: {analyzeFetcher.data.dataCount.positions}
                            개
                          </p>
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
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* [1] Event Celebration Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-8 bg-gradient-to-r from-primary/10 to-profit/10 border-2 border-primary/20"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-profit/20 flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-10 h-10 text-profit" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        🎉 이벤트 참여 완료!
                      </h3>
                      <p className="text-muted-foreground">
                        트레이딩 진단 분석을 완료하셨습니다. 이제 개인 맞춤 분석
                        결과를 확인하세요.
                      </p>
                    </div>
                  </motion.div>

                  {/* [2] KPI Summary Cards (Clear) */}

                  {/* KPI Cards (데모 트레이딩 스타일) */}
                  {analyzeFetcher.data?.report ? (
                    <div className="space-y-6">
                      {/* [2] KPI Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                      >
                        {/* 총 순이익 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-profit" />
                            <span className="text-sm text-muted-foreground">
                              총 순이익
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`font-mono text-3xl font-bold ${
                                (analyzeFetcher.data.report.overview
                                  ?.totalPnL || 0) > 0
                                  ? "text-profit"
                                  : "text-loss"
                              }`}
                            >
                              {analyzeFetcher.data.report.overview?.totalPnL > 0
                                ? "+"
                                : ""}
                              {analyzeFetcher.data.report.overview?.totalPnL?.toFixed(
                                2
                              ) || "0.00"}
                            </span>
                            <span className="text-lg text-muted-foreground">
                              USDT
                            </span>
                          </div>
                        </motion.div>

                        {/* 승률 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              승률
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-3xl font-bold text-foreground">
                              {analyzeFetcher.data.report.overview?.winRate?.toFixed(
                                1
                              ) || "0.0"}
                            </span>
                            <span className="text-lg text-muted-foreground">
                              %
                            </span>
                          </div>
                        </motion.div>

                        {/* 총 거래 수 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              총 거래 수
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-3xl font-bold text-foreground">
                              {analyzeFetcher.data.report.overview
                                ?.totalTrades || 0}
                            </span>
                          </div>
                        </motion.div>

                        {/* 수수료 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              총 수수료
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-3xl font-bold text-loss">
                              -
                              {analyzeFetcher.data.report.costAnalysis?.totalFees?.toFixed(
                                2
                              ) || "0.00"}
                            </span>
                            <span className="text-lg text-muted-foreground">
                              USDT
                            </span>
                          </div>
                        </motion.div>

                        {/* 최대 낙폭 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="glass-card p-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <BarChart3 className="w-4 h-4 text-profit" />
                            <span className="text-sm text-muted-foreground">
                              최대 낙폭
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-3xl font-bold text-loss">
                              {analyzeFetcher.data.report.riskAnalysis?.maxDrawdown?.toFixed(
                                2
                              ) || "0.00"}
                            </span>
                            <span className="text-lg text-muted-foreground">
                              USDT
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* [3] Long / Short Ratio Analysis (Clear) */}
                      {analyzeFetcher.data.report.longShortRatio && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="glass-card p-8"
                        >
                          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            롱/숏 비율
                          </h2>
                          <LongShortTabs
                            data={[
                              {
                                coin: "전체",
                                long:
                                  analyzeFetcher.data.report.longShortRatio
                                    .overall?.long || 0,
                                short:
                                  analyzeFetcher.data.report.longShortRatio
                                    .overall?.short || 0,
                              },
                              ...(analyzeFetcher.data.report.longShortRatio
                                .byCoin || []),
                            ]}
                          />
                        </motion.div>
                      )}

                      {/* [4] Trading Simulation Preview (Semi-Clear) */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="glass-card p-8"
                      >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Activity className="w-6 h-6 text-primary" />
                          시뮬레이션 분석
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Equity Curve Chart */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">
                                자산 곡선
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Info className="w-3 h-3" />
                                <span>과거 데이터 재구성</span>
                              </div>
                            </div>
                            {analyzeFetcher.data.report.simulation ? (
                              <ChartContainer
                                config={{
                                  actual: {
                                    label: "실제",
                                    color: "#ef4444",
                                  },
                                  simulated: {
                                    label: "시뮬레이션",
                                    color: "#10b981",
                                  },
                                }}
                                className="h-[300px] w-full"
                              >
                                <LineChart
                                  data={analyzeFetcher.data.report.simulation.actual.map(
                                    (
                                      point: { date: string; value: number },
                                      i: number
                                    ) => ({
                                      date:
                                        point.date.split("-")[1] +
                                        "/" +
                                        point.date.split("-")[2],
                                      actual: point.value,
                                      simulated:
                                        analyzeFetcher.data.report.simulation
                                          .simulated[i]?.value || 0,
                                    })
                                  )}
                                >
                                  <XAxis
                                    dataKey="date"
                                    tick={{
                                      fill: "hsl(var(--muted-foreground))",
                                    }}
                                    fontSize={12}
                                  />
                                  <YAxis
                                    tick={{
                                      fill: "hsl(var(--muted-foreground))",
                                    }}
                                    fontSize={12}
                                  />
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={false}
                                    name="실제"
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="simulated"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    name="시뮬레이션"
                                    strokeDasharray="5 5"
                                    opacity={0.7}
                                  />
                                </LineChart>
                              </ChartContainer>
                            ) : (
                              <div className="h-[300px] flex items-center justify-center bg-secondary/30 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  시뮬레이션 데이터가 없습니다.
                                </p>
                              </div>
                            )}
                            {analyzeFetcher.data.report.simulation && (
                              <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-xs text-muted-foreground">
                                <p>
                                  적용된 가정: 극단 손실 거래 제거 (
                                  {analyzeFetcher.data.report.simulation
                                    .removedTradesCount || 0}
                                  건 제거)
                                </p>
                                <p className="mt-1">
                                  이 결과는 과거 거래 데이터를 특정 가정 하에
                                  재구성한 시뮬레이션입니다. 실제 수익을
                                  보장하지 않습니다.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Analysis Text */}
                          <div className="space-y-6">
                            <div className="p-5 bg-secondary/30 border border-border/50 rounded-xl">
                              <h3 className="text-lg font-semibold mb-4">
                                분석 요약 (통계 기반)
                              </h3>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm">
                                  <span className="text-primary font-bold mt-0.5">
                                    •
                                  </span>
                                  <span className="text-muted-foreground">
                                    총{" "}
                                    {analyzeFetcher.data.report.overview
                                      ?.totalTrades || 0}
                                    건의 거래 중{" "}
                                    {analyzeFetcher.data.report.overview?.winRate?.toFixed(
                                      1
                                    ) || "0.0"}
                                    % 의 승률을 기록했습니다.
                                  </span>
                                </li>
                                {analyzeFetcher.data.report.simulation && (
                                  <li className="flex items-start gap-3 text-sm">
                                    <span className="text-primary font-bold mt-0.5">
                                      •
                                    </span>
                                    <span className="text-muted-foreground">
                                      시뮬레이션 결과, 최대 낙폭이{" "}
                                      {analyzeFetcher.data.report.simulation
                                        .actualMDD || 0}
                                      USDT에서{" "}
                                      {analyzeFetcher.data.report.simulation
                                        .simulatedMDD || 0}
                                      USDT로 감소했습니다.
                                    </span>
                                  </li>
                                )}
                                {analyzeFetcher.data.report.overview
                                  ?.totalPnL !== undefined && (
                                  <li className="flex items-start gap-3 text-sm">
                                    <span className="text-primary font-bold mt-0.5">
                                      •
                                    </span>
                                    <span className="text-muted-foreground">
                                      최근 90일 동안{" "}
                                      {analyzeFetcher.data.report.overview
                                        .totalPnL > 0
                                        ? "+"
                                        : ""}
                                      {analyzeFetcher.data.report.overview.totalPnL?.toFixed(
                                        2
                                      ) || "0.00"}{" "}
                                      USDT의 순이익을 기록했습니다.
                                    </span>
                                  </li>
                                )}
                                {analyzeFetcher.data.report.costAnalysis
                                  ?.totalFees && (
                                  <li className="flex items-start gap-3 text-sm">
                                    <span className="text-primary font-bold mt-0.5">
                                      •
                                    </span>
                                    <span className="text-muted-foreground">
                                      총{" "}
                                      {analyzeFetcher.data.report.costAnalysis.totalFees.toFixed(
                                        2
                                      )}{" "}
                                      USDT의 수수료를 지출했습니다.
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>

                            <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl">
                              <h4 className="font-semibold mb-2 text-primary">
                                AI 인사이트
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {analyzeFetcher.data.report.simulation
                                  ?.equityVolatilityReduced
                                  ? "일부 극단적인 손실 거래를 제거했을 경우, 자산 곡선의 변동성이 감소하는 것으로 관찰됩니다. 소수의 큰 손실 거래가 전체 성과에 상당한 영향을 미쳤습니다."
                                  : "과거 거래 패턴을 분석한 결과, 트레이딩 전략 최적화를 통해 성과 개선의 여지가 있습니다. 초기 멤버에 합류하시면 더 상세한 분석과 맞춤형 전략을 확인하실 수 있습니다."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* [5] Locked Advanced Insights (Blur) */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="glass-card p-8"
                      >
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold mb-2">
                            시장 및 패턴 인사이트
                          </h2>
                          <p className="text-muted-foreground">
                            과거 데이터와 전체 트레이딩 패턴을 기반으로 한 참고
                            지표입니다.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Pattern Win Rate (Blur) */}
                          <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
                            <h3 className="text-sm text-muted-foreground mb-4">
                              패턴 승률
                            </h3>
                            <div className="text-center">
                              <div className="font-mono text-4xl font-bold text-primary mb-2">
                                73.2%
                              </div>
                              <p className="text-xs text-muted-foreground">
                                특정 패턴에서의 승률 분석 결과
                              </p>
                            </div>
                          </div>

                          {/* Crowd Position (Blur) */}
                          <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
                            <h3 className="text-sm text-muted-foreground mb-4">
                              군중 포지션
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-profit font-mono font-bold">
                                  롱 62%
                                </span>
                                <span className="text-loss font-mono font-bold">
                                  숏 38%
                                </span>
                              </div>
                              <div className="h-4 rounded-full overflow-hidden flex">
                                <div className="bg-profit w-[62%]" />
                                <div className="bg-loss w-[38%]" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                시장 전체 포지션 분포
                              </p>
                            </div>
                          </div>

                          {/* Trading Signal (Blur) */}
                          <div className="glass-card p-6 bg-secondary/30 blur-sm select-none pointer-events-none">
                            <h3 className="text-sm text-muted-foreground mb-4">
                              거래 신호
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-profit" />
                                <span className="font-semibold">진입 신호</span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                현재 시장 상황에 따른 거래 신호 분석
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 p-5 bg-secondary/50 border border-border/50 rounded-xl text-center">
                          <div className="flex items-center gap-2 justify-center mb-2">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              상세 분석 결과
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            전체 리포트는 '초기 멤버' 합류 후 확인 가능합니다
                          </p>
                        </div>
                      </motion.div>

                      {/* Final CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Button
                          onClick={handleFinalSubmit}
                          className="w-full bg-gradient-to-r from-primary to-profit hover:opacity-90 text-primary-foreground h-14 text-base font-semibold"
                        >
                          <Gift className="w-5 h-5 mr-2" />
                          초기 멤버 합류하고 90 USDT 크레딧 받기
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* 기본 결과 (레거시) */}
                      <div className="p-5 bg-loss/10 border border-loss/20 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          최근 90일 지출 수수료
                        </p>
                        <p className="font-mono text-3xl font-bold text-loss">
                          -1,240 USDT
                        </p>
                      </div>

                      <div className="p-5 bg-profit/10 border border-profit/20 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          페이백 받았을 경우
                        </p>
                        <p className="font-mono text-3xl font-bold text-profit">
                          +620 USDT 적립 가능
                        </p>
                      </div>

                      <Button
                        onClick={handleFinalSubmit}
                        className="w-full bg-gradient-to-r from-primary to-profit hover:opacity-90 text-primary-foreground h-14 text-base font-semibold"
                      >
                        <Gift className="w-5 h-5 mr-2" />
                        초기 멤버 합류하고 90 USDT 크레딧 받기
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LoadingSteps = ({ steps }: { steps: string[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500); // 1.5초마다 다음 단계로 이동

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-3 w-full max-w-xs">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: index <= currentStep ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-3 ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              index < currentStep
                ? "bg-profit"
                : index === currentStep
                  ? "bg-primary animate-pulse"
                  : "bg-muted"
            }`}
          >
            {index < currentStep ? (
              <CheckCircle className="w-4 h-4 text-profit-foreground" />
            ) : (
              <span className="text-xs font-mono">{index + 1}</span>
            )}
          </div>
          <span className="text-sm font-mono">{step}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Long/Short Tabs 컴포넌트 (데모 트레이딩과 동일)
const LongShortTabs = ({
  data,
}: {
  data: Array<{ coin: string; long: number; short: number }>;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeData = data[activeTab] ||
    data[0] || { coin: "전체", long: 0, short: 0 };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((item, index) => (
          <button
            key={item.coin}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {item.coin}
          </button>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-profit font-mono font-bold">
            롱 {activeData.long}%
          </span>
          <span className="text-loss font-mono font-bold">
            숏 {activeData.short}%
          </span>
        </div>
        <div className="h-8 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.long}%` }}
            transition={{ duration: 0.5 }}
            className="bg-profit"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeData.short}%` }}
            transition={{ duration: 0.5 }}
            className="bg-loss"
          />
        </div>
      </motion.div>
    </div>
  );
};

const ApiGuideContent = () => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            1
          </span>
          거래소 로그인 후 API 관리 페이지 이동
        </h4>
        <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">
            Bybit: 계정 → API 관리
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Bitget: 설정 → API 관리
          </p>
          <p className="text-sm text-muted-foreground">
            OKX: 계정 → API → 서브 계정 API
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            2
          </span>
          새 API 키 생성 (Read Only 권한만 선택)
        </h4>
        <div className="bg-loss/10 rounded-lg p-4 border border-loss/20">
          <p className="text-sm text-loss">
            ⚠️ 중요: "출금" 권한은 절대 활성화하지 마세요!
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Read / View 권한만 선택하면 안전합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            3
          </span>
          생성된 키 복사 후 입력
        </h4>
        <div className="bg-profit/10 rounded-lg p-4 border border-profit/20">
          <p className="text-sm text-profit">
            ✓ Access Key와 Secret Key를 복사하여 위 폼에 입력하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
