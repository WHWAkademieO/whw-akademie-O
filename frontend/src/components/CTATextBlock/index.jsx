import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { gql } from "@apollo/client";
import { generateJsonString } from "@/utils/helpers";
import { clsx } from "clsx";
import { urlTransform } from "../../../function/utils";

const CtaTextBlock = ({ attributes }) => {
  const { title, content, dot, listCta } = attributes ?? {
    title: "",
    content: "",
    dot: false,
    listCta: "",
  };
  return (
    <div className=" py-16 md:py-20  lg:py-24 container mx-auto">
      <div className="container text-center mx-auto flex flex-col items-center gap-6">
        <h2 className="text-black text-4xl max-w-[700px] font-semibold uppercase">
          {parse(title || "")}
        </h2>
        <div className="w-5 h-5 rounded-full bg-main_green"></div>
        <div className="max-w-[800px]">{parse(content || "")}</div>
      </div>
      <div
        // style={{gridAutoFlow: "column"}}
        // style={{
        //   gridTemplateColumns:
        //     (generateJsonString(listCta) || [])?.length < 4
        //       ? `repeat(${
        //           (generateJsonString(listCta) || [])?.length
        //         }, minmax(0, 1fr))`
        //       : "repeat(4, minmax(0, 1fr))",
        // }}
        className={clsx(
          "grid justify-center gap-5 grid-cols-2 lg:gap-10 mt-20 break-words",
          (generateJsonString(listCta) || [])?.length < 4
            ? `lg:grid-cols-${(generateJsonString(listCta) || [])?.length}`
            : "lg:grid-cols-4"
        )}
      >
        {listCta &&
          (typeof listCta === "string" ? JSON.parse(listCta) : listCta)?.map(
            (item, index) => (
              <Link
                style={{
                  background: item?.background,
                  color: item?.textColor,
                }}
                className="py-20 px-2 text-center text-xl lg:text-4xl font-bold uppercase hover:-translate-y-2 transition-all duration-500"
                href={urlTransform(item?.href?.title) || "#"}
                key={index}
              >
                {item?.title}
              </Link>
            )
          )}
      </div>
    </div>
  );
};

CtaTextBlock.defaultProps = {
  attributes: {
    title: `<h2>Unsere Veranstaltungen</h2>`,
    content: `<p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>`,
    listCta: [
      {
        href: "https://saigon.digital/",
        title: "Fach-seminare",
        background: "#c6d202",
        textColor: "#0f0e05",
      },
      {
        href: "https://saigon.digital/",
        title: "Training",
        background: "#3caa37",
        textColor: "#0f0e05",
      },
      {
        href: "https://saigon.digital/",
        title: "Webinar",
        background: "#007139",
        textColor: "#f6f6f5",
      },
      {
        href: "https://saigon.digital/",
        title: "Themen-tage",
        background: "#000000",
        textColor: "#fff",
      },
    ],
  },
};

CtaTextBlock.displayName = "CreateBlockTextCtaBlocks";

CtaTextBlock.fragments = {
  key: "CtaTextBlockFragment",
  entry: gql`
    fragment CtaTextBlockFragment on CreateBlockTextCtaBlocks {
      attributes {
        title
        content
        dot
        listCta
      }
    }
  `,
};

export default CtaTextBlock;
