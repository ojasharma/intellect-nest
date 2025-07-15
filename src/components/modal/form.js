"use client";

import React, { useState, useEffect } from "react";
import { countries } from "./contries"; // Make sure this file exists

export default function TrialFormModal({ isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // --- START: ADDED FOR FORM HANDLING ---
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    kidsName: "",
    kidsAge: "",
    country: "",
    experience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you! We'll be in touch soon.");
      // Optional: Reset form and close modal after success
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- END: ADDED FOR FORM HANDLING ---

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      // Reset form status on close
      setSubmitStatus(null);
      setSubmitMessage("");
      setFormData({
        parentFirstName: "",
        parentLastName: "",
        email: "",
        phone: "",
        kidsName: "",
        kidsAge: "",
        country: "",
        experience: "",
      });
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 z-[500]">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeModal}
      ></div>

      <div
        className={`relative w-[80vw] h-[90vh] max-w-none overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 p-8 text-white transition-all duration-300 transform scrollbar-hide ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Book a free demo!</h2>
          <p className="text-md text-white/80 mt-2">
            Just fill out the form below and we will get back to you within 24
            hours!
          </p>
        </div>

        {/* The form now calls handleSubmit on submit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="parent-first-name"
              >
                Parent's First Name*
              </label>
              <input
                type="text"
                id="parent-first-name"
                name="parentFirstName"
                value={formData.parentFirstName}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="parent-last-name"
              >
                Parent's Last Name
              </label>
              <input
                type="text"
                id="parent-last-name"
                name="parentLastName"
                value={formData.parentLastName}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Phone number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="kids-name"
              >
                Kid's Name*
              </label>
              <input
                type="text"
                id="kids-name"
                name="kidsName"
                value={formData.kidsName}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                placeholder="Kid's Name"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="kids-age"
              >
                Kid's Age*
              </label>
              <select
                id="kids-age"
                name="kidsAge"
                value={formData.kidsAge}
                onChange={handleInputChange}
                className="liquid-glass-input w-full"
                required
              >
                <option value="" disabled>
                  Please choose one
                </option>
                <option value="5-8">5-8 years</option>
                <option value="9-12">9-12 years</option>
                <option value="13-15">13-15 years</option>
              </select>
              <p className="text-xs text-white/50 mt-1">
                We enroll 5–15 yr olds only.
              </p>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="country"
            >
              Country*
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="liquid-glass-input w-full"
              required
            >
              <option value="" disabled>
                Choose a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Kid's Prior Experience*
            </label>
            <div className="space-y-2">
              {[
                "New to Chess (Beginner)",
                "Taken Classes/Plays Well (Advanced Beginner)",
                "Played Tournaments (Intermediate)",
              ].map((exp) => (
                <label key={exp} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={formData.experience === exp}
                    onChange={handleInputChange}
                    className="liquid-glass-radio"
                    required
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className="bg-blue-600/80 text-white font-bold py-3 px-6 rounded-lg shadow-lg w-fit disabled:bg-gray-500/50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Submitting..."
                : submitStatus === "success"
                ? "Submitted!"
                : "SUBMIT"}
            </button>
            {/* Submission Status Message */}
            {submitMessage && (
              <p
                className={`mt-4 text-sm ${
                  submitStatus === "error" ? "text-red-400" : "text-green-400"
                }`}
              >
                {submitMessage}
              </p>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        /* ... your existing styles ... */
        .liquid-glass-input,
        select.liquid-glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .liquid-glass-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .liquid-glass-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .liquid-glass-radio {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .liquid-glass-radio:checked {
          border-color: rgba(59, 130, 246, 0.8);
          background: rgba(59, 130, 246, 0.2);
        }
        .liquid-glass-radio:checked::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
