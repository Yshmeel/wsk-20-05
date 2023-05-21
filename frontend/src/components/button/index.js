import React from 'react'
import "./index.css"
import {Link} from "react-router-dom"

const Button = (props) => {
    const {
        variant,
        text,
        type = 'button',
        disabled = false,
        link = '',
        onClick
    } = props;

    /* Links only supports: link, disabled, variant */
    if(link) {
        return (
            <Link to={link} className={`button button-${variant} ${disabled ? 'disabled' : ''}`}>
                {text}
            </Link>
        );
    }

    return (
        <button type={type} className={`button button-${variant} ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
