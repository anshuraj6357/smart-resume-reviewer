import React, { useEffect } from "react";
import { FileText, Shield } from "lucide-react";
import { useLoadUserQuery, useLogoutUserMutation } from "../features/api/authapi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { userLoggedOut, userLoggedIn } from "../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((store) => store.auth);

  // Load user query with refetch
  const { data, isLoading, refetch } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated, // skip if not authenticated
  });

  const [logoutUser] = useLogoutUserMutation();

  // Refetch user data on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(userLoggedIn()); // mark as authenticated
      refetch(); // fetch user profile
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
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Smart Resume Reviewer
              </h1>
              <p className="text-sm text-gray-600">
                AI-Powered Resume Analysis &amp; Optimization
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            {isLoading ? (
              <span>Loading...</span>
            ) : data?.profile?.username && isAuthenticated ? (
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={logouteventhandler}
              >
                Logout
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Secure &amp; Private</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
