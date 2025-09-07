import React, { useEffect, useState } from "react";
import { FileText, Shield } from "lucide-react";
import { useLoadUserQuery, useLogoutUserMutation } from "../features/api/authapi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { userLoggedOut, userLoggedIn } from "../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);

  const { data, isLoading, refetch } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(userLoggedIn());
      refetch();
    }
  }, [dispatch, isAuthenticated, refetch]);

  const logouteventhandler = async () => {
    try {
      await logoutUser();
      dispatch(userLoggedOut());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className="relative z-50 bg-[linear-gradient(to_right,#4f46e5,#06b6d4_60%,#0f1631_100%)] text-slate-100 shadow-md"
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Smart Resume Reviewer
            </h1>
            <p className="text-sm text-slate-300">
              AI-Powered Resume Analysis & Optimization
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          {isLoading ? (
            <span className="text-slate-300">Loading...</span>
          ) : data?.profile?.username && isAuthenticated ? (
            <button
              onClick={logouteventhandler}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-400 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
            >
              Login
            </button>
          )}
          <Shield className="w-4 h-4 text-cyan-300" />
          <span className="font-medium text-slate-300">Secure & Private</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
