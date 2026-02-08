import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

/**
 * ErrorHero component for the 404 page.
 * features a large "404" graphic with an expressive character, 
 * the "Oops!" headline, a subtitle, and search integration bar.
 */
export default function ErrorHero() {
  return (
    <section className="bg-black text-white min-h-[700px] flex flex-col items-center justify-center px-4 py-20 text-center select-none">
      <div className="container max-w-[1200px] flex flex-col items-center">
        
        {/* Large 404 Graphic */}
        <div className="flex items-center justify-center gap-0 mb-12 sm:mb-16">
          <span className="text-[140px] sm:text-[220px] md:text-[320px] font-black leading-[0.8] tracking-tighter">
            4
          </span>
          
          <div className="relative w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[280px] md:h-[280px] mx-2 sm:mx-4">
            {/* The circular character face "0" */}
            <div className="absolute inset-0 bg-white rounded-full flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-4 sm:gap-6 md:gap-8 mb-2 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 bg-black rounded-full" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 bg-black rounded-full" />
              </div>
              {/* Mouth */}
              <div className="w-12 h-10 sm:w-20 sm:h-16 md:w-32 md:h-24 border-[4px] sm:border-[6px] md:border-[10px] border-black rounded-[40%] bg-white" />
            </div>
          </div>

          <span className="text-[140px] sm:text-[220px] md:text-[320px] font-black leading-[0.8] tracking-tighter">
            4
          </span>
        </div>

        {/* Content Section */}
        <div className="max-w-[800px] w-full flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-[48px] font-bold mb-6 tracking-tight">
            Oops!
          </h1>
          
          <p className="text-[#999999] text-base sm:text-lg md:text-[18px] mb-12 max-w-[600px] leading-relaxed font-normal">
            Well, this is awkward, the page you were trying to view does not exist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
            {/* Navigation Button */}
            <a 
              href="/" 
              className="text-white hover:text-[#1DA1F2] transition-colors duration-200 font-medium text-[15px] border-b border-transparent hover:border-[#1DA1F2] py-1"
            >
              Go Home
            </a>

            <span className="text-[#999999] font-medium text-[15px]">or</span>

            {/* Search Bar Integration */}
            <div className="relative w-full max-w-[360px]">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-black pointer-events-none">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search the knowledge base"
                className="w-full h-[56px] pl-[52px] pr-14 bg-white text-black rounded-full text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] transition-shadow placeholder:text-[#999999]"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none">
                <span className="text-[12px] text-[#999999] font-medium">⌘K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}