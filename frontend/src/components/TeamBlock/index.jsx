// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { gql } from "@apollo/client";
import { generateJsonString } from "@/utils/helpers";

const TeamBlock = props => {
  const [loading, setLoading] = useState(true);

  const {
    attributes: { teams },
  } = props;

  const teamData = useMemo(() => generateJsonString(teams), [teams]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="py-10 lg:py-20 xl:py-24  container mx-auto">
      <div className="">
        <div className="text-center ">
          <h2>Das Team</h2>
        </div>

        <div className={`w-full mt-14 flex items-center mx-auto `}>
          <span className="team-prev-arrow cursor-pointer text-4xl -translate-x-5">
            <AiFillCaretLeft className="fill-main_green " />
          </span>
          {teams && (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: ".team-next-arrow",
                prevEl: ".team-prev-arrow",
              }}
              slidesPerGroup={1}
              className="flex px-5 w-full "
              loop
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                  slidesPerGroup: 4,
                },
              }}
            >
              {teamData &&
                teamData?.map((member, index) => {
                  const { avatar, name } = member;

                  return (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col gap-3 items-center">
                        {avatar && (
                          <Image
                            key={index}
                            src={avatar.url}
                            width={250}
                            height={250}
                            alt={avatar.alt}
                            className="rounded-full"
                          />
                        )}
                        {name && <h4 className="text-xl font-bold">{name}</h4>}
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          )}
          <span className="team-next-arrow cursor-pointer text-4xl translate-x-5 ">
            <AiFillCaretRight className="fill-main_green " />
          </span>
        </div>
      </div>
    </div>
  );
};

TeamBlock.displayName = "CreateBlockTeamCtaBlocks";

// TeamBlock.defaultProps = {
//   attributes: {
//     teams: [
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//       { src: "/mann.png", name: "Maximilian Muster" },
//     ],
//   },
// };

TeamBlock.fragments = {
  key: `teamBlockFragment`,
  entry: gql`
    fragment teamBlockFragment on CreateBlockTeamCtaBlocks {
      attributes {
        lock
        teams
        className
      }
    }
  `,
};

export default TeamBlock;
