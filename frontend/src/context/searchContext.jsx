// import { getAllData } from "@/functions/prevBuildUtilities";
import React, { createContext, useContext, useEffect, useState } from "react";
import getAllData from "../functions/prevBuildUtilities";
// import siteData from "../data/siteData.json";
import { useRouter } from "next/router";
const SearchContext = createContext(null);
import moment from "moment";
const SearchProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [downloadId, setDownloadId] = useState("");
  const [newsId, setNewsId] = useState("");
  const [event, setEvent] = useState("");
  const router = useRouter();

  const navigateDownload = (id) => {
    setDownloadId(id);
    router.push("/download");
  };
  const navigateEvent = (id) => {
    setEvent(id);
    router.push("/eventkalender");
  };

  const navigateNews = (id) => {
    setNewsId(id);
    setTimeout(() => {
      router.push("/news");
    }, 100);
  };

  useEffect(() => {
    getAllData().then((res) => {
      setData(res)
    });
  }, []);

  useEffect(() => {
    const finalData = data.filter((ele) => {
      try {
        const { __typename: type } = ele;
        if (type === "Event") {
          const {
            event: { activeDate },
          } = ele;
          const offsetEvent = moment(activeDate, "DD/MM/YYYY").valueOf();
          const offsetTime = moment().valueOf();
          return offsetEvent - offsetTime >= 0;
        }
        return ele;
      } catch (err) {
        console.log(err);
        return ele;
      }
    });
    setData(finalData);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        navigateDownload,
        navigateEvent,
        data,
        downloadId,
        setDownloadId,
        newsId,
        setNewsId,
        navigateNews,
        navigateEvent,
        event,
        setEvent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export default SearchProvider;
