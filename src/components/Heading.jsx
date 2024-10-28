import { memo } from "react";

const Heading = memo(({ heading, className }) => {
    return (
        <div>
            <h1 className={`text-3xl font-serif ${className}`}>{heading}</h1>
        </div>
    )
})

export default Heading;