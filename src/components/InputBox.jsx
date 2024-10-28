import React, { useId } from "react";

const InputBox = React.memo(({ className, label, type, ...props }) => {
    const id = useId();
    return (
        <div className={"flex space-x-5 items-center justify-between " + className}>
            {
                label !== undefined && <label className="text-lg" htmlFor={id}>
                    {label}:
                </label>
            }
            <input {...props} className={className + " outline-none border px-3 py-1 w-full border-[#bac5cf] rounded-md "} type={type} name={label} id={id} />
        </div>
    )
})

export default InputBox;