"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out ThesisForge",
    features: [
      "3 idea generations/month",
      "Basic field support",
      "Standard output",
      "5 ideas per generation",
    ],
    cta: "Get Started Free",
    href: "/generate",
    highlight: false,
    badge: null,
  },
  {
    name: "Student Pro",
    price: "$9",
    period: "/month",
    description: "For serious students who need more",
    features: [
      "Unlimited generations",
      "All 5 engineering fields",
      "PDF paper upload",
      "Export to PDF/Word",
      "Experiment design",
      "Priority generation",
    ],
    cta: "Start Pro Trial",
    href: "/generate",
    highlight: true,
    badge: "⭐ MOST POPULAR",
  },
  {
    name: "University",
    price: "$299",
    period: "/month",
    description: "For institutions and departments",
    features: [
      "Everything in Pro",
      "Bulk student access",
      "LMS integration",
      "Analytics dashboard",
      "Priority support",
      "Custom field prompts",
    ],
    cta: "Contact Us",
    href: "mailto:hello@thesisforge.ai",
    highlight: false,
    badge: null,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Student-Friendly
            </span>{" "}
            Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No hidden fees. Cancel anytime. Built for students, not corporations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gray-900 rounded-2xl p-8 flex flex-col ${
                tier.highlight
                  ? "border-2 border-purple-500 shadow-lg shadow-purple-500/10"
                  : "border border-gray-800"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-gray-400 mb-1">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`w-full text-center font-semibold py-3 rounded-xl transition-all duration-200 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
