"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeneratorForm from "@/components/GeneratorForm";
import IdeaCard from "@/components/IdeaCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GenerateResponse } from "@/types";

export default function GeneratePage() {
  const [results, setResults] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Generate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Research Ideas
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill in your details below and let GPT-4o craft 5 tailored thesis research ideas for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Form */}
          <div className="sticky top-24">
            <GeneratorForm
              onLoading={setLoading}
              onResults={setResults}
              onError={setError}
            />
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingSpinner />
                </motion.div>
              )}

              {error && !loading && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-red-300"
                >
                  <p className="font-semibold text-red-400 mb-1">❌ Error</p>
                  <p>{error}</p>
                </motion.div>
              )}

              {results && !loading && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                      🎓 Your Research Ideas
                    </h2>
                    <span className="text-xs text-gray-500">
                      {new Date(results.generatedAt).toLocaleString()}
                    </span>
                  </div>

                  {results.ideas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IdeaCard idea={idea} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {!loading && !error && !results && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-96 text-center"
                >
                  <div className="text-6xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Your ideas will appear here
                  </h3>
                  <p className="text-gray-600 max-w-xs">
                    Fill out the form and click &quot;Generate Ideas&quot; to get started.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
