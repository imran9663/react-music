import React from 'react'
import './style.scss'
const SeekBar = (props) => {
    const { Ref } = props
    return (
        <>
            <input
                type='range' defaultValue={0} className="seekBar" />
        </>
    )
}

export default SeekBar