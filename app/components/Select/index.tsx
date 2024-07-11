import React from 'react';

interface SelectProps {
    label: string;
    options: Array<{ value: string; key: string }>;
    value: string;
    setValue: (value: string) => void;
    error: {
        show: any;
        message: any;
    };
    width: string;
}

export default function Select({
    label,
    options,
    value,
    setValue,
    error,
    width
}: SelectProps) {

    return (
        <div className="flex flex-col my-5">
            <label>{label}</label>
            <select
                className={`w-${width} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none 
                            ${value === '' ? 'text-gray-500' : ''}
                            ${error.show ? 'border-red-500' : 'border-gray-300'}`}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            >
                <option value="">Select</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.key}</option>
                    ))
                }
            </select>
            {error.show ? <p className="text-red-500 italic text-[10px] mt-2">{error.message}</p> : null}
        </div>
    )
}