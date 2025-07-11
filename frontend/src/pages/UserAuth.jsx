import { useState } from 'react';
import UserLogin from '@/components/auth/UserLogin';
import UserRegister from '@/components/auth/UserRegister';
import loginImg from '../assets/login.jpg';

function UserAuth() {
    const [isLoginView, setIsLoginView] = useState(true);

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="relative w-full max-w-4xl min-h-[550px] bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center p-8 transition-all duration-700 ease-in-out ${isLoginView ? 'translate-x-0' : 'translate-x-full'}`}>
                    {isLoginView ? <UserLogin /> : <UserRegister />}
                </div>

                <div className={`absolute top-0 left-0 h-full w-1/2 p-12 text-white flex flex-col items-center justify-center text-center bg-cover bg-center transition-all duration-700 ease-in-out ${isLoginView ? 'translate-x-full' : 'translate-x-0'}`} style={{ backgroundImage: `url(${loginImg})` }}>
                    <div className="bg-black bg-opacity-40 p-8 rounded-xl">
                        <h1 className="text-3xl font-bold mb-4">
                            {isLoginView ? 'New Here?' : 'Welcome Back!'}
                        </h1>
                        <p className="mb-6">
                            {isLoginView ? 'Sign up and discover a great amount of new opportunities!' : 'To keep connected with us please login with your personal info.'}
                        </p>
                        <button
                            onClick={toggleView}
                            className="px-8 py-3 font-semibold border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
                        >
                            {isLoginView ? 'Create an account' : 'Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAuth;