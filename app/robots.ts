import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // "/privacy-policy",
          // "/website-disclaimer",
          // "/terms",
          // "/about",
          // "/contact",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_API_URL}/sitemap.xml`,
  };
}
