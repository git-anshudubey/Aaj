import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-2 pl-1 text-sm font-medium text-slate-700'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-4 py-2.5 bg-white text-slate-900 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)