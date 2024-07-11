interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    width: string;
    error: {
        show: any;
        message: any;
    };
    value: string | number;
    setValue: (value: any) => void;
    disabled?: boolean;
}

export default function Input({
    label,
    placeholder,
    type,
    width,
    error,
    value,
    setValue,
    disabled
}: InputProps) {
    return (
        <div className={`form-group w-${width}`}>
            <label>{label}</label>
            <input
                type={type}
                className={`form-control`}
                disabled={disabled}
                style={{
                    backgroundColor: disabled ? '#919191' : '#fff',
                    cursor: disabled ? 'not-allowed' : 'auto',
                    border: error && error.show ? '1px solid red' : '1px solid #e5e7eb'
                    
                }}
                placeholder={placeholder}
                onChange={setValue}
                value={value}
            />
            {
                error && error.show && (
                    <div className="text-red-500 italic text-[10px] mt-2">{error.message}</div>
                )
            }
        </div>
    )
}
