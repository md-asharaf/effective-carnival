
import React, { useId } from 'react'


const AuthInput = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1 font-medium'
                htmlFor={id}
            >
                {label}
            </label>}
            <input
                type={type}
                className={`flex items-center gap-2  h-10 rounded-md border-2 border-gray-900 bg-white shadow-[4px_4px_0_0_rgba(55,65,81,1)] font-semibold text-gray-900 px-4 transition-all relative overflow-hidden hover:text-white hover:bg-gray-900 w-full  ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default AuthInput
