// wp-blocks/MyCoolBlock.js
import { gql } from "@apollo/client";

export default function Hero(props) {
  return <div>Hero</div>;
}

Hero.displayName = "Hero";
Hero.fragments = {
  key: "HeroFragment",
  entry: gql`
    fragment HeroFragment on CreateBlockHero {
      attributes {
        className
      }
    }
  `,
};
// This also works
// MyCoolBlock.config.name = 'MyCoolBlock'
