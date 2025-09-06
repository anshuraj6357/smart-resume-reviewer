import { FileText, Shield, CheckCircle, Linkedin, Twitter, Github } from "lucide-react";

export  function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Smart Resume Reviewer
              </h3> */}
            </div>
            <p className="text-gray-600 mb-5 max-w-md leading-relaxed">
              AI-powered resume analysis and optimization tool that helps job seekers 
              create compelling resumes designed to stand out in today’s competitive job market.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>End-to-end encrypted. Your data stays private.</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Features</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                AI-Powered Analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Job-Specific Feedback
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Keyword Optimization
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Secure & Private
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Smart Resume Reviewer. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="text-sm text-gray-500">Made with ❤️ for job seekers</span>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-gray-800 transition">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
