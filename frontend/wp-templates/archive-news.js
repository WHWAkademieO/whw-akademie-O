import Hero from "../src/components/Hero/Hero";
import Layout from "../src/components/layout";
import React from "react";
import Image from "next/image";
import TitleTextBlock from "../src/components/TitleTextBlock/TitleTextBlock";
import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import ImageTextBlock from "@/components/ImageTextBlock/ImageTextBlock";

const Component = props => {
  const posts = props?.data?.posts?.nodes;

  if (props?.loading) {
    return <LoadingOverlay />;
  }

  return (
    <Layout>
      <Hero title="aktuelles" height="50vh" bg="/news/hero-news.png" />
      <div className="my-28 flex flex-col gap-10">
        {posts?.map((post, index) => {
          const reverse = index % 2 == 0;
          return (
            <ImageTextBlock
              ctaItem={{
                href: `/news/${post?.slug}`,
                text: "mehr ertahren",
              }}
              img={{url: post?.featuredImage?.node?.sourceUrl}}
              reverse={reverse}
              title={post?.title}
              content={post?.content}
            />
          );
        })}
      </div>
    </Layout>
  );
};

Component.variables = ({ uri, ...rest }, ctx) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  {
    posts {
      nodes {
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export default Component;
