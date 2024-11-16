import React, { useMemo, useState } from 'react'
import './style.scss'
import { getRandomGradients } from '../../utils'
const CoustomCheckbox = (props) => {
    const gradients = useMemo(() => getRandomGradients, [])
    const { data, Type, updateLanguage, DefulatChecked } = props
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
                        type={Type ? Type : "checkbox"}
                        className="checkbox-input" />
                    <span style={{ background: gradients() }} className="checkbox-tile">
                        <h2 className="checkbox-icon">
                            {data?.value?.split(' ')[0]}
                        </h2>
                        <p className="checkbox-icon">
                            {data?.value?.split(' ')[1]}
                        </p>
                        <h1 className="singleCharacter">
                            {data.firstAlphabet}
                        </h1>
                    </span>
                </label>
            </div>
        </>
    )
}

export default CoustomCheckbox