import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";
import FooterBackgroundGradient from "./footer-background-gradient";
import { TextHoverEffect } from "./text-hover-effect";

function HoverFooter() {
  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        {/* Main grid for the footer content */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Section 1: Pollen brand and description */}

          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-3xl font-extrabold">
                &hearts;
              </span>

              <span className="text-white text-3xl font-bold">Nur/ui</span>
            </div>

            <p className="text-sm leading-relaxed">
              Nur UI is a modern React and Next.js based UI component library.
            </p>
          </div>

          {/* Section 2: About Us links */}

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">About Us</h4>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  Company History
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  Meet the Team
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  Employee Handbook
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Helpful Links */}

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Helpful Links
            </h4>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  FAQs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#3ca2fa] transition-colors">
                  Support
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#3ca2fa] transition-colors relative"
                >
                  Live Chat
                  <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Us */}

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#3ca2fa]" />

                <a
                  href="mailto:hello@Pollen.com"
                  className="hover:text-[#3ca2fa] transition-colors"
                >
                  hello@nurui.com
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#3ca2fa]" />

                <a
                  href="tel:+918637373116"
                  className="hover:text-[#3ca2fa] transition-colors"
                >
                  +91 86373 73116
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#3ca2fa]" />

                <span className="hover:text-[#3ca2fa] transition-colors">
                  Sylhet, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator line */}

        <hr className="border-t border-gray-700 my-8" />

        {/* Bottom section: social media and copyright */}

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social Media Icons */}

          <div className="flex space-x-6 text-gray-400">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-[#3ca2fa] transition-colors relative"
            >
              <Facebook size={20} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-[#3ca2fa] transition-colors"
            >
              <Instagram size={20} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-[#3ca2fa] transition-colors"
            >
              <Twitter size={20} />
            </a>

            <a
              href="#"
              aria-label="Dribbble"
              className="hover:text-[#3ca2fa] transition-colors"
            >
              <Dribbble size={20} />
            </a>

            <a
              href="#"
              aria-label="Globe"
              className="hover:text-[#3ca2fa] transition-colors"
            >
              <Globe size={20} />
            </a>
          </div>

          {/* Copyright text */}

          <div className="text-center md:text-left">
            <p>&copy; 2025 Nurui. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="Nurui" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
