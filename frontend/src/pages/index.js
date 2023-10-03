import { getWordPressProps, WordPressTemplate } from "@faustwp/core";

export default function Home(props) {
  return <WordPressTemplate {...props} />;
}
export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}