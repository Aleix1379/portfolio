import React from 'react';
import './experience.scss'

const ExperienceComponent = (props) => {
    return (
        <div className="experience">
            <div className="experience__title">{props.title}</div>
            <div>{props.company}</div>
            <div>{props.startDate} - {props.endDate} · {props.diff}</div>
            <div className="experience__location">{props.location}</div>
            <div className="experience__description">{props.description}</div>
        </div>
    );
};

export default ExperienceComponent;
