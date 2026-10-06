import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { aboutData } from "../data";
import AboutTabs from "./AboutTabs";
import SiteDetails from "../components/SiteDetails";

function TheProject() {
  const data = aboutData.project;
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  const isFirstEnter = typeof window !== "undefined" && !window.__aboutEntranceDone;
  const animDelay = isFirstEnter ? 1.85 : 0.05;

  useEffect(() => {
    let timer;
    let interval;

    const delayMs = isFirstEnter ? 1850 : 80;

    // Start typing after page entrance finishes
    timer = setTimeout(() => {
      let currentIndex = 0;
      const textLength = data.description.length;

      interval = setInterval(() => {
        currentIndex += 1;
        setDisplayedDescription(data.description.slice(0, currentIndex));
        if (currentIndex >= textLength) {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 12);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [data.description, isFirstEnter]);

  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0">
      {/* Centered Tabs with zero extra bottom margin */}
      <div className="flex justify-center w-full max-w-full shrink-0">
        <AboutTabs />
      </div>

      {/* Inner Scrollable Container */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col">
        {/* 1st Main Div: Just Title - Pure static, NO Framer Motion */}
        <div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl mb-2.5 sm:mb-[30px] lg:mb-[30px] font-semibold tracking-normal text-[var(--theme-about-title-main)] uppercase">
            {data.title}
          </h2>
        </div>

        {/* 2nd Main Div: Row container for Image (left) and Text content (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-6 lg:gap-10 items-start w-full">
          {/* Inside 2nd Div -> 1st Child: Image container (entire box scales small to original, NO empty box before animation) */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 1, 0.5, 1],
              delay: animDelay,
            }}
            className="w-full h-44 sm:h-72 md:h-80 lg:h-96 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 bg-[var(--theme-bg-blur)]/20 shrink-0 will-change-transform transform-gpu"
          >
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Inside 2nd Div -> 2nd Child: Right Column with Title & Description */}
          <div className="flex flex-col space-y-[10px] sm:space-y-4">
            {/* 2nd Child -> 1st sub-div: Subtitle */}
            <div>
              <h3 className="text-base lg:text-3xl font-semibold text-[var(--theme-about-title)] tracking-wide">
                {data.subtitle}
              </h3>
            </div>

            {/* 2nd Child -> 2nd sub-div: Description typed in front of the user */}
            <div>
              <p className="text-base sm:text-base lg:text-lg text-[var(--theme-about-description)] font-light leading-relaxed whitespace-pre-line min-h-[140px]">
                {displayedDescription}
                {!isTypingDone && displayedDescription.length > 0 && (
                  <span className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle bg-[var(--theme-route-about-button-bg)] animate-pulse" />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Site Details on all viewports */}
        <div className="mt-2.5 sm:mt-6 lg:mt-[50px]">
          <SiteDetails details={data.siteDetails} />
        </div>
      </div>
    </div>
  );
}

export default TheProject;