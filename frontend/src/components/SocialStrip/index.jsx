import { BsInstagram } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { gql } from "@apollo/client";
import Link from "next/link";
const SocialStrip = ({ backgroundColor, textColor, className, ...rest }) => {
  const {
    attributes: { facebookLink, instagramLink, title },
  } = rest;

  return (
    <div
      style={{
        color: textColor,
        background: backgroundColor,
      }}
      className={`p-5 flex gap-5 justify-center items-center ${className}`}
    >
      <h5 className="font-bold tracking-wider">{title}</h5>
      <div className="flex gap-2">
        {instagramLink && (
          <Link href={instagramLink || "#"}>
            <BsInstagram size={30} color={textColor} />
          </Link>
        )}
        {facebookLink && (
          <Link href={facebookLink || "#"}>
            <ImFacebook2 size={30} color={textColor} />
          </Link>
        )}
      </div>
    </div>
  );
};

SocialStrip.defaultProps = {
  backgroundColor: "#020202",
  textColor: "#c9d201",
  attributes: {
    title: "FOLGEN SIE UNS ÜBER",
    facebookLink: "https://www.facebook.com/",
    instagramLink: "#",
  },
};

SocialStrip.displayName = "CreateBlockLogoStrip";

SocialStrip.fragments = {
  key: `logoStripFragment`,
  entry: gql`
    fragment logoStripFragment on CreateBlockLogoStrip {
      __typename
      attributes {
        className
        title
        facebookLink
        instagramLink
      }
    }
  `,
};

export default SocialStrip;
