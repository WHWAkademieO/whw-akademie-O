import React from "react";
import Image from "next/image";
import Link from "next/link";
const ImageContents = ({ data }) => {
  return (
    <div className="container px-10 grid sm:flex grid-cols-2 justify-center py-10 lg:py-10 gap-3">
      {data.map((ele, index) => {
        const { image, date, slug } = ele;
        return (
          <Link href={slug || "/"} key={index} className="flex flex-col items-center gap-5 ">
            <Image
              width={150}
              height={150}
              src={image}
              alt="image content"
              className="aspect-square object-cover"
            />
            <h4 className="text-black lg:text-xl text-base font-bold">{date}</h4>
          </Link>
        );
      })}
    </div>
  );
};

ImageContents.defaultProps = {
  data: [
    {
      image: "/img3.png",
      date: "15 | 06 | 23",
    },
    {
      image: "/img4.png",
      date: "01 | 05 | 23",
    },
    {
      image: "/img5.png",
      date: "12 | 04 | 23",
    },
    {
      image: "/img6.png",
      date: "12 | 04 | 23",
    },
  ],
};

export default ImageContents;
