import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import { useRouter } from "next/router";

const DesktopNav = ({ menuItems }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <nav className="hidden   lg:block bg-black pb-6 pt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-12">

          <div className="col-span-10 text-white  text-sm xl:text-base whitespace-nowrap  font-bold flex gap-2 items-center justify-center">

            {menuItems &&
              menuItems.map((item, index) => (
                <NavItem
                  href={item.uri}
                  current={currentPath}
                  key={index}
                  className={"mt-2"}
                >
                  {item.label}
                </NavItem>
              ))}
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Link href="/">
              <Image width={200} height={100} src={"/logo.png"} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
