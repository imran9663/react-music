import React, { useState } from 'react'
import './style.scss'
import { getRandomGradients } from '../../utils'
const CoustomCheckbox = (props) => {
    const { data, updateLanguage, DefulatChecked } = props
    const handleChange = (e) => {
        const { name, checked } = e.target
        updateLanguage(name, checked)
    }
    return (
        <>
            {/*  */}
            <div className="checkbox-wrapper-16">
                <label name={data?.name} className="checkbox-wrapper">
                    <input
                        name={data?.name}
                        id={data?.name}
                        onChange={handleChange}
                        defaultChecked={DefulatChecked ? DefulatChecked : false}
                        value={data?.name}
                        defaultValue={data?.name}
                        type="checkbox"
                        className="checkbox-input" />
                    <span style={{ background: getRandomGradients() }} className="checkbox-tile">
                        <span className="checkbox-icon">
                            {data?.value?.split(' ')[0]}
                        </span>
                    </span>
                </label>
            </div>
        </>
    )
}

export default CoustomCheckbox