import { Link } from 'react-router-dom'
import AuthInput from '../root/AuthInput'
import { useForm } from 'react-hook-form'
function UserLogin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col items-start justify-center gap-5 rounded-xl border-2 border-gray-900 bg-white/80 shadow-[4px_4px_0_0_rgba(55,65,81,1)] px-8 py-10 w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-4 text-purple-600 ">Register Your Account</h1>

            <form

                onSubmit={handleSubmit(onSubmit)}>
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
                <button>submit</button>
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

export default UserLogin