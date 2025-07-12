import { Link } from 'react-router-dom'
import AuthInput from '../root/AuthInput'
import { useForm } from 'react-hook-form'
import Axios from '@/utils/axioInstance';
import { useState } from 'react';
import OtpVerification from '../root/OtpVerification';
import useAuthStore from '@/store/authSlice';

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const loginUser = useAuthStore.getState().login;

    const handleRegister = async (data) => {
        try {
            const response = await Axios.post('/register', data);
            console.log('Registration successful, OTP sent:', response.data);
            if (!response.data || !response.data.token) {
                throw new Error('Registration failed, no token received');
            }
            // set user data to store
            loginUser({
                user: { fullName: data.fullName, email: data.email },
                token: response.data.token
            })
            // On successful registration, show OTP verification
            setRegistrationSuccess(true);
            setUserEmail(data.email);

        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error appropriately, e.g., show a notification or message
        }
    };

    if (registrationSuccess) {
        return <OtpVerification email={userEmail} />;
    }



    return (
        <div className="flex flex-col items-start justify-center gap-5 rounded-xl border-2 border-gray-900 bg-white/80 shadow-[4px_4px_0_0_rgba(55,65,81,1)] px-8 py-10 w-full max-w-sm max-h-auto">
            <h1 className="text-2xl font-bold mb-4 text-purple-600 ">Register Your Account</h1>

            <form
                className='w-full'
                onSubmit={handleSubmit(handleRegister)}>
                <AuthInput
                    label="Full name"
                    type="text"
                    className="mb-4"
                    {
                    ...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                            value: 3,
                            message: "Full name must be at least 3 characters"
                        }
                    })
                    }
                />
                <AuthInput
                    label="Email"
                    type="email"
                    className="mb-4"
                    {
                    ...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address"
                        }
                    })
                    }
                />
                <AuthInput
                    label="Password"
                    type="password"
                    className="mb-4"
                    required
                    {
                    ...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })
                    }
                />

                {/* Checkbox to register user as a host with tooltip */}
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="isHost" className="flex items-center cursor-pointer select-none">
                        <input
                            id="isHost"
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-purple-600 accent-purple-600 focus:ring-purple-500"
                            {...register("isHost")}
                        />
                        <span className="ml-2 text-gray-700">Register as a host</span>
                    </label>

                    {/* Info icon with hover tooltip */}
                    <div className="relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle text-gray-400" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.064.293.006.399.287.47l.45.082.082-.38-.29-.071c-.294-.07-.352-.176-.288-.469l.738-3.468c.064-.293-.006-.399-.287-.47L8.93 6.588zM8 4.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                        <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 transform rounded-lg bg-gray-800 px-3 py-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            As a host, you can list properties and manage bookings.
                            <div className="absolute left-1/2 top-full -translate-x-1/2 transform border-4 border-transparent border-t-gray-800"></div>
                        </div>
                    </div>
                </div>

                <button className='bg-purple-600 text-white py-2 px-4 rounded-md w-full'>Conform Register</button>
            </form>
            <div className='flex flex-col items-start justify-center gap-2 w-full'>
                {/* error */}
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className='text-sm text-gray-600'>
                <span className='font-bold'>Already have account </span>
                <Link to={"/login"} className="text-purple-600 hover:underline">Login</Link>
            </div>
        </div>
    )
}

export default Register