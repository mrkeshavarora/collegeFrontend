import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUniversity } from "react-icons/fa";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import Input from '../../smallComponents/input/Input';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError('');
        setIsSubmitting(true);

        try {
            const user = await login(email, password);
            if (user && user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err || "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setIsSubmitting(true);

    //     try {
    //         const user = await login(email, password);
    //         if (user.role === 'admin') {
    //             navigate('/admin/dashboard');
    //         } else {
    //             navigate('/');
    //         }
    //     } catch (err) {
    //         setError(err || "Login failed. Please try again.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <div className='flex items-center justify-center min-h-[85vh] bg-gray-50 px-4'>
            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl ">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-lg mb-4">
                        <FaUniversity className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Admin Login</h3>
                    <p className="text-gray-500 text-sm mt-1">Verify your credentials to access the portal</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                            {/* placeHolder="admin@gmail.com" */}
                        <Input
                            type='email'
                            value={email}
                            placeHolder={"Email Address"}
                            onChange={(e) => setEmail(e.target.value)}
                            inputIcon={<IoMailOutline size={20} />}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
                        <Input
                            placeHolder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            inputIcon={<IoLockClosedOutline size={20} />}
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`w-full bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Authenticating...
                            </>
                        ) : 'Sign In as Admin'}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-xs">
                    Protected by DAV Security Standard
                </div>
            </div>
        </div>
    )
}

export default Login
