import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import NavItem from "../Navigation/NavItem";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { flatListToHierarchical } from "@/utils/helpers";
const Footer = () => {
  const currentPath = useRouter().asPath;
  const { data, loading } = useQuery(Footer.query);

  if (loading) return "...loading";
  // console.log(data);
  const nodes = (data?.menus?.edges[0] || []).node.menuItems.nodes;
  const menuList = flatListToHierarchical(nodes);
  const contact = menuList.filter(ele => ele.title === "Contact");
  const pages = menuList.filter(ele => ele.title === "Pages");
  const socials = menuList.filter(ele => ele.title === "Socials");

  return (
    <div className="footer bg-black">
      <div className="border-b-8 border-b-white ">
        <div className="container mx-auto py-20 pb-5 flex flex-col items-center">
          <Image src="/logo-black.png" width={300} height={200} alt="logo" />
          <div className="mt-20 text-center">
            {contact[0]?.children?.map((ele, index) => {
              if(index===0){
                return <p className="cursor-default text-slate-300">{ele?.title.split("|")[0]} {"|"} <a className="hover:text-main_green" href={ele.url} target="_blank">{ele?.title.split("|")[1]}</a></p>
              }
              else{
                return (
                  <Link
                    target="_blank"
                    className="text-slate-300 mx-auto hover:text-main_green w-full text-center"
                    href={ele.url}
                    key={index}
                  >
                    {ele.title}
                    <br />
                  </Link>
                )
              } ;
            })}
          </div>

          <hr className=" w-4/5 max-w-[800px] mt-8 border-t-2 border-white" />
          <div className="  mt-8 text-sm font-medium text-slate-300 flex flex-wrap gap-2 items-center justify-center">
            {pages[0]?.children?.map((ele, index) => {
              return (
                <NavItem key={index} current={currentPath} href={ele.uri}>
                  {ele.title}
                </NavItem>
              );
            })}
          </div>
          <div className="mt-10 flex gap-2 text-3xl text-white">
            <Link href={socials[0]?.children[0]?.url} target="_blank" className="hover:text-main_green">
              <BsInstagram />
            </Link>
            <Link href={socials[0]?.children[1]?.url} target="_blank" className="hover:text-main_green">
              <FaFacebookSquare />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center py-3 text-white uppercase text-base">
        WHW AKADEMIE O! {new Date().getFullYear()}
      </p>
    </div>
  );
};

Footer.query = gql`
  query NewQuery {
    menus(where: { location: FOOTER }) {
      edges {
        node {
          menuItems(first: 100) {
            nodes {
              url
              uri
              title: label
              key: id
              parentId
            }
          }
        }
      }
    }
  }
`;

export default Footer;
