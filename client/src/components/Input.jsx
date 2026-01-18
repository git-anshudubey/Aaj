import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-2 pl-1 text-sm font-medium text-slate-700'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`w-full px-4 py-2.5 bg-white text-slate-900 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-gray-400 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input