import React from 'react'
import './style.scss'
const CoustomRadio = (props) => {
    const { data, OnChecked } = props
    const handleChange = (e) => {
        const { name, checked } = e.target;
        // console.log("OnChecked", OnChecked);
        OnChecked(name, checked);
    }
    return (
        <>
            {/*  */}
            <div className="radio-wrapper-16">
                <label name={data?.name} className="radio-wrapper">
                    <input
                        {...props}
                        name={'radio'}
                        id={data?.name}
                        onChange={handleChange}
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