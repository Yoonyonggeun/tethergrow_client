/**
 * GeoIP Utility Functions
 *
 * This module provides functions to detect the user's country based on their IP address.
 * It supports multiple detection methods:
 * 1. Cloudflare's CF-IPCountry header (if using Cloudflare)
 * 2. X-Forwarded-For header (for proxy detection)
 * 3. Direct IP from request
 * 4. Fallback to free GeoIP API (ip-api.com)
 *
 * The primary use case is to determine the user's language preference based on their location.
 */

/**
 * Get the client IP address from the request
 *
 * This function checks various headers to find the real client IP address,
 * accounting for proxies, load balancers, and CDNs.
 *
 * @param request - The incoming HTTP request
 * @returns The client IP address or null if not found
 */
export function getClientIP(request: Request): string | null {
  // Check Cloudflare header first (if using Cloudflare)
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Check X-Forwarded-For header (common in proxy setups)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    const ips = xForwardedFor.split(",").map((ip) => ip.trim());
    const firstIP = ips[0];
    if (firstIP && firstIP !== "127.0.0.1" && firstIP !== "::1") {
      return firstIP;
    }
  }

  // Check X-Real-IP header (used by some proxies)
  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP && xRealIP !== "127.0.0.1" && xRealIP !== "::1") {
    return xRealIP;
  }

  // For local development, try to get the actual public IP
  // by making a request to a service that returns the client IP
  // This is handled in detectCountry function for localhost cases
  const url = new URL(request.url);
  const hostname = url.hostname;

  // If hostname is localhost or 127.0.0.1, we'll use a different approach
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  ) {
    // Return a special marker to indicate localhost
    // The detectCountry function will handle this case
    return "localhost";
  }

  return null;
}

/**
 * Get country code from Cloudflare header
 *
 * If the application is behind Cloudflare, the CF-IPCountry header
 * provides the country code without needing an external API call.
 *
 * @param request - The incoming HTTP request
 * @returns Country code (ISO 3166-1 alpha-2) or null if not available
 */
export function getCountryFromCloudflare(request: Request): string | null {
  return request.headers.get("cf-ipcountry") || null;
}

/**
 * Get country code from IP address using free GeoIP API
 *
 * This function uses ip-api.com's free service to get country information.
 * Note: This service has rate limits (45 requests per minute for free tier).
 * For production, consider using a paid service or caching results.
 *
 * @param ip - The IP address to look up
 * @returns Country code (ISO 3166-1 alpha-2) or null if lookup fails
 */
export async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Use ip-api.com free service (no API key required)
    // Response format: JSON with countryCode field
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(2000), // 2 second timeout
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { countryCode?: string };
    return data.countryCode?.toUpperCase() || null;
  } catch (error) {
    // Silently fail - return null if API call fails
    // This ensures the application continues to work even if GeoIP service is down
    console.error("GeoIP lookup failed:", error);
    return null;
  }
}

/**
 * Detect user's country code from request
 *
 * This is the main function to use for country detection. It tries multiple methods:
 * 1. Cloudflare header (fastest, no API call)
 * 2. IP-based lookup via free API (fallback)
 *
 * @param request - The incoming HTTP request
 * @returns Country code (ISO 3166-1 alpha-2) or null if detection fails
 */
export async function detectCountry(request: Request): Promise<string | null> {
  // First, try Cloudflare header (if available)
  const cfCountry = getCountryFromCloudflare(request);
  if (cfCountry && cfCountry !== "XX") {
    // "XX" means Cloudflare couldn't determine the country
    return cfCountry;
  }

  // Fallback: get IP and look it up
  const ip = getClientIP(request);

  // For localhost/development, use a service that returns the client's public IP
  if (ip === "localhost" || !ip) {
    try {
      // Use ip-api.com to get the client's public IP and country
      // This works even from localhost by detecting the actual public IP
      const response = await fetch(
        "http://ip-api.com/json/?fields=countryCode,query",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(3000), // 3 second timeout
        }
      );

      if (response.ok) {
        const data = (await response.json()) as {
          countryCode?: string;
          query?: string;
        };
        return data.countryCode?.toUpperCase() || null;
      }
    } catch (error) {
      console.error("Failed to detect country from public IP service:", error);
    }
    return null;
  }

  // Use free GeoIP API for the detected IP
  return await getCountryFromIP(ip);
}

/**
 * Determine locale based on country code
 *
 * Maps country codes to language codes. Currently:
 * - KR (South Korea) -> "ko" (Korean)
 * - All other countries -> "en" (English, default)
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Language code ("ko" or "en")
 */
export function getLocaleFromCountry(countryCode: string | null): "ko" | "en" {
  if (countryCode === "KR") {
    return "ko";
  }
  return "en";
}
