// footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
}

export default function Footer({
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-600",
}: FooterProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer
      className={`${backgroundColor} ${textColor} py-4 w-full overflow-x-hidden`}
    >
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Flex Container */}
        <div className="flex flex-col md:flex-row md:justify-between md:gap-6 gap-6 items-center md:items-start text-center md:text-left w-full max-w-full overflow-x-hidden">
          {/* لوگو */}
          <div className="w-full sm:w-2/3 md:w-1/4 flex flex-col items-center sm:items-start">
            <Link
              href="/"
              className="flex items-center justify-center sm:justify-start space-x-1"
            >
              <img
                src="/Alborz.png"
                alt="Alborz"
                className="h-14 w-auto object-contain max-w-full"
              />
              <span className="text-cyan-600 text-xl font-semibold ml-2">
                Alborz
              </span>
            </Link>
            <p className="text-xs mt-2 sm:mt-1 leading-snug break-words text-center sm:text-left">
              مجتمع فنی مهندسی البرز خاطره خوش آموزش
            </p>
          </div>

          {/* GET HELP */}
          <div className="w-full sm:w-2/3 md:w-1/4">
            <h6
              className="font-bold text-sm mb-2 flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection("getHelp")}
            >
              GET HELP
              <span className="md:hidden text-lg">
                {openSections.getHelp ? "−" : "+"}
              </span>
            </h6>
            <ul
              className={`text-xs space-y-1 transition-all duration-300 ease-in-out ${
                openSections.getHelp ? "block" : "hidden"
              } md:block`}
            >
              <li className="break-words">
                <a href="#" className="hover:text-orange-600 break-all">
                  https://ins-alborz.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ins-alborz.com"
                  className="hover:text-orange-600"
                >
                  info@ins-alborz.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="w-full sm:w-2/3 md:w-1/4">
            <h6
              className="font-bold text-sm mb-2 flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection("contactUs")}
            >
              CONTACT US
              <span className="md:hidden text-lg">
                {openSections.contactUs ? "−" : "+"}
              </span>
            </h6>
            <div
              className={`text-xs leading-snug transition-all duration-300 ease-in-out ${
                openSections.contactUs ? "block" : "hidden"
              } md:block`}
            >
              <p className="break-words">
                Address: ولیعصر, خیابان اوحدی, ساختمان رهبری پلاک 13, طبقه دوم{" "}
                <br />
                Tel: 04133323879 <br />
                04133323821
              </p>

              <div className="flex justify-center sm:justify-start space-x-2 mt-2">
                {[FaFacebookF, FaTwitter, FaLinkedin, FaInstagram].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-orange-600 hover:text-orange-500"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* خط جداکننده */}
      <hr className="my-3 border-gray-300 w-full" />

      {/* کپی‌رایت */}
      <div className="text-center text-[10px] sm:text-xs text-gray-500 px-3 pb-1">
        &copy; 2025 LearnPress LMS | Powered by ThinPress
      </div>
    </footer>
  );
}
