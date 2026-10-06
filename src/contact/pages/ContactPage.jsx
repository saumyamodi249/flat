import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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


      {/* Main Content Area: Flush bottom sheet on mobile (same to same img), centered on tablet/desktop */}
      <main
        onClick={(e) => {
          if (e.target === e.currentTarget) navigate("/home");
        }}
        className="relative z-20 flex-1 flex flex-col justify-end sm:justify-center items-center px-0 sm:px-6 pt-0 sm:pt-[96px] pb-[52px] sm:pb-[76px] w-full max-w-full min-h-0 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-full sm:max-w-[480px] md:max-w-[500px] rounded-b-none sm:rounded-2xl backdrop-blur-md px-5 sm:px-7 pt-5 sm:pt-6 pb-5 sm:pb-6 shadow-2xl border-t border-white/10 border-b-0 sm:border sm:border-white/10 bg-[var(--theme-box-bg)] flex flex-col min-h-0 max-h-full overflow-y-auto scrollbar-none sm:my-auto"
        >

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
              className="text-[var(--theme-cancel)] cursor-pointer p-0.5 hover:opacity-75 active:scale-90 transition-all"
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
              className="text-[var(--theme-cancel)] cursor-pointer p-0.5 hover:opacity-75 active:scale-90 transition-all"
            >
              <IoCloseCircleOutline className="w-7 h-7" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted-success"
                initial={{
                  clipPath: "circle(0% at 50% 50%)",
                  opacity: 0,
                }}
                animate={{
                  clipPath: "circle(150% at 50% 50%)",
                  opacity: 1,
                }}
                exit={{
                  clipPath: "circle(0% at 50% 50%)",
                  opacity: 0,
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                {/* Center Circle with Checkmark matching screenshot */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 240,
                    damping: 18,
                  }}
                  className="w-14 h-14 rounded-full border border-[#C09973]/30 bg-[#C09973]/10 flex items-center justify-center text-[#C09973] shadow-lg"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="text-xl font-semibold text-white tracking-normal"
                >
                  Thank you for reaching out!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.45 }}
                  className="text-sm text-white/70 max-w-sm leading-relaxed"
                >
                  We have received your message and our team will get in touch
                  with you shortly.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col space-y-2.5 sm:space-y-3.5"
              >
                {/* Field 1: Your Name */}
                <div className="flex flex-col space-y-1.5 sm:space-y-1">
                  <label htmlFor="contact-name" className="text-sm sm:text-base font-normal text-white">
                    Your Name*
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full rounded-[8px] border bg-transparent py-2.5 sm:py-2.5 px-3.5 text-sm sm:text-base text-white placeholder:text-white/40 outline-none focus:outline-none transition-colors ${errors.name
                      ? "border-[#FF4D4F]"
                      : "border-white/20 focus:border-white/50"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-[#FF4D4F]">{errors.name}</p>
                  )}
                </div>

                {/* Field 2: Email Id */}
                <div className="flex flex-col space-y-1.5 sm:space-y-1">
                  <label htmlFor="contact-email" className="text-sm sm:text-base font-normal text-white">
                    Email Id*
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email Id"
                    className={`w-full rounded-[8px] border bg-transparent py-2.5 sm:py-2.5 px-3.5 text-sm sm:text-base text-white placeholder:text-white/40 outline-none focus:outline-none transition-colors ${errors.email
                      ? "border-[#FF4D4F]"
                      : "border-white/20 focus:border-white/50"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#FF4D4F]">{errors.email}</p>
                  )}
                </div>

                {/* Field 3: Message */}
                <div className="flex flex-col space-y-1.5 sm:space-y-1">
                  <label htmlFor="contact-message" className="text-sm sm:text-base font-normal text-white">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="w-full rounded-[8px] border border-white/20 focus:border-white/50 bg-transparent py-2.5 sm:py-2.5 px-3.5 text-sm sm:text-base text-white placeholder:text-white/40 outline-none focus:outline-none resize-none transition-colors"
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
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>


    </div>
  );
}

export default ContactPage;
