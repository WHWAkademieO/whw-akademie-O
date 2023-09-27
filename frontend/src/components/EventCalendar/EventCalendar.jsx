import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import EventModal from "../EventModal/EventModal";
import { Dialog } from "@headlessui/react";
import { gql } from "@apollo/client";
import { generateJsonString } from "@/utils/helpers";
import "moment/locale/de";
import moment from "moment";
import { useSearchContext } from "@/context/searchContext";

const fakeEvent = [
  `PROBLEMLÖSUNGS-TECHNIKEN IN DER QS`,
  `PROBLEMLÖSUNGS-TECHNIKEN IN DER QS`,
  `PROBLEMLÖSUNGS-TECHNIKEN IN DER QS`,
  `PROBLEMLÖSUNGS-TECHNIKEN IN DER QS`,
  `PROBLEMLÖSUNGS-TECHNIKEN IN DER QS`,
];
const EventCalendar = ({ content, ...rest }) => {
  const [openKey, setOpenKey] = useState("");
  const modalRef = useRef();
  const [monthWithEvent, setMonthWithEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [swiper, setSwiper] = useState({});

  const { event, setEvent } = useSearchContext();

  let eventList = useMemo(
    () => generateJsonString(rest?.attributes?.events) || [],
    [rest?.attributes?.events]
  );

  // month ref
  const monthRef = useMemo(() => {
    return Array.from({ length: monthWithEvent.length }, () => useRef());
  }, [eventList]);

  useEffect(() => {
    console.log(eventList);
    let currentMonths = { ...monthWithEvent };
    eventList = eventList.filter(event => {
      let offsetCurrent = new Date().getTime();
      // console.log(event.acf.active_date);
      let offsetEvent = new Date(event.acf.active_date).getTime();

      return Math.abs(offsetEvent) - Math.abs(offsetCurrent) > 0;
    });

    eventList
      .sort(
        (a, b) => new Date(a?.acf?.active_date) - new Date(b?.acf?.active_date)
      )
      .forEach(event => {
        const date = moment(event?.acf?.active_date);
        date.locale("de");
        if (!currentMonths[date.format("MMMM")]) {
          currentMonths[date.format("MMMM")] = [event];
        } else {
          currentMonths[date.format("MMMM")] = [
            ...currentMonths[date.format("MMMM")],
            event,
          ];
        }
      });
    setMonthWithEvent(currentMonths);
  }, [eventList]);

  useEffect(() => {
    const eventMouse = document.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        setOpenKey("");
      }
    });
    return () => {
      document.removeEventListener("keyup", eventMouse);
      // document.removeEventListener("mouseup", eventClick);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const events = document.querySelectorAll(".event-item");
      if (!events) return;
      events.forEach(node => {
        const slug = node?.getAttribute("data-slug");
        if (event === slug) {
          setSelectedEvent({
            ...eventList.find(eventItem => eventItem.slug === event),
            placeholder: rest?.attributes?.placeholder,
          });
          node.scrollIntoView({ behavior: "smooth" });
          const swiperAttr = node.getAttribute("data-swiper");
          setTimeout(() => {
            setOpenKey(swiperAttr);
          }, 800);
        }
        return;
      });
    }, 300);
    setTimeout(() => {
      setEvent("");
    }, 500);
  }, [event, eventList]);

  const handleSelectEvent = useCallback(
    item => {
      setSelectedEvent({ ...item, placeholder: rest?.attributes?.placeholder });
      setOpenKey(item.id);
    },
    [selectedEvent, openKey, setSelectedEvent, setOpenKey]
  );

  return (
    <div className="events">
      <div className="bg-black flex flex-col items-center py-10">
        <>
          <EventModal
            eventItem={selectedEvent}
            openKey={openKey}
            setOpenKey={setOpenKey}
            ref={modalRef}
          />
        </>
        {/*  slide   */}

        {Object.keys(monthWithEvent).map((month, index) => {
          let key = `slide-${index}`;
          const nextEl = `#calendar-${index} .next-arrow`;
          const prevEl = `#calendar-${index} .prev-arrow`;
          return (
            <div
              ref={monthRef[index]}
              key={index}
              id={`calendar-${index}`}
              className="container mt-10 lg:mt-20"
            >
              <h2 className="text-center text-white">{month}</h2>
              <div
                className={`w-full mt-14 lg:mt-20 flex items-center mx-auto `}
              >
                <span className="prev-arrow !block lg:block cursor-pointer text-4xl -translate-x-5">
                  <AiFillCaretLeft className="fill-main_green " />
                </span>
                <Swiper
                  wrapperClass="lg:justify-center gap-[20px]"
                  modules={[Navigation, Autoplay]}
                  slidesPerView={1}
                  loop={false}
                  navigation={{
                    nextEl: nextEl,
                    prevEl: prevEl,
                  }}
                  // slidesPerGroup={4}
                  className="flex px-5 w-full"
                  breakpoints={{
                    640: {
                      slidesPerView: monthWithEvent[month]?.length
                        ? 2
                        : monthWithEvent[month]?.length,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: monthWithEvent[month]?.length
                        ? 4
                        : monthWithEvent[month]?.length,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {monthWithEvent[month]?.length > 0 &&
                    monthWithEvent[month]?.map((item, index) => {
                      const string = key + `-item-${index}`;
                      const full = item?.acf?.full_option === "full";
                      return (
                        <SwiperSlide
                          className="event-item relative cursor-pointer lg:!mr-0 py-5"
                          key={item.id}
                          id={item.id}
                          data-slug={item?.slug}
                          data-event={item?.id}
                          data-swiper={string}
                        >
                          <div
                            id={string}
                            // onClick={() => setOpenKey(string)}
                            onClick={() => handleSelectEvent(item)}
                            className={`flex  key-${key} cursor-pointer  bg-[#C8D30E] px-5 justify-center text-center text-black aspect-square py-8 flex-col gap-3 items-center hover:-translate-y-2 transition-all duration-200`}
                          >
                            <h4 className="text-xl font-bold">
                              {item?.title?.rendered}
                            </h4>
                            <div
                              className={`w-5 h-5 mt-5 rounded-full ${
                                !full ? "bg-main_green" : "bg-black"
                              }`}
                            ></div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
                <span className="next-arrow !block lg:block cursor-pointer text-4xl z-10 translate-x-5 ">
                  <AiFillCaretRight className="fill-main_green " />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 mb-5 gap-3 md:gap-5 items-center max-w-[300px] md:max-w-[400px] lg:max-w-[550px] mx-auto grid grid-cols-8 text-sm justify-center">
        <div className="col-span-3">
          <h5 className="text-sm md:text-base text-right  lg:text-lg">
            Freie Termine
          </h5>
        </div>
        <div className="flex justify-center items-center">
          <span className=" w-5 h-5 rounded-full bg-main_green 123"></span>
        </div>
        <div className=" flex justify-center items-center">
          <span className=" w-5 h-5 rounded-full bg-black"></span>
        </div>
        <div className="col-span-3">
          <h5 className="text-sm md:text-base lg:text-lg">
            Termine ausgebucht
          </h5>
        </div>
      </div>
    </div>
  );
};

EventCalendar.defaultProps = {
  content: [
    {
      month: "Januar",
      events: fakeEvent,
    },
    {
      month: "Februar",
      events: fakeEvent,
    },
    {
      month: "Marz",
      events: fakeEvent,
    },
    {
      month: "April",
      events: fakeEvent,
    },
    {
      month: "Januar",
      events: fakeEvent,
    },
  ],
};

EventCalendar.displayName = "CreateBlockEventBlocks";

EventCalendar.fragments = {
  key: "EventBlockFragment",
  entry: gql`
    fragment EventBlockFragment on CreateBlockEventBlocks {
      attributes {
        events
        placeholder
      }
    }
  `,
};

export default EventCalendar;
