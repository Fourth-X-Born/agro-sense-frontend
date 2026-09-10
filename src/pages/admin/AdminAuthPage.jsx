import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import adminAuthService from "../../services/adminAuthService";
import { useAdminAuth } from "../../context/useAdminAuth";
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateRequired,
    validatePhone,
    runValidations,
} from "../../utils/validators";

export default function AdminAuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAdminAuth();
    const isLogin = location.pathname === "/admin/login";

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    // Login form state
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });

    // Register form state
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const switchToLogin = () => {
        setError("");
        setFieldErrors({});
        navigate("/admin/login");
    };

    const switchToRegister = () => {
        setError("");
        setFieldErrors({});
        navigate("/admin/register");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const { errors, isValid } = runValidations({
            email: validateEmail(loginForm.email),
            password: validateRequired(loginForm.password, "Password"),
        });
        setFieldErrors(errors);
        if (!isValid) return;

        try {
            setLoading(true);
            const response = await login(loginForm.email, loginForm.password);
            if (response.success) {
                navigate("/admin");
            } else {
                setError(response.message || "Login failed");
            }
        } catch (err) {
            console.error("Admin login error:", err);
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const { errors, isValid } = runValidations({
            name: validateRequired(registerForm.name, "Full name", 2),
            email: validateEmail(registerForm.email),
            phone: validatePhone(registerForm.phone, false),
            password: validatePassword(registerForm.password),
            confirmPassword: validateConfirmPassword(registerForm.password, registerForm.confirmPassword),
        });
        setFieldErrors(errors);
        if (!isValid) return;

        try {
            setLoading(true);
            const response = await adminAuthService.register({
                name: registerForm.name,
                email: registerForm.email,
                phone: registerForm.phone || null,
                password: registerForm.password,
                role: "ADMIN",
            });

            if (response.success) {
                // Auto-login after successful registration
                await adminAuthService.login(registerForm.email, registerForm.password);
                navigate("/admin");
            } else {
                setError(response.message || "Registration failed");
            }
        } catch (err) {
            console.error("Admin registration error:", err);
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                        <span className="text-white text-xl font-bold">
                            Agro<span className="text-primary">Sense</span> AI
                        </span>
                    </Link>
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-full">
                        <span className="material-symbols-outlined text-primary text-sm">admin_panel_settings</span>
                        <span className="text-gray-300 text-sm font-medium">Admin Portal</span>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Tabs */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={switchToLogin}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                                isLogin
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={switchToRegister}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                                !isLogin
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500 text-lg">error</span>
                            <span className="text-red-600 text-sm">{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        mail
                                    </span>
                                    <input
                                        type="email"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                        placeholder="admin@agrosense.com"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.email
                                                ? "border-red-400 focus:ring-red-200"
                                                : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">error</span>
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        lock
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        placeholder="Enter your password"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.password
                                                ? "border-red-400 focus:ring-red-200"
                                                : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">error</span>
                                        {fieldErrors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">login</span>
                                        Sign In to Admin Panel
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        /* Register Form */
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={registerForm.name}
                                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                </div>
                                {fieldErrors.name && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{fieldErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        mail
                                    </span>
                                    <input
                                        type="email"
                                        value={registerForm.email}
                                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{fieldErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        phone
                                    </span>
                                    <input
                                        type="tel"
                                        value={registerForm.phone}
                                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                                        placeholder="07XXXXXXXX or +94XXXXXXXXX"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.phone ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                </div>
                                {fieldErrors.phone && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{fieldErrors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        lock
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                        placeholder="Min. 8 chars, 1 uppercase, 1 number"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.password ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{fieldErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                                        lock
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={registerForm.confirmPassword}
                                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                                        placeholder="Confirm your password"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            fieldErrors.confirmPassword ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                                        }`}
                                    />
                                </div>
                                {fieldErrors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{fieldErrors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">person_add</span>
                                        Create Admin Account
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Footer Link */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Main Site
                        </Link>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-400 text-xs">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        Secure admin access • AgroSense
                    </div>
                </div>
            </div>
        </div>
    );
}
