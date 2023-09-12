import React from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import dlv from "dlv";
import { generateJsonString } from "@/utils/helpers";
import parse from "html-react-parser";

const FullWidthImage = props => {
  const image = generateJsonString(dlv(props, "attributes.image"));
  const video = generateJsonString(dlv(props, "attributes.video"));
  const cta = generateJsonString(dlv(props, "attributes.cta"));
  const { title, description } = props?.attributes ?? { title: "" };
  return (
    <div className="relative">
      {image && (
        <Image
          width={1000}
          height={450}
          // fill
          alt="background"
          src={image?.url}
          className="absolute inset-0 w-full h-full z-0 object-cover"
        />
      )}
      <div className="container mx-auto flex py-20 flex-col gap-10 items-center">
        <h2
          style={{ textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="text-5xl uppercase lg:text-7xl font-bold max-w-[600px] text-center text-white drop-shadow-sm"
        >
          {parse(title || "")}
        </h2>
        {cta && (
          <Link
            href={cta?.href.url}
            className="bg-main_green max-w-[300px] md:max-w-none text-center cursor-pointer transition hover:bg-white hover:text-black uppercase z-[1] text-xl font-bold text-white py-2 px-3 shadow-large_shadow"
          >
            {cta?.label}
          </Link>
        )}
      </div>
    </div>
  );
};

FullWidthImage.displayName = "CreateBlockFullWidthImageBlocks";

FullWidthImage.fragments = {
  key: "FullWidthFragment",
  entry: gql`
    fragment FullWidthFragment on CreateBlockFullWidthImageBlocks {
      attributes {
        title
        description
        cta
        image
        video
      }
    }
  `,
};

export default FullWidthImage;
