import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  ...prefix("/api", [
    ...prefix("/settings", [
      route("/locale", "features/settings/api/set-locale.tsx"),
    ]),
  ]),
  // navigation layout
  layout("core/layouts/navigation.layout.tsx", [
    // public layout
    layout("core/layouts/public.layout.tsx", [
      // landing page (Phase 0 LP)
      route("/", "features/home/screens/landing.tsx"),
      // demo trading diagnosis
      route(
        "/demo-trading-diagnosis",
        "features/home/screens/demo-trading-diagnosis.tsx"
      ),
      // landing page V2 (베타 랜딩 V2)
      // route("/beta-v2", "features/home/screens/landing-beta-v2.tsx"),
      // home (기존 홈페이지)
      // route("/home", "features/home/screens/home.tsx"),
      // service
      // route("/service", "features/services/screens/service.tsx"),
      // payback test
      // route("/payback-test", "features/services/screens/payback-test.tsx"),
      // route(
      //   "/payback-test-result",
      //   "features/services/screens/payback-test-result.tsx"
      // ),
      // exchange detail
      // route(
      //   "/exchange/:detailPageParams",
      //   "features/exchanges/screens/exchange-detail.tsx"
      // ),

      // terms, privacy
      // route("/legal/terms-of-use", "features/legal/screens/terms-of-use.tsx"),
      // route(
      //   "/legal/privacy-policy",
      //   "features/legal/screens/privacy-policy.tsx"
      // ),

      // login, join
      // route("/auth/login", "features/auth/screens/login.tsx"),
      // route("/auth/join", "features/auth/screens/join.tsx"),
      // route("/auth/logout", "features/auth/screens/logout.tsx"),

      // password reset
      // route("/auth/password-reset", "features/auth/screens/password-reset.tsx"),
    ]),

    // private layout
    // layout("core/layouts/private.layout.tsx", [
    // my page
    // route("/dashboard", "features/dashboard/screens/dashboard.tsx"),
    // route(
    //   "/dashboard/:dashboardPageParams",
    //   "features/dashboard/screens/dashboard-exchange.tsx"
    // ),
    // route(
    //   "/dashboard-second",
    //   "features/dashboard/screens/dashboard-second.tsx"
    // ),
    // dashboard-bitget
    // route(
    //   "/dashboard-bitget",
    //   "features/dashboard/screens/dashboard-bitget.tsx"
    // ),
    // profile
    // route("/profile", "features/settings/screens/profile.tsx"),
    // ]),

    // error
    route("/error", "core/screens/error.tsx"),
  ]),
] satisfies RouteConfig;
