"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const announcements = [
  {
    text: "Sign up: Designing Enterprise UI Directly on Production Code",
    link: "https://www.builder.io/hub/webinars/livestream-designing-enterprise-ui",
  },
  {
    text: "What are best AI tools? Take the State of AI survey",
    link: "https://www.builder.io/blog/ai-tools-survey",
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="builder-block announcement-bar dark-mode-invert"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        flexShrink: 0,
        boxSizing: "border-box",
        backgroundColor: "#000000",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <a
        id="top-banner"
        href={announcements[currentIndex].link}
        className="builder-block"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40px",
          padding: "8px 16px",
          textDecoration: "none",
          transition: "background-color 0.2s ease-in-out",
        }}
      >
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div 
            className="bar-text"
            style={{
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: '"Inter", sans-serif',
              letterSpacing: "-0.01em",
              lineHeight: "1.4",
              overflow: "hidden",
            }}
          >
            <p className="m-0 p-0 transition-opacity duration-500">
              {announcements[currentIndex].text}
            </p>
          </div>
          
          <div 
            className="dark-mode-invert"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "12px",
              height: "12px",
            }}
          >
            <Image
              src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F298cf427a34f446ea00fd3985034c509?width=12"
              alt=""
              width={12}
              height={12}
              aria-hidden="true"
              style={{
                objectFit: "contain",
                filter: "invert(1)", /* Ensures the black arrow from the asset appears white on dark bg */
              }}
            />
          </div>
        </div>
      </a>

      {/* Internal Builder.io pixel tracker for analytics (preserving original structure) */}
      <img
        src="https://cdn.builder.io/api/v1/pixel?apiKey=YJIGb4i01jvw0SRdL5Bt"
        alt=""
        role="presentation"
        width="0"
        height="0"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        #top-banner:hover {
          background-color: #111111;
        }
        @media (max-width: 640px) {
          .bar-text {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}