/**
 * Sitemap Generator Module for Beta Version
 *
 * 베타 버전에서는 랜딩 페이지(/)만 sitemap에 포함합니다.
 * Phase 0 전략에 따라 Waitlist 랜딩 페이지만 검색 엔진에 노출합니다.
 *
 * 향후 정식 런칭 시에는 다음을 포함할 수 있습니다:
 * - Legal pages from MDX files in the legal directory
 * - Login, registration pages
 * - Other public pages
 */
/**
 * Sitemap generator loader function for Beta Version
 *
 * 베타 버전에서는 랜딩 페이지(/)만 sitemap에 포함합니다.
 *
 * @returns {Response} XML response containing the sitemap
 */
export async function loader() {
  // Get the site domain from environment variables
  const DOMAIN = process.env.SITE_URL;

  // 베타 버전: 랜딩 페이지(/)만 포함
  const sitemapUrls = ["/"].map((url) => {
    return `<url>
      <loc>${DOMAIN}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`;
  });

  // Return an XML response with the sitemap
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${sitemapUrls.join("\n")}
    </urlset>
    `,
    {
      headers: { "Content-Type": "application/xml" }, // Set proper content type for XML
    }
  );
}
