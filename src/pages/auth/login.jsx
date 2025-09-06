import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/api/authapi";
// Optional: enable route transitions if AnimatePresence wraps routes
import { motion } from "framer-motion";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  const forgotPasswordPage = () => navigate("/forgotpassword");
  const goToSignup = () => navigate("/signup");

  useEffect(() => {
    if (isSuccess && data) navigate("/");
  }, [data, isSuccess, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={[
        "relative min-h-screen flex items-center justify-center px-4 text-slate-100",
        "bg-[linear-gradient(to_bottom,#4f46e5,#06b6d4_45%,#0f1631_85%,#000_100%)]"
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden="true" />

        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <span className="relative">
            <FileText className="h-10 w-10 text-cyan-300 drop-shadow" />
            <Sparkles className="h-5 w-5 text-teal-300 absolute -right-2 -top-1" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Welcome Back</h2>
        <p className="text-slate-300 text-center mb-6">Sign in to access your resume reviews</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
            <div className={[
              "relative group rounded-lg border bg-white/5",
              errors.email ? "border-red-500/70" : "border-white/15",
              "focus-within:ring-2 focus-within:ring-cyan-400/60 focus-within:border-transparent transition"
            ].join(" ")}>
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-cyan-300 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="email"
                inputMode="email"
                className="block w-full bg-transparent text-slate-100 placeholder:text-slate-300 pl-10 pr-3 py-3 outline-none"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <div className={[
              "relative group rounded-lg border bg-white/5",
              errors.password ? "border-red-500/70" : "border-white/15",
              "focus-within:ring-2 focus-within:ring-cyan-400/60 focus-within:border-transparent transition"
            ].join(" ")}>
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-cyan-300 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="block w-full bg-transparent text-slate-100 placeholder:text-slate-300 pl-10 pr-10 py-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-400 to-cyan-300 text-slate-900 font-medium rounded-lg shadow-md hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center mt-4">
          <button onClick={forgotPasswordPage} className="text-sm text-cyan-300 hover:underline underline-offset-4">
            Forgot Password?
          </button>
          <button onClick={goToSignup} className="text-sm text-indigo-300 hover:underline underline-offset-4">
            Create Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}