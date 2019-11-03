import React from 'react';
import './experience.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const SkillsComponent = ({skills}) => {
    if (!skills) {
        console.log('skill null');
        return null;
    }

    skills = skills.map(skill => {
        return (
            <div key={skill} className="skill">{skill}</div>
        );
    });

    return (
        <div className="skills">
            {skills}
        </div>
    );
};

const RatingComponent = ({rate}) => {
    if (!rate) {
        return null;
    }

    const rating = [];

    for (let i = 1; i <= 5; i++) {
        rating.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rate ? 'rate-enabled': ''} />)
    }

    console.log('rating...');
    console.log(rating);

    return (
        <div className="rating">
            {rating}
        </div>
    );
};

const LanguagesComponent = ({languages}) => {
    if (!languages) {
        return null;
    }

    languages = languages.map(language => {
        return (
            <div key={language.name} className="language">
                <span>{language.name}</span>
                <RatingComponent rate={language.level}/>
            </div>
        );
    });

    return (
        <div className="languages">
            {languages}
        </div>
    );

};

const CardComponent = (props) => {
    return (
        <div className="experience">
            <div className="experience__title">{props.title}</div>
            <div>{props.company}</div>
            <div>{props.startDate} {props.startDate ? '-' : ''} {props.endDate} {props.diff ? '·' : ''} {props.diff}</div>
            <div className="experience__location">{props.location}</div>
            <div className="experience__description">{props.description}</div>

            <SkillsComponent skills={props.skills}/>

            <LanguagesComponent languages={props.languages}/>


        </div>
    );
};

export default CardComponent;
