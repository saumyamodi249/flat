import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { GiCancel } from "react-icons/gi";

// ================= VALIDATION REGEX =================
// Name: letters, numbers and spaces allowed
const NAME_REGEX = /^[a-zA-Z0-9 ]+$/;

// Email: standard email shape
const EMAIL_SHAPE_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Clear specific field error on change
  const clearError = (field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  // Validation logic
  const validate = () => {
    const nextErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      nextErrors.name = "Your name is required";
    } else if (!NAME_REGEX.test(formData.name.trim())) {
      nextErrors.name = "Name can contain only letters and numbers";
    }

    // Email validation
    if (!formData.email.trim()) {
      nextErrors.email = "Email Id is required";
    } else if (!EMAIL_SHAPE_REGEX.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }, 4000);
  };

  return (
    <div className="relative flex flex-col justify-between h-screen w-full overflow-hidden bg-[var(--theme-bottom)]">
      {/* Blurred background image matching the design */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 transition-all duration-700"
      />
      {/* Soft atmospheric overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Top Bar: Left Logo */}
      <div className="absolute top-5 sm:top-7 left-5 sm:left-8 z-30 flex items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-8 sm:h-10 object-contain drop-shadow"
          />
        </div>
      </div>

      {/* Main Content Area: Centered Contact Modal */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-full max-w-xl rounded-2xl backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-white/10 transition-all bg-[var(--theme-box-bg)] transform scale-[0.85] origin-center">
          {/* Modal Header */}
          <div className="flex items-center justify-between w-full pb-3 sm:pb-4">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-[var(--theme-title)]">
              Contact Us
            </h1>
            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Close Contact Us"
              className="text-[var(--theme-title)] hover:opacity-75 transition-opacity cursor-pointer p-1"
            >
              <GiCancel className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full border border-[var(--theme-submit-border)]/10 flex items-center justify-center text-[var(--theme-submit)]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[var(--theme-title)]">
                Thank you for reaching out!
              </h2>
              <p className="text-xs text-[var(--theme-description)] opacity-80 max-w-xs">
                We have received your message and our team will get in touch
                with you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-3 sm:space-y-3.5 pt-2 sm:pt-3"
            >
              {/* Field 1: Your Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-md font-normal text-[var(--theme-description)] tracking-wide">
                  Your Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full rounded-[10px] border bg-transparent px-4 py-[13px] text-md text-[var(--theme-description)] placeholder:text-[var(--theme-description-data-fill)] outline-none focus:outline-none focus:ring-0 transition-colors ${
                    errors.name
                      ? "border-[#FF4D4F]"
                      : "border-[var(--theme-description-border)] focus:border-[var(--theme-description-border)]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-[#FF4D4F]">{errors.name}</p>
                )}
              </div>

              {/* Field 2: Email Id */}
              <div className="flex flex-col space-y-2">
                <label className="text-md font-normal text-[var(--theme-description)] tracking-wide">
                  Email Id*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email Id"
                  className={`w-full rounded-[10px] border bg-transparent px-4 py-[13px] text-md text-[var(--theme-description)] placeholder:text-[var(--theme-description-data-fill)] outline-none focus:outline-none focus:ring-0 transition-colors ${
                    errors.email
                      ? "border-[#FF4D4F]"
                      : "border-[var(--theme-description-border)] focus:border-[var(--theme-description-border)]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#FF4D4F]">{errors.email}</p>
                )}
              </div>

              {/* Field 3: Message */}
              <div className="flex flex-col space-y-2">
                <label className="text-md font-normal text-[var(--theme-description)] tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full rounded-[10px] border border-[var(--theme-description-border)] bg-transparent px-4 py-[13px] text-md text-[var(--theme-description)] placeholder:text-[var(--theme-description-data-fill)] outline-none focus:outline-none focus:ring-0 focus:border-[var(--theme-description-border)] resize-none overflow-y-auto scrollbar-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-[10px] border border-[var(--theme-submit-border)]/75 bg-transparent py-5 px-[190px] text-sm font-semibold uppercase tracking-widest text-[var(--theme-submit)] cursor-pointer shadow-sm"
                >
                  LET'S CONNECT
                </button>
              </div>

              {/* Terms and Privacy Policy notice */}
              <div className="px-2 pt-1 text-center text-xs font-normal  leading-relaxed text-[var(--theme-terms-conditions)]/50">
                By providing us with your information you are consenting to the
                collection and use of
                <br className="hidden sm:inline" /> information in accordance
                with our{" "}
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPolicy((prev) =>
                      prev === "terms" ? null : "terms",
                    );
                  }}
                  className={`theme-terms-policy-link underline font-medium cursor-pointer transition-all duration-200 ${
                    selectedPolicy === "terms" ? "selected" : ""
                  }`}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPolicy((prev) =>
                      prev === "privacy" ? null : "privacy",
                    );
                  }}
                  className={`theme-terms-policy-link underline font-medium cursor-pointer transition-all duration-200 ${
                    selectedPolicy === "privacy" ? "selected" : ""
                  }`}
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative w-full z-40">
        <BottomNav showCompass={false} />
      </div>
    </div>
  );
}

export default ContactPage;
