import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import { IoCloseCircleOutline } from "react-icons/io5";

// ================= VALIDATION REGEX =================
const NAME_REGEX = /^[a-zA-Z0-9 ]+$/;
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

  const clearError = (field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Your name is required";
    } else if (!NAME_REGEX.test(formData.name.trim())) {
      nextErrors.name = "Name can contain only letters and numbers";
    }

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

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }, 4000);
  };

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-transparent select-none">

      {/* Top Bar: Left Logo (Desktop & Tablet only matching Image 1) */}
      <div className="hidden sm:flex absolute top-5 sm:top-7 left-5 sm:left-8 z-30 items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-10 sm:h-12 object-contain drop-shadow"
          />
        </div>
      </div>

      {/* Main Content Area: Modal centered on desktop/tablet (Image 1), anchored to bottom on mobile */}
      <main className="relative z-20 flex-1 flex flex-col justify-end sm:justify-center items-center px-0 sm:px-4 pb-[52px] sm:pb-0 w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-lg sm:max-w-xl rounded-t-[20px] rounded-b-none sm:rounded-2xl backdrop-blur-md px-5 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-7 shadow-2xl border-b-0 sm:border border-white/10 bg-[var(--theme-box-bg)] flex flex-col min-h-0">
          
          {/* --- MOBILE HEADER (< sm) --- */}
          <div className="flex sm:hidden items-center justify-between w-full shrink-0">
            <img
              src="/UI IMG/Riviera_logo.svg"
              alt="Riviera Select"
              className="h-8 object-contain"
            />
            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Close Contact Us"
              className="text-[var(--theme-cancel)] cursor-pointer p-0.5"
            >
              <IoCloseCircleOutline className="w-6 h-6" />
            </button>
          </div>
          <h2 className="block sm:hidden text-base font-semibold text-white my-4 tracking-wide">
            Contact Us
          </h2>

          {/* --- DESKTOP & TABLET HEADER (>= sm matching Image 1) --- */}
          <div className="hidden sm:flex items-center justify-between w-full shrink-0 mb-5">
            <h2 className="text-2xl sm:text-[26px] font-semibold text-white tracking-normal">
              Contact Us
            </h2>
            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Close Contact Us"
              className="text-[var(--theme-cancel)] cursor-pointer p-0.5"
            >
              <IoCloseCircleOutline className="w-7 h-7" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#C09973]/20 flex items-center justify-center text-[#C09973]">
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
              <h2 className="text-lg font-semibold text-white">
                Thank you for reaching out!
              </h2>
              <p className="text-sm text-white/70 max-w-xs">
                We have received your message and our team will get in touch
                with you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col space-y-2.5 sm:space-y-3.5"
            >
              {/* Field 1: Your Name */}
              <div className="flex flex-col space-y-2 sm:space-y-1.5">
                <label className="text-base font-normal text-white">
                  Your Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full rounded-[8px] border bg-transparent py-[13px] px-4 lg:px-3.5 lg:py-2.5 text-base text-white placeholder:text-white/40 outline-none focus:outline-none transition-colors ${errors.name
                    ? "border-[#FF4D4F]"
                    : "border-white/20 focus:border-white/50"
                    }`}
                />
                {errors.name && (
                  <p className="text-xs text-[#FF4D4F]">{errors.name}</p>
                )}
              </div>

              {/* Field 2: Email Id */}
              <div className="flex flex-col space-y-2 sm:space-y-1.5">
                <label className="text-base font-normal text-white">
                  Email Id*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email Id"
                  className={`w-full rounded-[8px] border bg-transparent py-[13px] px-4 lg:px-3.5 lg:py-2.5 text-base text-white placeholder:text-white/40 outline-none focus:outline-none transition-colors ${errors.email
                    ? "border-[#FF4D4F]"
                    : "border-white/20 focus:border-white/50"
                    }`}
                />
                {errors.email && (
                  <p className="text-xs text-[#FF4D4F]">{errors.email}</p>
                )}
              </div>

              {/* Field 3: Message */}
              <div className="flex flex-col space-y-2 sm:space-y-1.5">
                <label className="text-base font-normal text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full rounded-[8px] border border-white/20 focus:border-white/50 bg-transparent py-[13px] px-4 lg:px-3.5 lg:py-2.5 text-base text-white placeholder:text-white/40 outline-none focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit Button (16px margin above) */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full rounded-[8px] border border-[#C09973]/80 bg-transparent py-2.5 sm:py-3 text-sm lg:text-base font-semibold uppercase tracking-widest text-[#C09973] hover:bg-[#C09973]/10 cursor-pointer shadow-sm transition-colors"
                >
                  LET'S CONNECT
                </button>
              </div>

              {/* Terms and Privacy Policy notice (desktop & tablet) */}
              <div className="hidden sm:block px-2 pt-3 text-center text-xs font-normal leading-relaxed text-white/50">
                By providing us with your information you are consenting to the
                collection and use of information in accordance with our{" "}
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPolicy((prev) =>
                      prev === "terms" ? null : "terms",
                    );
                  }}
                  className={`underline font-medium cursor-pointer transition-all duration-200 ${selectedPolicy === "terms" ? "text-white" : "hover:text-white"
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
                  className={`underline font-medium cursor-pointer transition-all duration-200 ${selectedPolicy === "privacy" ? "text-white" : "hover:text-white"
                    }`}
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40 shrink-0">
        <BottomNav />
      </footer>
    </div>
  );
}

export default ContactPage;
