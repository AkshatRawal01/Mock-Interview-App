"use client"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-[#1a237e] bg-opacity-95 shadow-md sticky top-0 z-20">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">MockMate</span>
        </div>
        <div className="flex gap-8 text-lg font-medium">
          <button
            className="hover:text-blue-200 text-white transition focus:outline-none"
            onClick={() => setShowAbout(true)}
          >
            About
          </button>
          <Link href="/dashboard" className="hover:text-blue-200 text-white transition">Dashboard</Link>
        </div>
      </nav>
      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-blue-500 focus:outline-none"
              onClick={() => setShowAbout(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">About MockMate</h2>
            <ul className="space-y-3 text-lg">
              <li><span className="font-semibold text-blue-600">Practice:</span> Simulate real interview scenarios with AI-driven questions tailored to your goals.</li>
              <li><span className="font-semibold text-blue-600">Improve:</span> Sharpen your skills with instant, actionable feedback and progress tracking.</li>
              <li><span className="font-semibold text-blue-600">Get Feedback:</span> Receive detailed analysis on your answers, communication, and confidence.</li>
            </ul>
            <div className="mt-6 text-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => setShowAbout(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1a237e" />
            </linearGradient>
          </defs>
          <path d="M0,600 Q400,700 900,600 T1440,700 V800 H0 Z" fill="url(#waveGradient)" opacity="0.25" />
          <path d="M0,700 Q500,800 1200,700 T1440,800 V800 H0 Z" fill="#1a237e" opacity="0.18" />
        </svg>
      </div>
      {/* Hero Section with white card background */}
      <main className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-10 md:pt-20 relative z-10 min-h-[80vh]">
        <div className="w-full rounded-3xl bg-white bg-opacity-95 shadow-2xl flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-20 gap-8">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
              Ace <span className="text-blue-500">Your Interview</span>
            </h1>
            <div className="w-24 h-1 bg-blue-400 mb-6" />
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Practice real interview questions, get instant feedback, and boost your confidence with our advanced AI-driven platform. Simulate real scenarios, track your progress, and land your dream job!
            </p>
            <Link href="/dashboard">
              <button className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center gap-2 text-lg">
                Get Started <span className="text-xl">→</span>
              </button>
            </Link>
          </div>
          {/* Right: High-quality SVG illustration of a student giving an interview */}
          <div className="flex-1 flex justify-center items-center relative mt-12 md:mt-0">
            {/* unDraw Interview SVG (https://undraw.co/illustrations) */}
            <svg width="320" height="320" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="400" cy="700" rx="320" ry="40" fill="#e0e7ef" />
              <rect x="250" y="500" width="300" height="30" rx="10" fill="#3b82f6" />
              <rect x="320" y="400" width="160" height="100" rx="20" fill="#e0e7ef" />
              <rect x="370" y="420" width="60" height="40" rx="10" fill="#fff" />
              {/* Student */}
              <ellipse cx="400" cy="370" rx="40" ry="60" fill="#60a5fa" />
              <circle cx="400" cy="320" r="30" fill="#1e293b" />
              {/* Arms */}
              <rect x="355" y="440" width="15" height="60" rx="7" fill="#60a5fa" transform="rotate(-15 355 440)" />
              <rect x="430" y="440" width="15" height="60" rx="7" fill="#60a5fa" transform="rotate(15 430 440)" />
              {/* Chair */}
              <rect x="300" y="570" width="200" height="20" rx="10" fill="#1e293b" />
              {/* Interviewer (optional, simple avatar) */}
              <circle cx="600" cy="350" r="24" fill="#3b82f6" />
              <rect x="590" y="374" width="20" height="40" rx="8" fill="#3b82f6" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
