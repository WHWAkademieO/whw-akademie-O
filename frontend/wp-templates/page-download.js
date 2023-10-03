import Download from "@/components/Download/Download";
import TitleTextBlock from "@/components/TitleTextBlock/TitleTextBlock";
import Layout from "@/components/layout";
import { gql, useQuery } from "@apollo/client";
import { WordPressTemplate, getWordPressProps } from "@faustwp/core";
import React from "react";
import dlv from "dlv";
import { BlogInfoFragment } from "../src/fragments/GeneralSettings";
import components from "../src/components/blocks";
import * as MENUS from "../src/constants/menus";
import { WordPressBlocksViewer } from "@faustwp/blocks";

const Component = props => {
  const { page } = props.data;
  const { editorBlocks } = page;
  const downloadFiles = dlv(page, "download.download")?.map(download => ({
    content: download?.title,
    downloadSrc: download?.file?.sourceUrl || download?.file?.mediaItemUrl,
    id: download?.file?.id,
  }));
  
  return (
    <Layout>
      <div className="bg-gradient-green-full">
        <div className="container min-h-[500px] flex gap-10 flex-col justify-center items-center">
          <h2 className="uppercase text-4xl lg:text-6xl text-white font-bold">
            Downloads
          </h2>
          <div className="h-16  border-[5px] border-white w-full max-w-[600px] relative bg-white">
            <div className="absolute bg-black w-3/5 top-0 left-0 h-full"></div>
          </div>
        </div>
      </div>
      {/* <TitleTextBlock /> */}
      <WordPressBlocksViewer blocks={editorBlocks} />
      {/* <WordPressTemplate {...props} /> */}
      <Download data={downloadFiles || []} />
    </Layout>
  );
};

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}

Component.variables = ({ databaseId, ...rest }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${components.CreateBlockHeroBlocks.fragments.entry}
  ${components.CreateBlockTextCtaBlocks.fragments.entry}
  ${components.CreateBlockImageTextBlocks.fragments.entry}
  ${components.CreateBlockLogoStrip.fragments.entry}
  ${components.CreateBlockMapBlocks.fragments.entry}
  ${components.CreateBlockEventBlocks.fragments.entry}
  ${components.CreateBlockTextBlocks.fragments.entry}
  fragment NavigationMenuItemFragment on MenuItem {
    id
    path
    label
    parentId
    cssClasses
    menu {
      node {
        name
      }
    }
  }
  fragment FeaturedImageFragment on NodeWithFeaturedImage {
    featuredImage {
      node {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      download{
        download{
          title
          file{
            id
            sourceUrl
            mediaItemUrl
          }
        }
      }
      ...FeaturedImageFragment
      editorBlocks {
        name
        __typename
        renderedHtml
        ...${components.CreateBlockHeroBlocks.fragments.key}
        ...${components.CreateBlockTextBlocks.fragments.key}
        ...${components.CreateBlockTextCtaBlocks.fragments.key}
        ...${components.CreateBlockImageTextBlocks.fragments.key}
        ...${components.CreateBlockLogoStrip.fragments.key}
        ...${components.CreateBlockMapBlocks.fragments.key}
        ...${components.CreateBlockEventBlocks.fragments.key}
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

export default Component;
