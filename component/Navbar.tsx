import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <Link href="/">
        <p className="text-2xl md:text-7xl font-bold text-center">My Blog</p>
      </Link>
    </div>
  );
}
