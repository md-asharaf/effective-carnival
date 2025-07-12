import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Axios from "@/utils/axioInstance";


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification({ email }) {

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await Axios.post('/verify-otp', {
                email,
                otp
            });
            if (!response.data.success) {
                throw new Error(response.data.message || 'OTP verification failed');
            }

            // Handle successful verification, e.g., redirect to login or dashboard
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-start justify-center gap-5 rounded-xl border-2 border-gray-900 bg-white/80 shadow-[4px_4px_0_0_rgba(55,65,81,1)] px-8 py-10 w-full max-w-sm">
            <div className="text-left">
                <h2 className="text-2xl font-bold">Verify your Account</h2>
                <p className="text-gray-600 mt-2">
                    Enter the 6-digit code sent to <span className="font-semibold">{email}</span>.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">

                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {
                    isLoading ? (
                        <button className='bg-purple-600 py-2 text-white font-bold px-4 rounded-md w-full mt-4' disabled>
                            Verifying...
                        </button>
                    ) : (
                        <button type="submit" className='bg-purple-600 py-2 text-white font-bold px-4 rounded-md w-full mt-4'>
                            Verify OTP
                        </button>
                    )
                }
            </form>
        </div>
    )
}

export default OtpVerification