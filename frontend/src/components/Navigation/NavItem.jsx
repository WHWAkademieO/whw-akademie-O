import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavItem = ({ href, current, children, className }) => {
  const otherCurrent = current + "/";
  const active = current === href || otherCurrent === href;
  return (
    <Link
      key={href}

      className={`uppercase hover:text-green-600 font-bold text-sm cursor-pointer ${

        active ? "text-green-600" : ""
      }  ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavItem;
