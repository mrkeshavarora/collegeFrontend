import React from 'react'
import './Button.css'
const Button = ({btnText}) => {
    return (
        <button className='btn-primary button-component'>
            {btnText}
        </button>
    )
}

export default Button