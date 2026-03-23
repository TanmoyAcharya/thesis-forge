"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ThesisForge saved me 3 weeks of literature searching. My supervisor loved the novelty scores!",
    name: "Priya Sharma",
    university: "IIT Delhi",
    field: "Electrical Engineering",
    avatar: "PS",
  },
  {
    quote:
      "I was completely stuck on my Master's thesis topic. In 30 seconds I had 5 solid ideas for my SolidWorks project.",
    name: "Carlos Mendez",
    university: "TU Munich",
    field: "Mechanical Engineering",
    avatar: "CM",
  },
  {
    quote:
      "The experiment design feature is incredible. It gave me a full methodology for my Thermo-Calc metallurgy project.",
    name: "Amara Diallo",
    university: "University of Cape Town",
    field: "Metallurgy",
    avatar: "AD",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Engineering Students
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of students who found their perfect thesis topic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Student info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">
                    {t.university} · {t.field}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
