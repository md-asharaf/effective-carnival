import React from 'react'
import AuthInput from '../root/AuthInput'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Axios from '@/utils/axioInstance';
import useAuthStore from '@/store/authSlice';

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        try {
            const response = await Axios.post('/login', data);
            console.log('Login successful:', response.data);
            useAuthStore.getState().login({
                user: response.data.user,
                token: response.data.token
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error);

        }
    };



    return (
        <div className="flex flex-col items-start justify-center gap-5 rounded-xl border-2 border-gray-900 bg-white/80 shadow-[4px_4px_0_0_rgba(55,65,81,1)] px-8 py-10 w-full max-w-sm max-h-[450px]">
            <h1 className="text-2xl font-bold mb-4 text-purple-600 ">Login Your Account</h1>

            <form
                onSubmit={handleSubmit(handleLogin)} className="w-full"
            >
                <AuthInput
                    label="Email"
                    type="email"
                    className="mb-4"
                    required
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

                <button className='bg-purple-600 py-2 text-white font-bold px-4 rounded-md w-full'>Login</button>
            </form>
            <div>
                {/* error */}
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className='text-sm text-gray-600'>
                <span className='font-bold'> Don't have an account? </span>
                <Link to={"/register"} className="text-purple-600 hover:underline">Register</Link>
            </div>
        </div>
    )
}

export default Login