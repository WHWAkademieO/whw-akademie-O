import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
const MobileNav = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const currentPath = useRouter().asPath;
  return (
    <div className="lg:hidden min-h-[100px] bg-black relative">
      <div className="container mx-auto py-10 flex justify-between px-5">
        <div
          onClick={() => setOpen(!open)}
          className="text-4xl cursor-pointer text-white"
        >
          <AiOutlineMenu />
        </div>
        <Link href="/">
          <Image width={150} height={80} alt="logo" src="/logo.png" />
        </Link>
        <div
          className={`overlay absolute p-5 transition duration-1000
          ${open ? " translate-x-0" : "-translate-x-full"}
          top-[100px] text-white flex flex-col gap-2 items-start z-20 left-0 w-full h-screen bg-black`}
        >
          {menuItems &&
            menuItems?.map((item, ele) => {
              return (
                <NavItem key={ele} current={currentPath} href={item.uri}>
                  {item.label}
                </NavItem>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
