import { gql } from "@apollo/client";
import React from "react";
import ImageTextBlock from "../ImageTextBlock/ImageTextBlock";
import ImageContents from "../ImageContents/ImageContents";
import { generateJsonString } from "@/utils/helpers";
import moment from "moment";

const FeatureNew = (props) => {
  const { featuredNew, lastestNews, ctaLabel } = props?.attributes ?? {
    featuredNew: {},
    lastestNews: [],
    ctaLabel: "mehr erfahren",
  };
  const featuredNewObject = generateJsonString(featuredNew);
  const listNews = generateJsonString(lastestNews)?.map((news) => ({
    date: moment(news?.date).format("DD | MM | YY"),
    image: news?.fimg_url,
    slug: `/aktuelles/${news?.slug}`,
  }));

  return (
    <div className="flex flex-col gap-[60px]">
      <ImageTextBlock
        cta={{
          href: { url: `/aktuelles/${featuredNewObject?.slug}` },
          label: ctaLabel || "mehr erfahren",
        }}
        isBackend={false}
        img={{ url: featuredNewObject?.fimg_url || "" }}
        // reverse={reverse}
        date={featuredNewObject.date}
        title={featuredNewObject?.title?.rendered}
        content={featuredNewObject?.content?.rendered}
      />
      {listNews && <ImageContents data={listNews} />}
    </div>
  );
};

FeatureNew.displayName = "CreateBlockFeaturedNewBlocks";

FeatureNew.fragments = {
  key: "FeatureNewFragment",
  entry: gql`
    fragment FeatureNewFragment on CreateBlockFeaturedNewBlocks {
      attributes {
        featuredNew
        lastestNews
        ctaLabel
      }
    }
  `,
};

export default FeatureNew;
