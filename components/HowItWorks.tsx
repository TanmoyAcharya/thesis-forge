"use client";

import { motion } from "framer-motion";
import { Settings, MessageSquare, FileText, Lightbulb } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Settings className="w-6 h-6" />,
    title: "Select Your Field",
    description:
      "Choose your engineering discipline and available tools (Simulink, SolidWorks, Python, etc.).",
  },
  {
    number: "02",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Describe Your Interests",
    description:
      "Tell us your research interests, sub-domain, and degree level (Bachelor's, Master's, or PhD).",
  },
  {
    number: "03",
    icon: <FileText className="w-6 h-6" />,
    title: "Upload Papers (Optional)",
    description:
      "Add recent papers as PDF context for more relevant and differentiated research ideas.",
  },
  {
    number: "04",
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Get 5 AI Ideas",
    description:
      "Receive 5 tailored research ideas with feasibility scores, novelty scores, methodology, and experiment design.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              ThesisForge
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From blank page to 5 research-ready ideas in under 60 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-700/50 to-transparent" />
              )}

              {/* Step number */}
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center text-purple-400 mx-auto mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
