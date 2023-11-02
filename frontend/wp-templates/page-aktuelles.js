import Hero from "../src/components/Hero/Hero";
import Layout from "../src/components/layout";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import TitleTextBlock from "../src/components/TitleTextBlock/TitleTextBlock";
import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import ImageTextBlock from "@/components/ImageTextBlock/ImageTextBlock";
import { useSearchContext } from "@/context/searchContext";
import { SEO } from "@/components";

const Component = (props) => {
  const posts = props?.data?.posts?.nodes;
  const hero = props?.data?.page?.editorBlocks[0]?.attributes;

  return (
    <div>
      <SEO title={"Aktuelles"} />
      <Layout>
        {hero && (
          <Hero
            isBackend={false}
            title={hero.title}
            height={false}
            bg={hero.mediaURL}
          />
        )}
        <div className="my-28 flex flex-col gap-10">
          {posts?.map((post, index) => {
            const reverse = index % 2 == 0;
            return (
              <div key={index} data-news={post?.id}>
                <ImageTextBlock
                  cta={{
                    href: {
                      url: `/aktuelles/${post?.slug}`,
                      type: "post",
                      kind: "post-type",
                    },
                    label: "mehr erfahren",
                  }}
                  isBackend={false}
                  img={post?.featuredImage?.node?.sourceUrl}
                  alt="feature image"
                  reverse={reverse}
                  title={post?.title}
                  content={post?.article?.shortDescription}
                  date={post?.date}
                />
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
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
    page(id: "aktuelles", idType: URI) {
      id
      editorBlocks {
        ... on CreateBlockHeroBlocks {
          apiVersion
          blockEditorCategoryName
          attributes {
            mediaURL
            title
          }
        }
      }
    }

    posts {
      nodes {
        date
        slug
        title
        id
        article {
          shortDescription
          hero {
            title
            banner {
              sourceUrl
            }
          }
        }
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
