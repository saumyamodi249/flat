import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";

function AboutSiteDetails({ details }) {
  const navigate = useNavigate();

  if (!details) return null;

  return (
    <div className="w-full mt-6 sm:mt-8 pt-2">
      <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide text-[var(--theme-about-title-main)] mb-4 sm:mb-5">
        Site Details
      </h3>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[var(--theme-route-about-button-bg)] flex items-center justify-center text-[var(--theme-route-about-button-title-default-bg)] shrink-0 shadow-sm">
              <HiOutlineEnvelope className="w-4 h-4 text-[var(--theme-route-about-button-title-default-bg)] stroke-[2]" />
            </div>
            <a
              href={`mailto:${details.email}`}
              className="text-sm sm:text-base text-[var(--theme-about-description)]/90 hover:text-[var(--theme-about-title-main)] transition-colors"
            >
              {details.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[var(--theme-route-about-button-bg)] flex items-center justify-center text-[var(--theme-route-about-button-title-default-bg)] shrink-0 shadow-sm">
              <HiOutlineMapPin className="w-4 h-4 text-[var(--theme-route-about-button-title-default-bg)] stroke-[2]" />
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-about-description)]/90 font-normal leading-snug">
              {details.address}
            </p>
          </div>
        </div>

        <div className="self-start md:self-end shrink-0 pt-2 md:pt-0">
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="px-6 sm:px-7 py-3 rounded-xl bg-[var(--theme-route-about-button-bg)] hover:brightness-110 text-[var(--theme-route-about-button-title-default-bg)] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
          >
            {details.buttonText || "TALK TO EXPERT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutSiteDetails;
