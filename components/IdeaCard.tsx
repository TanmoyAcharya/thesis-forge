"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Bookmark, Check } from "lucide-react";
import { ResearchIdea } from "@/types";

interface Props {
  idea: ResearchIdea;
  index: number;
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 7 ? "bg-green-500" : score >= 5 ? "bg-yellow-500" : "bg-red-500";
  const textColor =
    score >= 7 ? "text-green-400" : score >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className={`text-xs font-bold ${textColor} w-8 text-right`}>{score}/10</span>
    </div>
  );
}

export default function IdeaCard({ idea, index }: Props) {
  const [experimentOpen, setExperimentOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopyTitle = async () => {
    await navigator.clipboard.writeText(idea.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const saved_ideas: ResearchIdea[] = JSON.parse(
      localStorage.getItem("thesisforge_saved") ?? "[]"
    );
    const already = saved_ideas.some((i) => i.id === idea.id && i.title === idea.title);
    if (!already) {
      saved_ideas.push(idea);
      localStorage.setItem("thesisforge_saved", JSON.stringify(saved_ideas));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-800/40 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
          <h3 className="text-white font-bold text-base leading-snug">{idea.title}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyTitle}
            title="Copy title"
            className="text-gray-500 hover:text-purple-400 transition-colors p-1"
          >
            {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
          </button>
          <button
            onClick={handleSave}
            title="Save idea"
            className="text-gray-500 hover:text-yellow-400 transition-colors p-1"
          >
            {saved ? <Check size={15} className="text-green-400" /> : <Bookmark size={15} />}
          </button>
        </div>
      </div>

      {/* Problem statement */}
      <p className="text-gray-300 text-sm leading-relaxed mb-5">{idea.problemStatement}</p>

      {/* Scores */}
      <div className="space-y-2 mb-5">
        <ScoreBar score={idea.feasibilityScore} label="Feasibility" />
        <p className="text-xs text-gray-500 ml-[5.5rem]">{idea.feasibilityJustification}</p>
        <ScoreBar score={idea.noveltyScore} label="Novelty" />
        <p className="text-xs text-gray-500 ml-[5.5rem]">{idea.noveltyJustification}</p>
      </div>

      {/* Methodology */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Methodology
        </h4>
        <ol className="space-y-1">
          {idea.methodology.map((step, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-300">
              <span className="text-purple-400 font-bold flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Expected Outcomes */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Expected Outcomes
        </h4>
        <ul className="space-y-1">
          {idea.expectedOutcomes.map((outcome, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-300">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Experiment Design toggle */}
      {idea.experimentDesign && (
        <div className="mb-4">
          <button
            onClick={() => setExperimentOpen(!experimentOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            🧪 View Experiment Design
            {experimentOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <AnimatePresence>
            {experimentOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 bg-gray-800 rounded-xl p-4 text-xs text-gray-300 leading-relaxed">
                  {idea.experimentDesign}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Footer: tools + duration */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-800">
        {idea.suggestedTools.map((tool) => (
          <span
            key={tool}
            className="bg-purple-900/40 border border-purple-700/40 text-purple-300 text-xs px-2.5 py-1 rounded-full"
          >
            {tool}
          </span>
        ))}
        <span className="ml-auto text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full flex-shrink-0">
          ⏱ {idea.estimatedDuration}
        </span>
      </div>
    </div>
  );
}
