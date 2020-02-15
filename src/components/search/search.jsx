import React, {useState} from "react";
import "./search.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import TagsComponent from "../tags";

const SearchComponent = ({addTags, tags, onChange}) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const originalTags = [
        'Angular',
        'CSS',
        'Express',
        'Javascript',
        'MongoDB',
        'NodeJS',
        'React Native',
        'ReactJS',
        'SASS',
        'Typescript'
    ];

    const updateSearch = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        let resultTags = [];

        if (newValue === "") {
            setSuggestions(resultTags);
        } else {
            resultTags = originalTags.filter(tag =>
                tag.toLowerCase().startsWith(newValue.toLowerCase()) && tags.indexOf(tag) === -1
            );
            setSuggestions(resultTags);
        }
        onChange(resultTags);
    };

    const removeSearch = () => {
        setValue('');
        setSuggestions([]);
        onChange([]);
    };

    const clickTag = (tag) => {
        removeSearch();
        addTags(tag);
    };

    return (
        <div className="search">
            <div className="search__container">
                <input className="search__input" title="search" placeholder="Search" value={value}
                       onChange={updateSearch}/>
                {
                    value.length > 0 &&
                    <FontAwesomeIcon icon={faTimes} className="search__remove" onClick={removeSearch}/>
                }
            </div>

            <TagsComponent
                tags={suggestions}
                clickTag={(tag) => clickTag(tag)}
            />
        </div>
    );
};

export default SearchComponent;
