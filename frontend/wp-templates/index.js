import single from "./single";
import frontPage from "./front-page";
import page from "./page";
import archive from "./archive";
import PageDownload from "./page-download";
import News from "./page-aktuelles";
import singlePost from "./single-post";
import search from "./page-suche";
export default {
  // category,
  // tag,
  "front-page": frontPage,
  page,
  // single,
  archive: archive,
  "page-aktuelles": News,
  "page-suche": search,
  "single-post": singlePost,
  "page-downloads": PageDownload,
};
