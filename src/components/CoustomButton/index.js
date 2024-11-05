import React from 'react'
import './style.scss'
const CoustomButton = (props) => {
    const { title, OnClick, Disabled } = props
    const handdleClicK = () => {
        OnClick()
    }
    return (
        <button disabled={Disabled} onClick={handdleClicK} className="btn-accent">
            {title}
        </button>
    )
}

export default CoustomButton