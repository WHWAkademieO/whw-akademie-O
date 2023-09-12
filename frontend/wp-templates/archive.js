import { gql } from "@apollo/client";
import * as MENUS from "../src/constants/menus";
import { BlogInfoFragment } from "../src/fragments/GeneralSettings";
import { SEO } from "../src/components";
import parse from "html-react-parser";
import wpBlocks from "../wp-blocks";

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: "", content: "" };

  if (props?.loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <div>{parse(content || "")}</div>
    </>
  );
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
      ...FeaturedImageFragment
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
