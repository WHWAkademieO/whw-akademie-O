// import { getAllData } from "@/functions/prevBuildUtilities";
import React, { createContext, useContext, useEffect, useState } from "react";
import getAllData from '../functions/prevBuildUtilities'
import { useRouter } from "next/router";
const SearchContext = createContext(null);


const SearchProvider =  ({ children })  => {
  const [data, setData] = useState([]);
  getAllData().then((res)=> {
    setData(res)
  })
  const [downloadId, setDownloadId] = useState("");
  const [newsId, setNewsId] = useState("");
  const [event, setEvent] = useState("");
  const router = useRouter();

  const navigateDownload = id => {
    setDownloadId(id);
    router.push("/download");
  };
  const navigateEvent = id => {
    console.log(id);
    setEvent(id);
    router.push("/eventkalender");
  };

  const navigateNews = id => {
    setNewsId(id);
    setTimeout(() => {
      router.push("/news");
    }, 100);
  };

  useEffect(() => {
    // if (downloadId) {
    //   setTimeout(() => {
    //     setDownloadId(null);
    //   }, 3000);
    // }
  }, [downloadId, data]);
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
