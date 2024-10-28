import React from 'react'
import { InputBox } from '../components'

const ProfileInfo = React.memo(({ label, onChange, value, ...props }) => {
    return (
        <div className='flex gap-4 justify-between items-center'>
            <span className='font-semibold text-white'>{label}:</span>
            <InputBox value={value} onChange={onChange} {...props} />
        </div>
    )
})

export default ProfileInfo