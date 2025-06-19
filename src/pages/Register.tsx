import { useState } from 'react';
import { FiArrowLeft, FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiGlobe, FiLock, FiCheck } from 'react-icons/fi';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  username: string;
  password: string;
};

type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  username?: string;
  password?: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    username: '',
    password: ''
  });

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[\d\s\+\-]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formData.country) {
      errors.country = 'Country is required';
      isValid = false;
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user types
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phone,
          country: formData.country,
          username: formData.username,
          password: formData.password
        }),
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        // Try to parse the error message from the response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Server responded with status ${response.status}: ${response.statusText}`
        );
      }

      // const data = await response.json();

      // Registration successful
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle different types of errors
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof TypeError) {
        // This is a network error (failed to fetch)
        errorMessage = 'Network error: Could not connect to the server. Please check your internet connection.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      case 5: return 'bg-green-600';
      default: return 'bg-gray-200';
    }
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Moderate';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return '';
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <FiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            Your account has been created successfully. You'll be redirected to login shortly.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row">
      {/* Left Section - Premium Branding Area */}
      <div className="md:w-1/2 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-10"></div>
        <img
          src="https://res.cloudinary.com/dbezoksfw/image/upload/v1750078153/expediav2-558218-fcbab0-936291_darj79.jpg"
          alt="Luxury Resort"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        
        <div className="absolute bottom-72 left-0 right-0 z-20">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                {/* <div className="h-8 w-8 bg-blue-500 rounded-full"></div> */}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-blue-300">BOTHRA</span> Guest House
                </h1>
                <p className="text-white/80 text-sm">Luxury redefined</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-20 !bg-white hover:!bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all shadow-lg"
        >
          <FiArrowLeft className="w-5 h-5 !text-black" />
        </button>

        <div className="absolute top-1/4 left-10 z-10 h-32 w-32 rounded-full bg-blue-400/20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 z-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-xl"></div>
      </div>

      {/* Right Section - Modern Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                BG
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
            <p className="text-center text-gray-500 mb-8">Join our exclusive community</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full pl-10 pr-4 py-3 border ${validationErrors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`w-full pl-10 pr-4 py-3 border ${validationErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.phone}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-gray-400" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.country ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white`}
                    >
                      <option value="">Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IN">India</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  {validationErrors.country && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.country}</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={`w-full pl-10 pr-4 py-3 border ${validationErrors.username ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  />
                </div>
                {validationErrors.username && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.username}</p>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password (6+ characters)"
                    className={`w-full pl-10 pr-12 py-3 border ${validationErrors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                )}
                
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength:</span>
                      <span className="text-xs font-medium">{getPasswordStrengthLabel()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-600 font-medium hover:underline">
                  Log In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;