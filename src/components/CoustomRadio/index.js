import React from 'react'
import './style.scss'
const CoustomRadio = (props) => {
    const { data, updateLanguage, DefulatChecked } = props
    const handleChange = (e) => {
        const { name, checked } = e.target
        updateLanguage(name, checked)
    }
    return (
        <>
            {/*  */}
            <div className="radio-wrapper-16">
                <label name={data?.name} className="radio-wrapper">
                    <input
                        name={'radio'}
                        id={data?.name}
                        onChange={handleChange}
                        defaultChecked={DefulatChecked ? DefulatChecked : false}
                        value={data?.name}
                        defaultValue={data?.name}
                        type={"radio"}
                        className="radio-input" />
                    <span className="radio-tile">
                        <span className="radio-icon">
                            {data?.value?.split(' ')[0]}
                        </span>
                    </span>
                </label>
            </div>
        </>
    )
}

export default CoustomRadio