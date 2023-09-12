import React, { useMemo } from "react";
import Image from "next/image";
import { gql } from "@apollo/client";
import parse from "html-react-parser";

const CreateBlockHeroBlocks = ({
  className,
  isBackend = true,
  overlay = true,
  ...rest
}) => {
  const { height, bg, mediaURL, title } = useMemo(() => {
    if (!isBackend) return rest;
    return rest?.attributes;
  }, [rest]);

  return (
    <div
      style={{ minHeight: height ? "calc(100vh - 120px)" : "50vh" }}
      className={`min-h-[calc(100vh-160px)] flex items-center lg:min-h-[calc(100vh-10px)] relative bg-black ${className}`}
    >
      {overlay && (
        <div className="absolute w-full h-full top-0 left-0 z-10 bg-slate-700 opacity-30"></div>
      )}
      {bg && (
        <Image
          height={500}
          width={700}
          loading="eager"
          src={bg}
          priority
          alt="hero image"
          className="absolute inset-0 w-full h-full z-0 object-cover lg:object-cover "
        />
      )}
      {!bg && mediaURL && (
        <Image
          width={1000}
          height={500}
          src={mediaURL}
          loading="eager"
          priority
          alt="hero image"
          className="absolute inset-0 w-full h-full z-0 object-cover lg:object-cover "
        />
      )}
      <div className="container mx-auto my-auto relative z-10  flex flex-col items-center justify-center gap-5 py-20">
        {title && (
          <h1
            style={{
              textShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
            className=" md:text-6xl z-50 uppercase lg:text-7xl max-w-[1100px] text-center font-bold text-white"
          >
            {parse(title || "")}
          </h1>
        )}
      </div>
    </div>
  );
};

CreateBlockHeroBlocks.displayName = "CreateBlockHeroBlocks";

CreateBlockHeroBlocks.defaultProps = {
  attributes: {
    height: true,
    mediaURL: "/hero-2.png",
    title: "HIER KOMMT DIE HEADLINE REIN",
  },
};

CreateBlockHeroBlocks.fragments = {
  key: `HeroBlocksFragment`,
  entry: gql`
    fragment HeroBlocksFragment on CreateBlockHeroBlocks {
      __typename
      attributes {
        className
        height
        mediaID
        mediaURL
        title
      }
    }
  `,
};

export default CreateBlockHeroBlocks;
