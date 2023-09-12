import { useSearchContext } from "@/context/searchContext";
import React from "react";
import Link from "next/link";
const SearchLink = ({ type, children, payload, className }) => {
  const { navigateDownload, navigateNews, navigateEvent } = useSearchContext();

  if (type === "Downloads")
    return (
      <button
        onClick={() => navigateDownload(payload?.file?.id)}
        data-download={payload?.file?.id}
        className={`text-lg text-left hover:text-main_green font-normal ${className}`}
      >
        {children}
      </button>
    );
  if (type === "News")
    return (
      <Link
        href={`/aktuelles/${payload.slug}`}
        data-download={payload?.id}
        className={`text-lg text-left hover:text-main_green font-normal ${className}`}
      >
        {children}
      </Link>
    );
  if (type === "Event") {
    return (
      <button
        data-event={payload?.slug}
        onClick={() => navigateEvent(payload?.slug)}
        className={`text-lg text-left hover:text-main_green font-normal ${className}`}
      >
        {children}
      </button>
    );
  }
  if (type === "Page")
    return (
      <Link
        href={payload?.uri || ""}
        className={`text-lg text-left hover:text-main_green font-normal ${className}`}
      >
        {children}
      </Link>
    );
};

export default SearchLink;
