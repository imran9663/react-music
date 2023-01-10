import React from 'react'
import './style.scss'
const CoustomButton = (props) => {
    const { title, OnClick } = props
    return (
        <button onClick={() => { OnClick() }} className=" btn-accent">
            {title}
        </button>
    )
}

export default CoustomButton