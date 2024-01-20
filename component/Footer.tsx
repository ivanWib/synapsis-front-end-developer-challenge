import React from "react";
import Link from "next/link";
import Image from "next/image";
import instagram from "../asset/instagram.svg";
import linkind from "../asset/linkedin.svg";
import github from "../asset/github.svg";
import email from "../asset/email.svg";

export default function Footer() {
  return (
    <div>
      <p className="text-base md:text-2xl text-center">
        Made by Christian Ivan Wibowo
      </p>
      <div className="flex flex-row justify-between w-1/2 md:w-1/4 mx-auto mt-3 gap-3">
        <div className="w-10">
          <Link href="https://www.instagram.com/ivan_wib/">
            <Image src={instagram} alt="" />
          </Link>
        </div>

        <div className="w-10">
          <Link href="https://www.linkedin.com/in/christian-ivan-wibowo-94ba36184/">
            <Image src={linkind} alt="" />
          </Link>
        </div>

        <div className="w-10">
          <Link href="https://github.com/ivanWib">
            <Image src={github} alt="" />
          </Link>
        </div>

        <div className="w-10">
          <Link href="mailto:christ.ivan5758@gmail.com">
            <Image src={email} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
