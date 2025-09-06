import React, { useEffect } from "react";
import { FileText, Shield } from "lucide-react";
import { useLoadUserQuery, useLogoutUserMutation } from "../features/api/authapi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../features/authSlice"; // ensure this exists

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((store) => store.auth);

  // Only run query if authenticated
  const { data, isLoading } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [logoutUser, { isSuccess: logoutSuccess }] = useLogoutUserMutation();

  const logouteventhandler = async (e) => {
    e.preventDefault();
    try {
      await logoutUser(); // backend logout
      dispatch(userLoggedOut()); // clear redux
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

//   useEffect(() => {
//     if (logoutSuccess) {
//       // No need to refetch here — auth state + skip takes care of it
      
//     }
//   }, [logoutSuccess, navigate]);

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
            ) : data?.profile?.username ? (
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
