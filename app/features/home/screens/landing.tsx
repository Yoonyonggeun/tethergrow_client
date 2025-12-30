import { data } from "react-router";
import type { Route } from "./+types/landing";
import { apiRequest } from "~/core/lib/api.server";
import EventSection from "../components/EventSection";
import FormSection from "../components/FormSection";
import HeroSection from "../components/HeroSection";
import LogicSection from "../components/LogicSection";
import ProblemSolutionSection from "../components/ProblemSolutionSection";
import ResultPreviewSection from "../components/ResultPreviewSection";

// loader => get exchanges in backend server
export async function loader({ request }: Route.LoaderArgs) {
  const exchanges = await apiRequest({
    request,
    endpoint: "/exchange/all",
    method: "GET",
  });

  return data({
    exchanges: exchanges.exchanges || [],
  });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.json();
  const { actionType, ...formValues } = formData;
  const exchange = typeof formValues.exchange === "string" ? formValues.exchange.toLowerCase() : "";

  if (["analyze-bitget", "analyze-okx", "analyze-exchange"].includes(actionType)) {
    // 90일 진단 분석 (Bitget, OKX)
    const endpoint = exchange === "okx" ? "/public/analysis/okx" : "/public/analysis";

    const response = await apiRequest({
      request,
      endpoint,
      method: "POST",
      body: {
        exchange,
        apiKey: formValues.apiKey,
        secretKey: formValues.secretKey || formValues.secret,
        passphrase: formValues.passphrase,
        email: formValues.email || null,
        productType: "USDT-FUTURES",
      },
    });

    return data(response);
  }

  return data({ error: "Invalid action" }, { status: 400 });
}

export default function Landing({ loaderData }: Route.ComponentProps) {
  const { exchanges } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <EventSection />
      <ProblemSolutionSection />
      <LogicSection />
      <ResultPreviewSection />
      <FormSection exchanges={exchanges} />
    </div>
  );
}
