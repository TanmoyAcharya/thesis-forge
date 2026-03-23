"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fields = [
  {
    icon: "⚡",
    title: "Electrical Engineering",
    tools: ["Simulink", "MATLAB", "PSIM", "LTspice"],
    gradient: "from-purple-600 to-blue-600",
    border: "border-purple-500/30",
  },
  {
    icon: "🔩",
    title: "Mechanical Engineering",
    tools: ["SolidWorks", "ANSYS", "AutoCAD", "Abaqus"],
    gradient: "from-blue-600 to-cyan-600",
    border: "border-blue-500/30",
  },
  {
    icon: "🔬",
    title: "Metallurgy & Materials",
    tools: ["Thermo-Calc", "CALPHAD", "JMatPro"],
    gradient: "from-orange-600 to-red-600",
    border: "border-orange-500/30",
  },
  {
    icon: "🧪",
    title: "Chemical Engineering",
    tools: ["Aspen Plus", "COMSOL", "HYSYS"],
    gradient: "from-green-600 to-teal-600",
    border: "border-green-500/30",
  },
  {
    icon: "💻",
    title: "Computer Science",
    tools: ["Python", "TensorFlow", "PyTorch", "ROS"],
    gradient: "from-violet-600 to-purple-600",
    border: "border-violet-500/30",
  },
];

export default function FieldCards() {
  return (
    <section id="fields" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Supported{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Engineering Disciplines
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Each field includes tool-aware prompts so every idea is immediately implementable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field, i) => (
            <motion.div
              key={field.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative bg-gradient-to-br ${field.gradient} rounded-2xl p-6 border ${field.border} overflow-hidden cursor-default`}
            >
              <div className="absolute inset-0 bg-gray-950/30" />
              <div className="relative z-10">
                <div className="text-4xl mb-3">{field.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{field.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {field.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 border border-gray-700 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4"
          >
            <div className="text-4xl">🚀</div>
            <h3 className="text-xl font-bold text-white">Ready to Generate?</h3>
            <p className="text-gray-400 text-sm">
              Pick your field and get 5 tailored ideas in seconds.
            </p>
            <Link
              href="/generate"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
            >
              Start Now →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
