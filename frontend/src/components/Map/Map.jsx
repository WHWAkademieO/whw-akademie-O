import Image from "next/image";
import React from "react";
import { gql } from "@apollo/client";
const Map = props => {
  const {
    attributes: { mediaURL, title },
  } = props;
  return (
    <div className=" relative flex flex-col min-h-[550px] justify-start py-16 ">
      <Image
        src={mediaURL || "/map.png"}
        alt="map image"
        fill
        className="object-cover"
      />
      <h2 className="text-white z-10 text-center uppercase">{title}</h2>
    </div>
  );
};

Map.defaultProps = {
  attributes: {
    title: "Ihr weg zu uns",
    mediaURL: "/map.png",
  },
};
Map.displayName = "CreateBlockMapBlocks";

Map.fragments = {
  key: `mapBlockFragment`,
  entry: gql`
    fragment mapBlockFragment on CreateBlockMapBlocks {
      attributes {
        mediaURL
        title
      }
    }
  `,
};

export default Map;
