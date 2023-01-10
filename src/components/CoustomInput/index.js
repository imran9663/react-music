import React, { useState } from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
const CoustomInput = (props) => {
    const { type, label, name, id, placeholder, OnChange, OnBlur, errorText } = props;
    const [passwordType, setpasswordType] = useState(true);
    const [data, setData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(value)
        OnChange(value)
    }
    const handleBlur = (e) => {
        const { name, value } = e.target
        setData(value)
        OnBlur(value)
    }

    return (
        <>
            <div className="CoustomInput">
                <p className="CoustomInput-label"> {label}</p>
                {type === 'password' ?
                    <div className="CoustomInput-field">
                        <input
                            name={name}
                            id={id}
                            value={data}
                            onBlur={handleBlur}
                            className='CoustomInput-field-input'
                            type={passwordType ? "password" : 'text'}
                            placeholder={placeholder}
                            onChange={handleChange}
                        />
                        {
                            <button onClick={() => { setpasswordType(!passwordType) }} className="input-icon">
                                {passwordType ? <Icons.BsEyeSlashFill /> :
                                    <Icons.BsEyeFill />}
                            </button>
                        }

                    </div>
                    :
                    <div className="CoustomInput-field">
                        <input
                            name={name}
                            id={id}
                            value={data}
                            onBlur={handleBlur}
                            className='CoustomInput-field-input'
                            type={type}
                            placeholder={placeholder}
                            onChange={handleChange}
                        />
                    </div>}
                <span className='CoustomInput-error'> {errorText}</span>
            </div>
        </>
    )
}

export default CoustomInput