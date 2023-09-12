import React, { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Link from "next/link";
import { BsFillTriangleFill } from "react-icons/bs";
import { useSearchContext } from "@/context/searchContext";
import SearchLink from "./SearchLink";
import moment from "moment";
const Search = ({ title, content }) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  // search context
  const { data } = useSearchContext();

  const finalData = data.filter((ele) => {
    const { __typename: type } = ele;
    if (type === "Event") {
      const {
        event: { active_date },
      } = ele;
      const dateSlice = active_date.split(" ")[0];
      return moment(new Date(dateSlice)).isSameOrAfter(new Date)
    }
    return ele;
  });

  const handleSearch = (e) => {
    // console.log(finalData);
    let final = finalData.filter((ele) => {
      const { title, __typename: type } = ele;
      let finalType;
      if (type === "Post") {
        finalType = "News";
      } else {
        finalType = type;
      }
      const trimValue = value.trim();
      let regex = new RegExp(trimValue, "ig");

      const matchTitle = title.search(regex) !== -1;
      // const matchType = finalType.search(regex) !== -1;
      return matchTitle;
    });
    setResult(final);
  };

  useEffect(() => {
    if (value === "" || value.length < 1) return setResult([]);
    handleSearch();
  }, [value]);
  return (
    <div className="container text-center items-center flex gap-5 lg:gap-8 pb-20 flex-col">
      <div className="flex w-3/5 lg:w-2/5 mt-5 relative items-center justify-center">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="search"
          aria-label="search"
          className="max-w-[700px] rounded-none w-full focus:outline-none  focus:border-main_green focus:ring-main_green  py-3  px-2 border-2 border-black "
        />
        <button onClick={handleSearch}>
          <BsSearch className="text-3xl absolute top-2 right-2" />
        </button>
      </div>
      <div className="flex flex-col w-full max-w-[750px]  items-center">
        {result.map((ele, index) => {
          const { __typename, title, uri } = ele;
          let type;
          let label;
          // if (__typename === "Post") {
          //   type = "News";
          // } else if (__typename === "Page_Download_download") {
          //   type = "Downloads";
          // } else {
          //   type = __typename;
          // }
          switch (__typename) {
            case "Post": {
              type = "News";
              label = "Artikel";
              break;
            }
            case "Page_Download_download": {
              type = "Downloads";
              label = "Downloads";
              break;
            }
            case "Event": {
              type = label = __typename;
              break;
            }
            case "Page": {
              type = __typename;
              label = "Seite";
              break;
            }
            default: {
              type = __typename;
              label = "Seite";
            }
          }

          return (
            <div
              key={index}
              className="flex justify-between border-b-[4px] border-main_green py-4 items-center w-full"
            >
              <div className="w-2/3 text-left">
                <SearchLink type={type} payload={ele}>
                  {title}
                </SearchLink>
              </div>
              <div className="">
                <SearchLink
                  payload={ele}
                  type={type}
                  className="flex text-main_green items-center gap-1 uppercase font-bold text-xl"
                >
                  <BsFillTriangleFill className="rotate-90" />
                  {label}
                </SearchLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Search.defaultProps = {
  title: "",
  content: ``,
};

export default Search;
