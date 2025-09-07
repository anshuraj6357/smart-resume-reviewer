import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, Loader2, EyeOff, Lock } from "lucide-react";
import { useForgotUserpasswordMutation } from "../../features/api/authapi";

export function ResetPassword() {
  const { resettoken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confermpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ForgotUserpassword, { data, isLoading, error }] =
    useForgotUserpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ForgotUserpassword({ password, confermpassword, resettoken });
    } catch (error) {
      console.log(error);
      toast.error("Try again later");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("Password reset successful");
      navigate("/login");
    }
    if (error) {
      console.log(error);
      toast.error("Password reset failed");
      navigate("/login");
    }
  }, [data, error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/50 p-8">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-blue-800 drop-shadow-md">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 pl-10 pr-10 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confermpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-300 pl-10 pr-10 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-2 font-semibold text-white shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] transform transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
