import { useState } from 'react';
import { Camera } from 'lucide-react';
import AbstractIllustration from '../components/ui/AbstractIllustration';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signInAsGuest } from '../api/auth';

const LoginPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isLoginMode) {
            const { error } = await signInWithEmail(email, password);
            if (error) setError(error);
        } else {
            const { error: signUpError } = await signUpWithEmail(email, password, displayName);
            if (signUpError) {
                setError(signUpError);
            } else {
                alert('Signup successful! Please log in.');
                setIsLoginMode(true);
            }
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setError('');
        const { error } = await signInWithGoogle();
        if (error) setError(error);
    };

    const handleGuestSignIn = async () => {
        setError('');
        const { error } = await signInAsGuest();
        if (error) setError(error);
    };

    return (
        <div className="flex flex-col h-screen bg-[#F8F7F4] font-['Inter',_sans-serif] text-[#2E2E2E] overflow-hidden">
            <div className="grid flex-grow grid-cols-1 lg:grid-cols-2">

                {/* Left Column - Form */}
                <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Camera size={28} className="text-[#5B5DB4]" />
                            <h3 className="text-lg font-bold">MomentsHub</h3>
                        </div>

                        <div className="mb-6">
                            <h1 className="text-3xl font-black text-[#5B5DB4] leading-tight sm:text-4xl lg:text-5xl">
                                {isLoginMode ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT'}
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLoginMode && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5B5DB4] transition-colors"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5B5DB4] transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5B5DB4] transition-colors"
                                    required
                                />
                            </div>

                            {error && <p className="text-xs text-center text-red-500">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-sm font-bold text-white bg-[#5B5DB4] rounded-lg hover:bg-[#4a4c9c] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B5DB4] disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
                            </button>
                        </form>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-xs font-semibold text-gray-500">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="space-y-3">
                            {/* Google Sign-In Button - Now matches input field borders */}
                            <button
                                onClick={handleGoogleSignIn}
                                className="relative w-full h-10 bg-white border-2 border-gray-200 rounded-lg px-3 overflow-hidden cursor-pointer transition-all duration-[218ms] hover:shadow-[0_1px_2px_0_rgba(60,64,67,.30),0_1px_3px_1px_rgba(60,64,67,.15)] focus:outline-none focus:border-[#5B5DB4] select-none"
                                style={{ fontFamily: 'Roboto, arial, sans-serif' }}
                            >
                                {/* Button State for hover effects */}
                                <div className="absolute inset-0 opacity-0 transition-opacity duration-[218ms] hover:opacity-[0.08] hover:bg-[#303030] active:opacity-[0.12] active:bg-[#303030]"></div>
                                
                                {/* Content Wrapper - Centers icon and text as a group */}
                                <div className="flex items-center justify-center h-full relative">
                                    {/* Google Icon */}
                                    <div className="w-5 h-5 mr-3 flex-shrink-0">
                                        <svg 
                                            version="1.1" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 48 48" 
                                            className="block w-full h-full"
                                        >
                                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                            <path fill="none" d="M0 0h48v48H0z"></path>
                                        </svg>
                                    </div>
                                    
                                    {/* Button Text - No flex-grow, stays grouped with icon */}
                                    <span className="text-[#1f1f1f] text-sm font-medium tracking-[0.25px] overflow-hidden text-ellipsis whitespace-nowrap">
                                        Sign in with Google
                                    </span>
                                </div>
                            </button>

                            <button
                                onClick={handleGuestSignIn}
                                className="w-full font-semibold text-gray-600 transition-colors hover:text-gray-800"
                            >
                                Continue as a Guest
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-600">
                                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    className="ml-1 font-semibold text-[#5B5DB4] underline hover:text-[#4a4c9c]"
                                >
                                    {isLoginMode ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                    </div>
                </div>

                {/* Right Column: Illustration Section */}
                <div className="relative hidden lg:block bg-[#C4B5FD] overflow-hidden">
                    <AbstractIllustration variant="login" />
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
