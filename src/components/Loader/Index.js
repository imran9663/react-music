import React from 'react'
import './style.scss'
const Loader = (props) => {
    const { length = 6 } = props

    function loaderDiv () {
        for (let index = 0; index < length; index++) {
            return (<span className='loader'></span>)
        }
    }
    return (
        <>
            <div className="loding_container">

                {loaderDiv()}
            </div>
        </>
    )
}

export default Loader