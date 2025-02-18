import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import video from '../assets/login_vid.mp4';
import useAuthController from '../controllers/authController';




const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const {login, loading, error} = useAuthController();

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordErr('Password must be at least 8 characters');
    } else {
      setPasswordErr('');
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailErr('Please enter a valid email address.');
    } else {
      setEmailErr('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setEmailErr('Please fill email field');
      setPasswordErr('Please fill password field');
      return;
    }

    console.log('Logging in...');
    

    login(email, password);
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 to-amber-950 flex">
      {/* Left side*/}
      <div className="w-3/5 flex items-center justify-center">
        <video
          className="h-full w-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Right side */}
      <div className="w-2/5 bg-white flex flex-col justify-center p-12">
        <h2 className="text-3xl font-bold mb-8 mx-auto text-amber-500">Log in to MAKTABA</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {emailErr && <p className="text-red-500 text-sm mt-1">{emailErr}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordErr && <p className="text-red-500 text-sm mt-1">{passwordErr}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
