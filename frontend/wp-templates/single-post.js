import Hero from "../src/components/Hero/Hero";
import Layout from "../src/components/layout";
import React from "react";
import Image from "next/image";
import TitleTextBlock from "../src/components/TitleTextBlock/TitleTextBlock";
import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import parse from "html-react-parser";
import { BlogInfoFragment } from "../src/fragments/GeneralSettings";
import { SEO } from "@/components";
import LoadingOverlay from "@/components/Loading";

const Component = (props) => {
  const title = props?.data?.post?.title || "";
  const content = props?.data?.post?.content || "";
  const alignment = props?.data?.post?.alignment || `"center"`
  const article = props?.data?.post?.article || {};
  const featureImage = props?.data?.post?.featuredImage?.node?.sourceUrl || "";
  const seo = props?.data?.post?.pageSettings;
  return (
    <Layout>
      <SEO
        title={seo?.seoTitle || title}
        description={seo?.description}
        seoCanonical={seo?.seoCanonical}
      />
      <Hero
        title={article?.hero?.title || ""}
        isBackend={false}
        height={false}
        bg={article?.hero?.banner?.sourceUrl || "/news/hero-news.png"}
      />
      <div className="container mt-20 max-h-[600px] flex justify-center">
        {featureImage && (
          <Image
            width={1920}
            height={1000}
            src={featureImage}
            className="object-contain bg-center max-h-full w-full"
            alt="news image"
          />
        )}
      </div>
      <TitleTextBlock
        attributes={{
          dot: false,
          title,
          content,
          alignment
        }}
      />
    </Layout>
  );
};

Component.query = gql`
  query GetPageData($databaseId: ID!) {
    post(id: $databaseId, idType: DATABASE_ID) {
      title
      content
      article {
        shortDescription
        hero {
          title
          banner {
            sourceUrl
          }
        }
      }

      pageSettings {
        seoTitle
        description
        seoCanonical
      }

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

Component.variables = ({ uri, databaseId, ...rest }, ctx) => {
  return {
    uri,
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export default Component;
