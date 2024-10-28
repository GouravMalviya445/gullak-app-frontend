import { memo } from "react";

const SubmitBtn = memo(({ label, className, ...props}) => {
    return (
        <button {...props} className={"text-lg rounded-md bg-blue-500 px-16 py-1  text-white " + className}>{ label }</button>
    )
})

export default SubmitBtn;