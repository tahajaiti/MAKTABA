import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthController from "../controllers/authController";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import video from "../assets/login_vid.mp4";
import Loading from "../components/Loading";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { handleLogin, loading, error } = useAuthController();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email.";
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 ? "" : "Password must be at least 8 characters.";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(credentials.email);
    const passwordErr = validatePassword(credentials.password);

    if (!emailErr && !passwordErr) {
      handleLogin(credentials.email, credentials.password);
    } else {
      setErrors({ email: emailErr, password: passwordErr });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 to-amber-950 flex">
      {loading && <Loading />}

      {/* Left Side */}
      <div className="w-3/5 flex items-center justify-center">
        <video className="h-full w-full object-cover" src={video} autoPlay muted loop playsInline />
      </div>

      {/* Right Side */}
      <div className="w-2/5 bg-jet flex flex-col justify-center p-12">
        <h2 className="text-3xl font-bold mb-8 mx-auto text-amber-500">Log in to MAKTABA</h2>

        {error && <p className="text-red-500 text-sm mb-4 mx-auto font-medium">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-flash mb-1">Email</label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange}
                onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(credentials.email) }))}
              />
              <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-flasb mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full py-2 px-4 cursor-pointer bg-amber-600 hover:bg-amber-700 text-white rounded-md">Sign in</button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-flash">
            Don't have an account?{' '}
            <Link to='/register' className="font-medium cursor-pointer text-amber-600 hover:text-amber-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
