"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type Props = {
  label: string;
  iconSrc: string;
  href?: string;
};
function LearnSidebarItemComponent({ label, iconSrc, href }: Props) {
  const path_name = usePathname();
  const active = path_name == href;
  return (
    <Link
      href="#"
      className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
        active ? "shadow-md" : "shadow-sm w-full p-3"
      }`}
      prefetch={false}
    >
      <Image src={iconSrc} width={40} height={40} alt={label} />
      {label}
    </Link>
  );
}

export default LearnSidebarItemComponent;
