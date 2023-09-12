import { useSearchContext } from "@/context/searchContext";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
const data = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    downloadSrc: "/logo.png",
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    downloadSrc: "",
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    downloadSrc: "",
  },
  {
    content: "Lorem ipsum dolor sit amet ",
    downloadSrc: "",
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    downloadSrc: "",
  },
];

const Download = ({ data }) => {
  const downLoadRef = Array.from({ length: data.length }, () => useRef(null));
  const { downloadId = null, setDownloadId } = useSearchContext();
  useEffect(() => {
    if (!downloadId) return;
    downLoadRef.forEach(download => {
      const attribute = download.current.getAttribute("data-download");
      if (attribute === downloadId) {
        download.current.scrollIntoView({ behavior: "smooth" });
        setDownloadId("");
      }
    });
  }, [downloadId]);

  return (
    <div className="bg-dark_green">
      <div className="container py-10 md:py-20 lg:px-10 gap-5 gap-y-7 flex flex-col bg-dark_green">
        {data.map((ele, index) => {
          const { content, downloadSrc, id } = ele;

          return (
            <div
              ref={downLoadRef[index]}
              data-download={id}
              key={index}
              className="flex items-center justify-between gap-5"
            >
              <div>
                <Image
                  width={40}
                  height={40}
                  src={"/pdf-icon.png"}
                  alt="pdf-file"
                  className="max-w-[30px]"
                ></Image>
                {/* <a
                  href={downloadSrc}
                  download={`${downloadSrc}`}
                  className="w-8 h-8 mt-5 mx-auto grid aspect-square sm:hidden text-xl flex-grow lg:mr-5 bg-white border border-black  place-items-center rounded-full"
                >
                  <BiSolidDownArrow />
                </a> */}
              </div>
              <p className="text-white break-all w-full text-left ml-4 font-bold  text-xl lg:text-2xl pr-0">
                {content}
              </p>
              <div
                // href={downloadSrc}
                // download={`${downloadSrc}`}
                onClick={() => window.open(downloadSrc)}
                className="w-8 h-8 max-w-[40px] sm:grid aspect-square flex items-center text-xl flex-grow lg:mr-5 bg-white border border-black  place-items-center rounded-full cursor-pointer"
              >
                <BiSolidDownArrow className="mx-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Download.defaultProps = {
  data: data,
};

export default Download;
