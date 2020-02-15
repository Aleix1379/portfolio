import React from 'react';
import './card.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';
import LinkComponent from "../link";

const
    TagsComponent = ({tags}) => {
        if (!tags) {
            console.log('tag null');
            return null;
        }

        tags = tags.map(tag => {
            return (
                <div key={tag} className="tag">{tag}</div>
            );
        });

        return (
            <div className="tags">
                {tags}
            </div>
        );
    };

const RatingComponent = ({rate}) => {
    if (!rate) {
        return null;
    }

    const rating = [];

    for (let i = 1; i <= 5; i++) {
        rating.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rate ? 'rate-enabled' : ''}/>)
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

    const buildLocation = location => {
        if (location && location.startsWith('https')) {
            return (<LinkComponent location={location}/>);
        } else {
            return (<div className="card__location">{location}</div>);
        }

    };

    return (
        <div className="card">
            {
                props.title &&
                <div className="card__title">{props.title}</div>
            }

            {
                props.company && <div>{props.company}</div>
            }

            {
                props.startDate && props.startDate && props.diff &&
                <div>{props.startDate} {props.startDate ? '-' : ''} {props.endDate} {props.diff ? '·' : ''} {props.diff}</div>
            }

            <div className="card__description">{props.description}</div>

            {buildLocation(props.location)}

            <TagsComponent tags={props.tags}/>

            <LanguagesComponent languages={props.languages}/>


        </div>
    );
};

export default CardComponent;
