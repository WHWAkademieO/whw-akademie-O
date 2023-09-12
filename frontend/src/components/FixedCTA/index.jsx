import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery, gql } from "@apollo/client";
import parse from "html-react-parser";

const FixedCta = ({ content, link, className, top, ...rest }) => {
  const [close, setClose] = useState(false);
  const ref = useRef();

  const { data, loading } = useQuery(FixedCta.query);

  return (
    !loading &&
    !close && (
      <div className="fixed z-[100] bottom-10 lg:right-20 right-10">
        <div
          ref={ref}
          style={{
            background: "linear-gradient(180deg, #32754A 0%, #CCD444 100%)",
            // top: top,
          }}
          className={`flex p-5 py-3 right-5 text-xl md:text-2xl aspect-[10/10] lg:text-2xl font-bold uppercase transition-all duration-150 animate-[fadeIn_0.5s_ease-in-out] shadow-2xl justify-center items-center my-auto text-center rounded-full bg-green-800 ${className} `}
        >
          <div className="relative">
            <div
              onClick={() => setClose(true)}
              className="absolute cursor-pointer hover:bg-black hover:text-white w-8 h-8 text-[28px] z-[100] rounded-full bg-white grid place-content-center lg:-top-16 lg:-right-6 -top-14 -right-2"
            >
              <AiOutlineCloseCircle />
            </div>
            <div className="global-cta-editor text-base md:text-lg">
              {parse(data?.siteSettings?.siteSettings?.globalCta)}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

FixedCta.defaultProps = {
  top: "500px",
  content: "immer aktuell bleiben mit unserem",
  className: "",
};
FixedCta.query = gql`
  query NewQuery {
    siteSettings {
      siteSettings {
        globalCta
      }
    }
  }
`;
export default FixedCta;
