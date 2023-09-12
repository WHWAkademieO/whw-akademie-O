import React, { useMemo } from "react";
import parse from "html-react-parser";
import { gql } from "@apollo/client";
import clsx from "clsx";

const TitleTextBlock = (props) => {
  const { title, content, dot, alignment } = props?.attributes;

  const aligmentClassName = useMemo(
    () => ({
      "Select alignment": "text-center",
      left: "text-start",
      center: "text-center",
      right: "text-end",
    }),
    []
  );

  return (
    <div className=" py-14 md:py-10 lg:py-18">
      <div
        className={clsx(
          "container mx-auto flex flex-col items-center gap-8 lg:gap-10",
          aligmentClassName[alignment || "center"]
        )}
      >
        {title && (
          <h2 className="text-black uppercase text-3xl lg:text-4xl max-w-[700px] font-semibold">
            {parse(title || "")}
          </h2>
        )}
        {dot && <div className="w-5 h-5 rounded-full bg-main_green "></div>}
        {content && (
          <div className="text-base max-w-[800px]">
            {parse(content || "")}
          </div>
        )}
      </div>
    </div>
  );
};

TitleTextBlock.defaultProps = {
  attributes: {
    title: "DIESER TEXT IST BLINDTEXT UND HAT GAR KEINE BEDEUTUNG",
    content: `<p>
      cae alibero et inis alitem evendit etusanda quas modite mi, odipsaestis exeratio quam quatquasitio molorere ipsae cum quia por sinciaerspit fugita dolut eum voluptaeris ut et doloreptiunt ad ut doluptatur as simus quiam, ipidem, uptaspere nonsenis et evellaut endit ipit lic tem enet odi
      sinciaerspit fugita dolut eum voluptaeris ut et do
      </p>`,
  },
};

TitleTextBlock.displayName = "CreateBlockTextBlocks";

TitleTextBlock.fragments = {
  key: "TextBlockFragment",
  entry: gql`
    fragment TextBlockFragment on CreateBlockTextBlocks {
      attributes {
        title
        dot
        content
        alignment
      }
    }
  `,
};

export default TitleTextBlock;
