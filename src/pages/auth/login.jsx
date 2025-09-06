import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useLoginUserMutation} from '../../features/api/authapi'

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginUser,{data,isLoading,isSuccess}] =useLoginUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    loginUser(formData);
  };

  const forgotPasswordPage = () => {
    navigate('/forgotpassword');
  };

  const goToSignup = () => {
    navigate('/signup');
  };





  useEffect(()=>{
if(isSuccess && data){
  console.log(data)
  navigate('/');
}

  },[data,isSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <FileText className="h-10 w-10 text-blue-600" />
          <Sparkles className="h-5 w-5 text-teal-500 -ml-3" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to access your resume reviews</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium rounded-lg shadow-md hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center mt-4">
          <button onClick={forgotPasswordPage} className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </button>
          <button onClick={goToSignup} className="text-sm text-teal-600 hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
