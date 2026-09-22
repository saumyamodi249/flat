import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { siteDetailsData } from "../data";

function SiteDetails({ details }) {
  const navigate = useNavigate();
  const data = { ...siteDetailsData, ...details };

  return (
    <div className="w-full mt-6 sm:mt-8">
      <h3 className="text-4xl font-semibold tracking-wide text-[var(--theme-about-title-main)] mb-[30px]">
        {data.title || "Site Details"}
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-5 flex-1">
          {/* Email */}
          <div className="flex items-center gap-[10px]">
            <div className="w-10 h-10 rounded-lg bg-[var(--theme-route-about-button-bg)] flex items-center justify-center text-white shrink-0 shadow-sm">
              <HiOutlineMail className="w-6 h-6 text-white" />
            </div>
            <a
              href={`mailto:${data.email}`}
              className="text-xl font-normal text-[var(--theme-about-description)]/90 hover:text-[var(--theme-about-title-main)] transition-colors break-all sm:break-normal whitespace-nowrap"
            >
              {data.email}
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-[10px]">
            <div className="w-10 h-10 rounded-lg bg-[var(--theme-route-about-button-bg)] flex items-center justify-center text-white shrink-0 shadow-sm">
              <IoLocationOutline className="w-6 h-6 text-white" />
            </div>
            <p className="text-xl font-normal text-[var(--theme-about-description)]/90 leading-snug sm:whitespace-nowrap">
              {data.address}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="self-start shrink-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="py-[15px] px-[30px] rounded-xl bg-[var(--theme-route-about-button-bg)] hover:brightness-110 text-[var(--theme-route-about-button-title-selected-bg)] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
          >
            {data.buttonText || "TALK TO EXPERT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SiteDetails;
