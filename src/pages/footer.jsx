import { FileText, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer
      className={[
        "relative ",
        "bg-[linear-gradient(to_right,#4f46e5,#06b6d4_60%,#0f1631_100%)]",
      ].join(" ")}
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-5 space-x-3">
              <FileText className="h-8 w-8 text-cyan-300 drop-shadow" />
              <h3 className="text-xl font-bold text-white tracking-tight">
                Smart Resume Reviewer
              </h3>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              AI-powered resume analysis tool helping job seekers craft
              compelling resumes that stand out in today’s competitive job
              market.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Features</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="hover:text-cyan-300 transition">AI-Powered Analysis</li>
              <li className="hover:text-cyan-300 transition">Job-Specific Feedback</li>
              <li className="hover:text-cyan-300 transition">Keyword Optimization</li>
              <li className="hover:text-cyan-300 transition">Secure & Private</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Smart Resume Reviewer. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="text-sm text-slate-300">
              Made with ❤️ for job seekers
            </span>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/anshu-raj-6a4941294/"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-cyan-300 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-400 hover:text-cyan-300 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-slate-400 hover:text-cyan-300 transition"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
