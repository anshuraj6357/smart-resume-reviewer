import { Loader, Mail, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForgotUserMutation } from "../../features/api/authapi.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotUser, { data, isLoading, error }] = useForgotUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotUser({ email });
    } catch (error) {
      console.log("Error in sending the mail", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={[
        "relative min-h-screen flex items-center justify-center px-4 text-slate-100",
        "bg-[linear-gradient(to_bottom,#4f46e5,#06b6d4_45%,#0f1631_85%,#000_100%)]",
      ].join(" ")}
    >
    
      <div
        className="pointer-events-none absolute inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <span className="relative">
            <FileText className="h-10 w-10 text-cyan-300 drop-shadow" />
            <Sparkles className="h-5 w-5 text-teal-300 absolute -right-2 -top-1" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Forgot Password?
        </h2>
        <p className="text-slate-300 text-center mb-6">
          Enter your email to reset your password
        </p>

        {/* Success Message */}
        {data?.success ? (
          <p className="mb-6 text-center text-green-400 font-medium">
            ✅ Email has been sent. Please check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>
              <div
                className={[
                  "relative group rounded-lg border bg-white/5",
                  error ? "border-red-500/70" : "border-white/15",
                  "focus-within:ring-2 focus-within:ring-cyan-400/60 focus-within:border-transparent transition",
                ].join(" ")}
              >
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-cyan-300 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="block w-full bg-transparent text-slate-100 placeholder:text-slate-300 pl-10 pr-3 py-3 outline-none"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-300">
                  Failed to send reset email.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-400 to-cyan-300 text-slate-900 font-medium rounded-lg shadow-md hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={20} />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        {/* Links */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-cyan-300 hover:underline underline-offset-4"
          >
            Back to Login
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
