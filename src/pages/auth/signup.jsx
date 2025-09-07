import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  FileText,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/api/authapi";
// Optional animation support
import { motion } from "framer-motion";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerUser, { data, isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();



try {
      if (!formData.username) {
      setErrors((p) => ({ ...p, username: "Name is required" }));
      return;
    }
    if (!formData.email) {
      setErrors((p) => ({ ...p, email: "Email is required" }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }));
      return;
    }
    const result=await registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    console.log(result?.data?.message);
    toast.success(result?.data?.message)

    
} catch (error) {
       console.log(error)
}


  
  };

  useEffect(() => {
    if (data && isSuccess) navigate("/login");
  }, [isSuccess, data, navigate]);

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
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Create Account</h2>
        <p className="text-slate-300 text-center mb-6">Start optimizing your resume today</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-cyan-300/70 bg-white/5 text-slate-100 placeholder:text-slate-300"
                }`}
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-300">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="email"
                inputMode="email"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-cyan-300/70 bg-white/5 text-slate-100 placeholder:text-slate-300"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                autoComplete="new-password"
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-cyan-300/70 bg-white/5 text-slate-100 placeholder:text-slate-300"
                }`}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-cyan-300/70 bg-white/5 text-slate-100 placeholder:text-slate-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-white transition"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-400 to-cyan-300 text-slate-900 font-medium rounded-lg shadow-md hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Already have account */}
        <div className="text-center mt-4">
          <p className="text-sm text-slate-300">
            Already have an account{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-cyan-300 hover:underline underline-offset-4"
            >
              Sign in
            </button>
          </p>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-300">
            {error.data?.message || "Something went wrong"}
          </p>
        )}
      </div>
    </motion.div>
  );
}