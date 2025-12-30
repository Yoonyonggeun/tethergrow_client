/**
 * Robots.txt Generator for Beta Version
 *
 * 베타 버전에서는 랜딩 페이지(/)만 검색 엔진에 노출하고,
 * 나머지 모든 경로는 차단합니다.
 */
export async function loader() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api
Disallow: /dashboard
Disallow: /account
Disallow: /settings
Disallow: /payments
Disallow: /auth
Disallow: /legal
Disallow: /error

Sitemap: ${process.env.SITE_URL}/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
