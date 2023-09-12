import React from "react";
import { useQuery } from "@apollo/client";
import { siteSettingQuery } from "@/Graphql/SiteSetting";
import Head from "next/head";
import { useRouter } from "next/router";
const SEO = ({
  title,
  description,
  keywords,
  image,
  seoCanonical,
  children,
}) => {
  const { data, loading } = useQuery(siteSettingQuery);

  if (loading) return null;
  const {
    GlobalSEO: { openGraphImage, robotsMeta },
    siteSettings: { siteLogo },
  } = data?.siteSettings;
  const router = useRouter();

  const canonicalUrl = data?.siteSettings
    ? `${data?.siteSettings?.siteSettings.siteUrl}${router.asPath}`
    : null;

  const pageTitle = data?.siteSettings?.siteSettings?.title || title;
  const seo = {
    title: `WHW AKADEMIE - ${pageTitle}`,
    description: description,
    image: image || openGraphImage?.sourceUrl,
    logo: siteLogo?.sourceUrl || "/logo.ico",
    seoCanonical: canonicalUrl || seoCanonical,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo?.description} />
      {seo.image && <meta name="og:image" content={seo.image} />}
      <meta name="twitter:title" content={seo.title} />
      {seo.image && <meta name="image" content={seo.image} />}
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta
        name="theme-color"
        content="linear-gradient(rgb(50, 117, 74) 0%, rgb(204, 212, 68) 100%)"
      />
      <link rel="canonical" href={seo.seoCanonial} />
      <link rel="icon" href={seo.logo} />
      {robotsMeta &&
        robotsMeta.map((item) => {
          if (item.includes("noindex")) {
            return <meta name="robots" content="noindex" />;
          }
          if (item.includes("nofollow")) {
            return <meta name="robots" content="nofollow" />;
          }
        })}
    </Head>
  );
};

export default SEO;
