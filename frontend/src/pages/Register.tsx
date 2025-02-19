import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import video from '../assets/login_vid.mp4';
import useAuthController from '../controllers/authController';
import Loading from '../components/Loading';

const Register: React.FC = () => {
    const [creds, setCreds] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', password: '', password_confirmation: '' });

    const { register, loading, error } = useAuthController();

    const validateName = (name: string) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            return 'Name can only contain alphabets and spaces';
        } else if (name.length < 4) {
            return 'Name must be at least 4 characters long';
        } else {
            return '';
        }
    };

    const validatePassword = (pass: string) => {
        return pass.length >= 8 ? "" : "Password must be at least 8 characters.";
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "" : "Please enter a valid email.";
    };

    const validateConfirmPassword = (confirmPass: string) => {
        return confirmPass === creds.password ? '' : "The passwords don't match";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCreds((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nameErr = validateName(creds.name);
        const emailErr = validateEmail(creds.email);
        const passwordErr = validatePassword(creds.password);
        const confirmPassErr = validateConfirmPassword(creds.password_confirmation);

        setErrors({
            name: nameErr,
            email: emailErr,
            password: passwordErr,
            password_confirmation: confirmPassErr,
        });

        if (!nameErr && !emailErr && !passwordErr && !confirmPassErr) {
            register(creds.name, creds.email, creds.password, creds.password_confirmation);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-800 to-amber-950 flex">
            {loading && <Loading />}

            {/* Left side */}
            <div className="w-2/5 bg-jet flex flex-col justify-center p-12">
                <h2 className="text-3xl font-bold mb-8 mx-auto text-amber-500">Register to MAKTABA</h2>

                {error && <p className="text-red-500 text-sm mb-4 mx-auto text-center">{error}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-flash mb-1">
                            Name
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                placeholder="Enter your name"
                                value={creds.name}
                                onChange={handleChange}
                                onBlur={() => setErrors((prev) => ({ ...prev, name: validateName(creds.name) }))}
                            />
                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-flash mb-1">
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
                                value={creds.email}
                                onChange={handleChange}
                                onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(creds.email) }))}
                            />
                            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-flash mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={creds.password}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(creds.password) }))}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-flash mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="password_confirmation"
                                type={showPassword ? "text" : "password"}
                                required
                                value={creds.password_confirmation}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                placeholder="Confirm your password"
                                onChange={handleChange}
                                onBlur={() => setErrors((prev) =>
                                    ({ ...prev, password_confirmation: validateConfirmPassword(creds.password_confirmation) }))}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        Sign up
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-flash">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium cursor-pointer text-amber-600 hover:text-amber-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side*/}
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
        </div>
    );
};

export default Register;