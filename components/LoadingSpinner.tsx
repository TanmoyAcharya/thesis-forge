"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center gap-6">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
      />

      {/* Text */}
      <div className="text-center">
        <p className="text-white font-semibold text-lg mb-1">
          Generating your research ideas with GPT-4o
        </p>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center max-w-xs">
        This usually takes 15–30 seconds. We&apos;re crafting tailored ideas just for you.
      </p>
    </div>
  );
}
