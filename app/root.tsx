/**
 * Root Application Component
 *
 * This is the top-level component of the application that sets up:
 * - Theme management with light mode support (dark mode is not supported)
 * - Internationalization (i18n) configuration
 * - Global UI components like dialogs and sheets
 * - Error boundaries and 404 handling
 * - Analytics integrations (Google Tag Manager)
 * - Customer support integration (Channel.io)
 * - Progress indicators for navigation
 */
import "./app.css";

import type { Route } from "./+types/root";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css?url";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import { useChangeLanguage } from "remix-i18next/react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { Toaster } from "sonner";
import { Dialog } from "./core/components/ui/dialog";
import { Sheet } from "./core/components/ui/sheet";
import { detectCountry, getLocaleFromCountry } from "./core/lib/geoip.server";
import { localeCookie } from "./core/lib/i18next.server";
import { cn } from "./core/lib/utils";
import NotFound from "./core/screens/404";

export const links: Route.LinksFunction = () => [
  // favicon, web & app icons
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon/favicon-96x96.png",
  },
  { rel: "shortcut icon", href: "/favicon/favicon.ico" },

  // --- Apple Touch Icons ---
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/favicon/apple-touch-icon-57x57.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/favicon/apple-touch-icon-72x72.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/favicon/apple-touch-icon-76x76.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/favicon/apple-touch-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/favicon/apple-touch-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/favicon/apple-touch-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/favicon/apple-touch-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon-180x180.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "192x192",
    href: "/favicon/apple-touch-icon-192x192.png",
  },

  // --- Android / PWA ---
  { rel: "manifest", href: "/site.webmanifest" },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
  },
  { rel: "stylesheet", href: nProgressStyles },
];

/**
 * Root loader function
 *
 * This server-side function runs on every request and is responsible for:
 * 1. Validating that all required environment variables are present
 * 2. Loading the user's theme preference from the session
 * 3. Detecting the user's preferred locale
 *
 * The data returned from this loader is available throughout the application
 * via the useRouteLoaderData hook with the 'root' ID.
 *
 * @param request - The incoming HTTP request
 * @returns Object containing theme and locale preferences
 */
export async function loader({ request }: Route.LoaderArgs) {
  // Get locale with IP-based detection fallback
  // Priority: 1. Cookie (user preference) 2. IP-based detection 3. Default (en)

  // First, check if user has a language preference cookie
  const cookie = await localeCookie.parse(request.headers.get("Cookie"));
  let locale: string;

  if (cookie) {
    // User has a language preference cookie, use it
    locale = cookie;
  } else {
    // No cookie set, detect locale based on IP address
    const countryCode = await detectCountry(request);
    locale = getLocaleFromCountry(countryCode);
  }

  // Always return light theme (dark mode is not supported)
  return {
    theme: "dark",
    locale,
  };
}

/**
 * i18n handle for the root route
 * Specifies that this route uses the 'common' translation namespace
 */
export const handle = {
  i18n: "common",
};

/**
 * Primary Layout Component
 *
 * This component wraps the entire application with the ThemeProvider
 * to enable light mode functionality. The application only supports light mode.
 *
 * @param children - Child components to render within the layout
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      specifiedTheme={Theme.DARK} // Always use light theme (dark mode is not supported)
      themeAction="" // API endpoint (disabled, but kept for compatibility)
    >
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}

/**
 * Inner Layout Component
 *
 * This component handles the HTML structure of the application and applies:
 * - Language direction (RTL/LTR) based on the current locale
 * - Theme class to the HTML element
 * - Special handling for pre-rendered routes (blog, legal pages)
 * - Loading of analytics and customer support scripts
 *
 * @param children - Child components to render within the layout
 */
function InnerLayout({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme();
  const data = useRouteLoaderData<typeof loader>("root");
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  // Set the i18next language based on the locale from the loader
  useChangeLanguage(data?.locale ?? "en");

  // Detect if the current route is a pre-rendered page (blog or legal)
  // These pages require special theme handling
  const isPreRendered =
    pathname.includes("/legal") || pathname.includes("/blog");

  return (
    <html
      lang={data?.locale ?? "en"}
      className={cn(theme ?? "", "h-full")}
      dir={i18n.dir()}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {isPreRendered ? (
          <script src="/scripts/prerendered-theme.js" />
        ) : (
          <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
        )}
        <script src="https://static.geetest.com/v4/gt4.js"></script>
      </head>
      <body>
        {children}
        <Toaster richColors position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Main Application Component
 *
 * This is the primary component rendered by React Router.
 * It handles global UI elements, progress indicators, and navigation.
 *
 * Key responsibilities:
 * 1. Setting up progress indicators for navigation (NProgress)
 * 2. Handling Supabase authentication redirects
 * 3. Providing global UI context (Sheet and Dialog components)
 */
export default function App() {
  const navigation = useNavigation();

  // Initialize NProgress with spinner for better UX during navigation
  useEffect(() => {
    NProgress.configure({ showSpinner: true });
  }, []);

  // Show/hide progress bar based on navigation state
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else if (navigation.state === "idle") {
      NProgress.done();
    }
  }, [navigation.state]);

  // Handle Supabase authentication redirects
  // This is a workaround for a Supabase auth issue: https://github.com/supabase/auth/issues/1927
  // TODO: Remove this once the issue is fixed
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      const error = searchParams.get("error");
      const code = searchParams.get("code");
      if (error) {
        // Redirect to error page if authentication failed
        navigate(`/error?${searchParams.toString()}`);
      } else if (code) {
        // Redirect to dashboard if authentication succeeded
        navigate(`/dashboard/account`);
      }
    }
  }, [searchParams]);

  return (
    <Sheet>
      <Dialog>
        <Outlet />
      </Dialog>
    </Sheet>
  );
}

/**
 * Global Error Boundary Component
 *
 * This component catches and displays errors that occur during rendering
 * anywhere in the application. It provides different behavior based on:
 * - Error type (route error vs. JavaScript error)
 * - Environment (development vs. production)
 *
 * Key features:
 * - Special handling for 404 errors with a custom NotFound component
 * - Error reporting to Sentry in production
 * - Detailed stack traces in development mode
 * - User-friendly error messages in production
 *
 * @param error - The error that was caught by React Router
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    // Handle route errors (404, 500, etc.)
    if (error.status === 404) {
      // Show custom 404 page for "not found" errors
      return <NotFound />;
    }
    message = "Error";
    details = error.statusText || details;
  } else if (error && error instanceof Error) {
    // Handle JavaScript errors
    if (
      import.meta.env.VITE_SENTRY_DSN &&
      import.meta.env.MODE === "production"
    ) {
      // Report error to Sentry in production
      // Sentry.captureException(error);
    }
    if (import.meta.env.DEV) {
      // Show detailed error information in development
      details = error.message;
      stack = error.stack;
    }
  }

  // Render a simple error page with available information
  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
