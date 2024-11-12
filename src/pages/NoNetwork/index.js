import React from 'react'
import { Icons } from '../../assets/Icons'
import { useNavigate } from 'react-router'
import RouteStrings from '../../utils/RouteStrings'

const NoNetwork = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            height: "100vh"
        }} className=' d-flex flex-column justify-content-center align-items-center text-light contianer p-5 '>
            <img loading="lazy" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = Icons.defualtImage;
            }} className='img-fluid' src={Icons.nointernet} />
            <h5 className='text-center pt-5'>Please Ceck your Connection</h5>
            <button onClick={() => { navigate(RouteStrings.home) }} style={{ backgroundColor: "#42c83c" }} className='btn btn-primary p-2 px-4'>Try Again</button>
        </div>
    )
}

export default NoNetwork