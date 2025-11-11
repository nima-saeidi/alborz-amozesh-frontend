// src/components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
}

export default function Footer({
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-600",
}: FooterProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <footer className={`${backgroundColor} ${textColor} py-1`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* لوگو و توضیحات */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start space-x-1 text-black text-2xl font-semibold"
            >
              <img src="/Alborz.png" alt="Alborz" className="h-16 w-40" />
              {/* <span className="text-cyan-600">Alborz</span> */}
            </Link>
            <p className="text-sm mt-8 md:mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* بخش GET HELP */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h6
              className="font-bold text-sm mb-4 md:cursor-pointer"
              onClick={() => toggleSection("getHelp")}
            >
              GET HELP
            </h6>
            <ul
              className={`text-sm space-y-2 ${openSections.getHelp ? "block" : "hidden"} md:block`}
            >
              <li>
                <a href="#" className="hover:text-orange-600">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">Latest Articles</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">FAQ</a>
              </li>
            </ul>
          </div>

          {/* بخش CONTACT US */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h6
              className="font-bold text-sm mb-4 md:cursor-pointer"
              onClick={() => toggleSection("contactUs")}
            >
              CONTACT US
            </h6>
            <div
              className={`text-sm ${openSections.contactUs ? "block" : "hidden"} md:block`}
            >
              <p>
                Address: 2321 New Design St, Lorem Ipsum, Hudson 12345, USA <br />
                Tel: +1(123) 456 - 7890 <br />
                Email: support@thinpress.com
              </p>
              <div className="flex justify-center md:justify-start space-x-2 mt-4">
                <a href="#" className="text-gray-700 hover:text-orange-600"><FaFacebookF /></a>
                <a href="#" className="text-gray-700 hover:text-orange-600"><FaTwitter /></a>
                <a href="#" className="text-gray-700 hover:text-orange-600"><FaLinkedin /></a>
                <a href="#" className="text-gray-700 hover:text-orange-600"><FaInstagram /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-center text-sm text-gray-500 py-4">
        &copy; 2024 LearnPress LMS | Powered by ThinPress
      </div>
    </footer>
  );
}
