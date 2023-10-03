import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import { BlogInfoFragment } from "../src/fragments/GeneralSettings";
import { SEO } from "../src/components";
import parse from "html-react-parser";
import { flatListToHierarchical } from "@faustwp/core";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import components from "../src/components/blocks";
import Layout from "@/components/layout";
import { useMemo } from "react";
import LoadingOverlay from "@/components/Loading";

export default function Component(props) {
  const { editorBlocks } = props.data.page;
  const {
    seoTitle,
    description: pageDescription,
    seoCanonical,
    socialGraphImage,
  } = props?.data?.page?.pageSettings;
  const { title, content, featuredImage } = props?.data?.page ?? {
    title: "",
  };

  return (
    <Layout>
      <SEO
        title={seoTitle || title}
        description={pageDescription}
        image={socialGraphImage?.sourceUrl}
        seoCanonical={seoCanonical}
      />
      {/* <div>{parse(content)}</div> */}
      <WordPressBlocksViewer blocks={editorBlocks} />
    </Layout>
  );
}

Component.variables = ({ uri, databaseId, ...rest }, ctx) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${components.CreateBlockHeroBlocks.fragments.entry}
  ${components.CreateBlockTextBlocks.fragments.entry}
  ${components.CreateBlockTextCtaBlocks.fragments.entry}
  ${components.CreateBlockImageTextBlocks.fragments.entry}
  ${components.CreateBlockLogoStrip.fragments.entry}
  ${components.CreateBlockMapBlocks.fragments.entry}
  ${components.CreateBlockEventBlocks.fragments.entry}
  ${components.CreateBlockFullWidthBlocks.fragments.entry}
  ${components.CreateBlockFeaturedNewBlocks.fragments.entry}
  ${components.CreateBlockTeamCtaBlocks.fragments.entry}
  ${components.CreateBlockFormBlock.fragments.entry}
  ${components.CreateBlockBackgroundMediaBlocks.fragments.entry}
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
      pageSettings {
        seoTitle
        description
        seoCanonical 
        socialGraphImage {
          sourceUrl
        }
      }
      download{
        download{
          title
          file{
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
        ...${components.CreateBlockFullWidthBlocks.fragments.key}
        ...${components.CreateBlockFeaturedNewBlocks.fragments.key}
        ...${components.CreateBlockTeamCtaBlocks.fragments.key}
        ...${components.CreateBlockFormBlock.fragments.key}
        ...${components.CreateBlockBackgroundMediaBlocks.fragments.key}
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
