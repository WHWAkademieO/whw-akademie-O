import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import clsx from "clsx";
import { gql } from "@apollo/client";
import { generateJsonString } from "@/utils/helpers";
import moment from "moment";
import ImageWithFallback from "../ImageFallback";

const ImageTextBlock = ({ id, isBackend = true, ...rest }) => {
  const smallImage = useRef();

  const { title, content, reverse, img, images, cta, date } = useMemo(() => {
    if (isBackend) return rest.attributes;
    return rest;
  }, [rest]);

  const [activeImage, setActiveImage] = useState("");

  const imgList = useMemo(() => {
    return isBackend ? generateJsonString(images) : [img] || [];
  }, [images, img]);

  const ctaItem = useMemo(
    () => (isBackend ? generateJsonString(cta) : cta || {}),
    [cta]
  );

  useEffect(() => {
    if (imgList.length > 0) {
      setActiveImage(imgList[0]?.url);
    }
  }, [imgList]);

  const handleHover = (src) => {
    setActiveImage(src);
  };

  return (
    <div data-news={id} className=" mx-auto w-full">
      <div
        className={`flex flex-col  w-full ${
          !reverse ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div
          className={clsx(
            "relative items-end w-full md:w-1/2 sm:min-h-[400px] min-h-[200px] lg:min-h-[650px]"
          )}
        >
          {(imgList || []).map((image, index) => {
            let src;
            if (image?.url) {
              src = image?.url;
            } else {
              src = image;
            }

            return image?.type === "video" ? (
              <video
                controls
                autoPlay
                loop
                className={clsx(
                  "w-full  h-full object-cover lg:object-cover  transition-all duration-1000 absolute",
                  activeImage === image?.url ? "opacity-100 " : "opacity-0 "
                )}
                key={index}
                src={src || ""}
              />
            ) : (
              <ImageWithFallback
                key={index}
                height={700}
                width={900}
                className={clsx(
                  "w-full  h-full object-cover lg:object-cover  transition-all duration-1000 absolute",
                  activeImage === image?.url ? "opacity-100 " : "opacity-0 "
                )}
                src={src}
                alt="content Image"
              />
            );
          })}
        </div>
        <div
          className={clsx(
            "md:w-1/2 relative",
            !reverse ? "text-left md:items-start " : "md:items-end text-right"
          )}
        >
          <div
            className={`${
              !ctaItem ? "pb-5" : "pb-0"
            } shadow-xl lg:pt-10 lg:px-10 pt-5 px-5 items-center border-none md:absolute static md:top-1/2 md:-translate-y-1/2
        ${
          !reverse
            ? " bg-gradient-green text-left  md:items-start right-0"
            : "bg-gradient-green-reverse md:items-end text-right left-0"
        }
         my-auto flex-col h-fit flex md:w-[calc(100%+8rem)] w-full justify-center`}
          >
            <div className={`flex flex-col pb-8 gap-4 justify-center`}>
              <div className="lg:text-[32px] lg:leading-10 text-lg font-bold uppercase">
                {date && <h4>{moment(date).format("DD | MM | YY")}</h4>}
                {parse(title || "")}
              </div>
              {content && <div className="mt-6">{parse(content || "")}</div>}
              {ctaItem?.label && (
                <Link
                  href={ctaItem.href?.url || ""}
                  className={`py-3 hover:bg-white transition hover:text-black ${
                    !reverse ? "md:ml-auto" : "md:mr-auto"
                  } bg-black inline-block text-center text-white px-2 w-fit`}
                >
                  {ctaItem.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {imgList?.length > 1 && (
        <div
          className={`flex flex-col mt-5 ${
            !reverse ? "md:flex-row " : "md:flex-row-reverse "
          }`}
        >
          <div
            className={`flex md:w-1/2 w-full gap-5 justify-center ${
              !reverse ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {imgList.map((item, index) => {
              return (
                <div className="w-4/12" key={index}>
                  {item.type === "video" ? (
                    <video
                      controls
                      // loop
                      onMouseEnter={() => handleHover(item?.url)}
                      src={item?.url}
                      width={"100%"}
                      height={"100%"}
                      className="w-full h-[100px] lg:h-[200px] object-cover hover:-translate-y-2 transition-all duration-200"
                    ></video>
                  ) : (
                    <ImageWithFallback
                      onMouseEnter={() => handleHover(item?.url)}
                      ref={smallImage}
                      src={item?.url}
                      alt={item?.alt || `sub-image-${index}`}
                      width={150}
                      height={150}
                      className="w-full h-[100px] lg:h-[200px] object-cover hover:-translate-y-2 transition-all duration-200"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

ImageTextBlock.defaultProps = {
  title: `
  <h4>DIESER TEXT IST EINE
    PLATZHALTER-HEADLINE FÜR
    DIE AKTUELLSTE NEWS</h4>`,
  attributes: {
    title: `<h4>DIESER TEXT IST EINE
    PLATZHALTER-HEADLINE FÜR
    DIE AKTUELLSTE NEWS</h4>`,
    img: "/news/banner-news.png",
    desc: "<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p> ",
    ctaItem: {
      text: "mehr erfahen",
      href: "/",
    },
  },
};

ImageTextBlock.displayName = "CreateBlockImageTextBlocks";

ImageTextBlock.fragments = {
  key: "ImageTextBlockFragment",
  entry: gql`
    fragment ImageTextBlockFragment on CreateBlockImageTextBlocks {
      attributes {
        title
        content
        className
        reverse
        cta
        images
      }
    }
  `,
};

export default ImageTextBlock;
