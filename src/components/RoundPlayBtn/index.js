import React, { useState, useEffect } from 'react';

const CostomInput = (props) => {
    const [state, setState] = useState(Number);
    const [isOnfocus, setisOnfocus] = useState(false);
    useEffect(() => {
        setState(2500)
    }, [])
    const currencyFormat = arg => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(Number(arg));// return (arg).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    const handleChange = e => {
        const { value } = e.target;
        const removedSplChar = (value.split('.')[0].replace(/[^a-zA-Z0-9]/g, ''))
        setState(Number(removedSplChar));
    };
    const handleOnFocus = () => {
        setisOnfocus(true)
    }
    const handleOnBlur = () => {
        setisOnfocus(false)
    }
    return (
        <div className='App w-25 mt-5 pt-5'>
            <div className='d-flex'>
                <input type='checkbox' name='checkbox' id='checkbox' />
                <input
                    onBlur={handleOnBlur}
                    type='text'
                    value={isOnfocus ? state : currencyFormat(state)}
                    onChange={handleChange}
                    onFocus={handleOnFocus}
                    className='form-control'
                    name='amount'
                    id=''
                />
            </div>
        </div>
    );
}

// Log to console
export default CostomInput