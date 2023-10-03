import { generateJsonString, youtubeParser } from "@/utils/helpers";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import YouTube from "react-youtube";

const BackgroundMedia = (props) => {
  const { url } = props.attributes ?? { url: "" };
  const opts = {
    height: "500",
    width: "900vw",
  };

  return (
    <div className="mt-20 max-h-[600px] flex justify-center">
      <YouTube
        iframeClassName="w-full lg:w-10/12 mx-auto lg:max-w-[700px] lg:h-[500px] h-[300px]"
        className="w-10/12 object-cover"
        videoId={youtubeParser(url)}
      />
    </div>
  );
};

BackgroundMedia.displayName = "CoreEmbed";

BackgroundMedia.fragments = {
  key: "BackgroundMediaFragment",
  entry: gql`
    fragment BackgroundMediaFragment on CoreEmbed {
      attributes {
        url
      }
    }
  `,
};

export default BackgroundMedia;
