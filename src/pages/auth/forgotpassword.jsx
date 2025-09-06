import { Loader, Mail } from "lucide-react";

import { useState } from "react";
import { useForgotUserMutation } from "../../features/api/authapi.js";
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
 
  const [forgotUser, { data, isLoading, error }] = useForgotUserMutation();

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const DummyLogo = () => (
    <div className="mb-4 flex justify-center">
      <span className="text-3xl font-bold text-yellow-500">⚡</span>
    </div>
  )
  

  const handleSubmit = async (e) => {
    e.preventDefault()
  try {
    await forgotUser({email});
    
  } catch (error) {
    console.log("error in sending the mail",error)
  }   
}

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-3 w-full max-w-lg rounded-lg border border-green-200 p-6 sm:p-10">
        <DummyLogo />
        <h2 className="mb-12 text-center text-2xl font-semibold text-gray-800">
          Forgot Password?
        </h2>

        {data?.success ? (
          <p className="mb-6 text-center text-green-600">
            Email has been sent. Please check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 pl-10 text-gray-700 ${error ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              className="h-10 w-full bg-neutral-800 hover:bg-neutral-700"
              type="submit"
            >
              {isLoading ? <Loader className="animate-spin" color="#fff" /> : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
