"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Platform", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
    { label: "Docs", hasDropdown: true },
    { label: "Enterprise", hasDropdown: false, href: "/enterprise" },
    { label: "Pricing", hasDropdown: false, href: "/pricing" },
  ];

  const products = [
    {
      title: "Fusion",
      description: "Generate production-ready web apps and UIs",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff5e3e75d42514b2b83294dca8f6221d3",
      href: "/fusion",
    },
    {
      title: "Publish",
      description: "Generate, iterate, and optimize pages and headless content",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fe6b30636e5784647a7f4c24c80ec31a5",
      href: "/publish",
    },
  ];

  const users = [
    {
      title: "Engineering teams",
      description: "Code faster with AI and your design system",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0a835884ae304f209fefac009be54b64",
      href: "/engineering-teams",
    },
    {
      title: "Design teams",
      description: "Design with code, handoff with confidence",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F7a2bf8e06a424f2d9a86a6d5e19f1844",
      href: "/design-teams",
    },
    {
      title: "Product teams",
      description: "Ship prototypes that accelerate progress",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F9087ad2883ab401cb5a843b119bd6bc6",
      href: "/product-teams",
    },
    {
      title: "Content teams",
      description: "Generate and publish without dependencies",
      icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fa1d8a923db5c4f99925ad1d58f29302a",
      href: "/content-teams",
    },
  ];

  const useCases = [
    { title: "Web apps", icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Faf4dc755927c4e20a2dd9266af71ed42", href: "/web-apps" },
    { title: "Prototypes", icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F37a6a8353dc64c45bfca586e452ebdba", href: "/prototypes" },
    { title: "Design to code", icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fa465024323f34ea698c3959390c4feca", href: "/m/design-to-code" },
    { title: "Landing pages", icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd9dbdb51f0e64ae4aba1696d7d2de922", href: "/landing-pages" },
    { title: "Headless CMS", icon: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F8bd7f0a776d24f1594f3b1ee895b6340", href: "/headless-cms" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Announcement Bar */}
      <div className="bg-[#1DA1F2] h-[40px] flex items-center justify-center text-black font-medium text-[13px] px-4 text-center cursor-pointer transition-colors hover:bg-[#2BB9FF]">
        <a href="#" className="flex items-center gap-2 group">
          Sign up: Designing Enterprise UI Directly on Production Code
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Main Nav */}
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-[#333333]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-[80px] flex items-center justify-between px-8">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F161de41f092049efbe21d4a438c23505?width=120"
              alt="Builder.io"
              className="h-[24px] w-auto"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 translate-x-12">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group py-8"
                onMouseEnter={() => item.hasDropdown && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-1.5 text-white text-[14px] font-medium hover:text-[#1DA1F2] transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Dropdown - Platform Specific (Mega Menu) */}
                {item.hasDropdown && item.label === "Platform" && (
                  <div
                    className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[900px] bg-[#111111] border border-[#333333] rounded-[8px] p-8 shadow-2xl transition-all duration-200 overflow-hidden ${
                      activeMenu === item.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-12">
                      {/* Column 1: Products */}
                      <div>
                        <span className="text-[12px] font-bold text-[#1DA1F2] tracking-wider uppercase block mb-6">
                          PRODUCTS
                        </span>
                        <div className="space-y-6">
                          {products.map((product) => (
                            <a
                              key={product.title}
                              href={product.href}
                              className="flex gap-4 group/item"
                            >
                              <div className="w-10 h-10 flex-shrink-0">
                                <img src={product.icon} alt={product.title} className="w-full h-full" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold text-[14px] group-hover/item:text-[#1DA1F2] transition-colors">
                                  {product.title}
                                </h4>
                                <p className="text-[#999999] text-[13px] leading-snug mt-1">
                                  {product.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Users */}
                      <div>
                        <span className="text-[12px] font-bold text-[#1DA1F2] tracking-wider uppercase block mb-6">
                          USERS
                        </span>
                        <div className="space-y-6">
                          {users.map((user) => (
                            <a
                              key={user.title}
                              href={user.href}
                              className="flex gap-4 group/item"
                            >
                              <div className="w-10 h-10 flex-shrink-0">
                                <img src={user.icon} alt={user.title} className="w-full h-full" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold text-[14px] group-hover/item:text-[#1DA1F2] transition-colors">
                                  {user.title}
                                </h4>
                                <p className="text-[#999999] text-[13px] leading-snug mt-1">
                                  {user.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Use Cases */}
                      <div>
                        <span className="text-[12px] font-bold text-[#1DA1F2] tracking-wider uppercase block mb-6">
                          USE CASES
                        </span>
                        <div className="space-y-4">
                          {useCases.map((useCase) => (
                            <a
                              key={useCase.title}
                              href={useCase.href}
                              className="flex items-center gap-3 group/item"
                            >
                              <div className="w-6 h-6 flex-shrink-0">
                                <img src={useCase.icon} alt={useCase.title} className="w-full h-full" />
                              </div>
                              <span className="text-white text-[14px] group-hover/item:text-[#1DA1F2] transition-colors">
                                {useCase.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="/contact-sales"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-[#333333] text-white text-[14px] font-semibold hover:border-white transition-colors"
            >
              Contact sales
            </a>
            <a
              href="/signup"
              className="px-5 py-2.5 rounded-full bg-[#1DA1F2] text-black text-[14px] font-bold hover:bg-[#2BB9FF] transition-colors"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;