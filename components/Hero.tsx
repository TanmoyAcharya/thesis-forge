"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pills = [
  { icon: "⚡", label: "Electrical" },
  { icon: "🔩", label: "Mechanical" },
  { icon: "🔬", label: "Metallurgy" },
  { icon: "🧪", label: "Chemical" },
  { icon: "💻", label: "Computer Science" },
];

const stats = [
  { value: "5,000+", label: "Ideas Generated" },
  { value: "12", label: "Engineering Fields" },
  { value: "4.9★", label: "Student Rating" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
      {/* Radial purple glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-950 to-gray-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-purple-700/60 bg-purple-900/20 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8"
        >
          🎓 AI-Powered Thesis Research
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Turn Your Research Ideas Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Breakthrough Theses
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          Struggling to find a thesis topic? ThesisForge uses GPT-4o to generate 5 novel, feasibility-scored research ideas tailored to your engineering field, tools, and interests.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/generate"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            🚀 Generate My Ideas
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200"
          >
            See How It Works ↓
          </a>
        </motion.div>

        {/* Field Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {pills.map((pill, i) => (
            <motion.span
              key={pill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300 flex items-center gap-2"
            >
              {pill.icon} {pill.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
