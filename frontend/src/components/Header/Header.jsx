import React from "react";
import DesktopNav from "../Navigation/DesktopNav";
import MobileNav from "../Navigation/MobileNav";
import { useQuery, gql } from "@apollo/client";
const Header = () => {
  const { data, loading } = useQuery(Header.query);
  const menuItems = (data?.menus?.edges || [])[0]?.node?.menuItems?.nodes;

  return (
    <div className="header ">
      <DesktopNav menuItems={menuItems} />
      <MobileNav menuItems={menuItems} />
    </div>
  );
};

Header.query = gql`
  query GetPageData {
    menus(where: { location: HEADER }) {
      edges {
        node {
          menuItems {
            nodes {
              label
              title
              uri
            }
          }
        }
      }
    }
  }
`;

export default Header;
