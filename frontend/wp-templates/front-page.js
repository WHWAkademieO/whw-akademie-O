import LoadingOverlay from "@/components/Loading";
import Layout from "@/components/layout";
import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { SEO } from "../src/components";
import components from "../src/components/blocks";
export default function Component(props) {
  const { editorBlocks } = props.data.page;
  const {
    seoTitle: pageTitle,
    description: pageDescription,
    seoCanonical,
  } = props?.data?.page?.pageSettings;
  const { title } = props?.data?.page ?? { title: "" };

  return (
    <>
      <SEO
        seoCanonical={seoCanonical}
        title={title || pageTitle}
        description={pageDescription}
      />
      <Layout>
        <WordPressBlocksViewer blocks={editorBlocks} />
      </Layout>
    </>
  );
}

Component.query = gql`
  ${components.CreateBlockHeroBlocks.fragments.entry}
  ${components.CreateBlockTextBlocks.fragments.entry}
  ${components.CreateBlockTextCtaBlocks.fragments.entry}
  ${components.CreateBlockImageTextBlocks.fragments.entry}
  ${components.CreateBlockLogoStrip.fragments.entry}
  ${components.CreateBlockMapBlocks.fragments.entry}
  ${components.CreateBlockEventBlocks.fragments.entry}
  ${components.CreateBlockFullWidthBlocks.fragments.entry}
  ${components.CreateBlockFeaturedNewBlocks.fragments.entry}
  ${components.CreateBlockFormBlock.fragments.entry}
  ${components.CreateBlockBackgroundMediaBlocks.fragments.entry}
  
  
  query GetPageData(
    $asPreview: Boolean = false
  ) {
    page(id: "400", idType: DATABASE_ID, asPreview: $asPreview) {
      title
      pageSettings {
        description
        seoTitle
        seoCanonical 
      }
      editorBlocks {
        ...${components.CreateBlockHeroBlocks.fragments.key}
        ...${components.CreateBlockTextBlocks.fragments.key}
        ...${components.CreateBlockTextCtaBlocks.fragments.key}
        ...${components.CreateBlockImageTextBlocks.fragments.key}
        ...${components.CreateBlockLogoStrip.fragments.key}
        ...${components.CreateBlockMapBlocks.fragments.key}
        ...${components.CreateBlockEventBlocks.fragments.key}
        ...${components.CreateBlockFullWidthBlocks.fragments.key}
        ...${components.CreateBlockFeaturedNewBlocks.fragments.key}
        ...${components.CreateBlockFormBlock.fragments.key}
        ...${components.CreateBlockBackgroundMediaBlocks.fragments.key}
      }
    }
  }
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};
