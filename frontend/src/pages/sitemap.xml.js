// pages/sitemap.xml.js
import { getSitemapProps } from "@faustwp/core";

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: process.env.SITE_URL,
    pages: [
      {
        path: "/",
        changefreq: "daily",
        priority: 0.7,
      },
    ],
  });
}
