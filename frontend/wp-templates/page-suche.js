import Hero from "../src/components/Hero/Hero";
import Layout from "../src/components/layout";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import TitleTextBlock from "../src/components/TitleTextBlock/TitleTextBlock";
import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import ImageTextBlock from "@/components/ImageTextBlock/ImageTextBlock";

import { SEO } from "@/components";
import Search from "@/components/Search/Search";

const Component = props => {

  const hero = props?.data?.page?.editorBlocks[0]?.attributes;
  const textBlock = props?.data?.page?.editorBlocks[1];
 
  return (
    <div>
      <SEO title={"Suche"} />
      <Layout>
        {hero && (
          <Hero
            isBackend={false}
            title={hero.title}
            height={false}
            bg={hero.mediaURL}
          />
        )}
        {textBlock && <TitleTextBlock {...textBlock} />}
        <Search />
        {/* <div className="my-28 flex flex-col gap-10"></div> */}
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
    page(id: "suche", idType: URI) {
      id
      editorBlocks {
        ... on CreateBlockHeroBlocks {
          attributes {
            mediaURL
            title
          }
        }
        ... on CreateBlockTextBlocks {
          attributes {
            dot
            title
            content
            alignment
            lock
          }
        }
      }
    }
  }
`;

export default Component;
