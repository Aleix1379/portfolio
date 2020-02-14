import React from "react";
import './link.scss';

const LinkComponent = ({location, label}) => {
    label = label || location.replace('https://', '');
    return (
        <a className="link" target="_blank" href={location}>{label}</a>
    )
};

export default LinkComponent;

