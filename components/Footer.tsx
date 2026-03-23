import Link from "next/link";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  Fields: [
    { label: "Electrical", href: "#fields" },
    { label: "Mechanical", href: "#fields" },
    { label: "Metallurgy", href: "#fields" },
    { label: "Chemical", href: "#fields" },
    { label: "Computer Science", href: "#fields" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "mailto:hello@thesisforge.ai" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              ⚗️ ThesisForge
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI-powered research idea generator for engineering students worldwide.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 ThesisForge. Built with ❤️ for engineering students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
