"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "Field-Specific Ideas",
    description:
      "Tailored to your exact engineering discipline and available tools — Simulink, SolidWorks, Python, and more.",
  },
  {
    icon: "📊",
    title: "Feasibility Scoring",
    description:
      "Every idea rated 1–10 with justification so you know what's achievable for your degree level.",
  },
  {
    icon: "✨",
    title: "Novelty Estimation",
    description:
      "Understand how original each idea is compared to existing research in your sub-domain.",
  },
  {
    icon: "🔬",
    title: "Methodology Guide",
    description:
      "Step-by-step research methodology for each generated idea to get you started immediately.",
  },
  {
    icon: "📄",
    title: "Paper Context Upload",
    description:
      "Upload recent papers as PDF and the AI uses them as context for more relevant, differentiated ideas.",
  },
  {
    icon: "🧪",
    title: "Experiment Design",
    description:
      "Bonus: receive a full experiment design plan for each research idea, ready to share with your supervisor.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Perfect Thesis
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ThesisForge combines field expertise, AI reasoning, and academic best practices to deliver research-ready ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-800/50 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
