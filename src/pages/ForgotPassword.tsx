import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiMail, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import type { ChangeEvent, FormEvent } from "react";

interface ApiResponse {
  success: boolean;
  message: string;
  debug?: {
    resetLink: string;
  };
}

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send reset email. Please try again."
        );
      }

      setSuccess(true);
      console.log("Reset link:", data.debug?.resetLink); // Only in development
    } catch (err) {
      let errorMessage = "Failed to send reset email. Please try again later.";
      
      if (err instanceof TypeError) {
        errorMessage = "Network error: Could not connect to the server";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-4xl md:text-6xl lg:text-8xl text-gray-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            (!bg)
          </div>
        ))}
      </div>

      {/* Left Image Section */}
      <div className="relative md:w-1/2 w-full h-64 md:h-screen z-10">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dbezoksfw/image/upload/v1750078153/expediav2-558218-fcbab0-936291_darj79.jpg"
            alt="Resort View"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 !bg-gradient-to-t from-black/60 to-black/30 flex items-end md:items-center justify-center p-6 md:p-12">
            <div className="text-center md:text-left">
              <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300 bg-black/30 backdrop-blur-sm rounded-full p-2"
                aria-label="Go back"
              >
                <FiArrowLeft className="text-2xl text-black" />
              </button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                <span className="text-blue-400">BOTHRA</span> Guest House
              </h1>
              <p className="text-gray-200 text-lg md:text-xl mt-2">
                Your perfect getaway destination
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-10">
        <div className="w-full max-w-md !bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
              <p className="text-gray-500">
                {success 
                  ? "Check your email for further instructions"
                  : "Enter your email to receive a reset link"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 !bg-red-50 text-red-600 rounded-lg flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full !bg-green-100 mb-4">
                  <FiCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Sent</h3>
                <p className="text-gray-500 mb-6">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>.
                  The link will expire in 1 hour.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full !bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700"
                >
                  Return to Login
                </button>

                {import.meta.env.DEV && (
                  <div className="mt-4 p-2 bg-blue-50 rounded text-xs break-all">
                    <p className="font-medium text-blue-800">DEV ONLY:</p>
                    <a 
                      href={location.origin + `/reset-password/mock-token`} 
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {location.origin}/reset-password/mock-token
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                      disabled={isSubmitting}
                      autoComplete="email"
                      aria-describedby="email-help"
                    />
                  </div>
                  <p id="email-help" className="text-sm text-gray-500">
                    Enter the email associated with your account
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                    isSubmitting || !email ? 'opacity-70 cursor-not-allowed from-blue-400 to-blue-500' : 'hover:from-blue-600 hover:to-blue-700'
                  }`}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg 
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                aria-label="Go to login page"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;