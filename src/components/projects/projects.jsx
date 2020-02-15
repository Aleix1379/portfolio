import React, {useState, useEffect} from 'react';
import './projects.scss';
import SectionComponent from "../section";
import CardComponent from "../card";
import SearchComponent from "../search";
import TagsComponent from "../tags";


const ProjectsComponent = () => {
    const [tags, setTags] = useState([]);
    const [sections, setSections] = useState([]);
    const [numberOfTags, setNumberOfTags] = useState(0);

    const originalSections = [
        {
            title: 'Enirve',
            items: [
                {
                    title: "API Rest for Enirve",
                    tags: ['Typescript', 'NodeJS', 'Express', 'MongoDB'],
                    location: "https://github.com/Aleix1379/enirve-api"
                },
                {
                    title: "Web app of Enirve",
                    tags: ['Typescript', 'Angular', 'SASS'],
                    location: "https://github.com/Aleix1379/enirve-web"
                },
                {
                    title: "Mobile app of Enirve",
                    tags: ['Javascript', 'React Native', 'CSS'],
                    location: "https://github.com/Aleix1379/enirve-react-native"
                },
            ]
        },
        {
            title: 'Web',
            items: [
                {
                    title: "Personal web",
                    tags: ['Javascript', 'ReactJS', 'SASS'],
                    location: "https://github.com/Aleix1379/portfolio"
                }
            ]
        }
    ];

    useEffect(() => {
            setSections(originalSections);
        },
        []
    );

    useEffect(() => {
            updateSearch();
        },
        [tags]
    );

    const updateSearch = () => {
        const newSections = [];
        if (tags.length > 0) {
            originalSections.forEach(section => {
                newSections.push(
                    {
                        title: section.title,
                        items: section.items.filter(item => item.tags.some(tag => tags.indexOf(tag) >= 0))
                    }
                );
            });
            setSections(newSections);
        } else {
            setSections([...originalSections]);
        }
    };

    const addTags = newTag => {
        setTags([...tags, newTag]);
        setNumberOfTags(0);

    };

    const deleteTag = oldTag => {
        setTags(tags.filter(tag => tag !== oldTag));
    };

    const getStyleContainer = () => {
        let styles = 'projects';
        if (numberOfTags > 0) {
            styles += ' search-active';
        }
        return styles;
    };

    const searchChanged = (tags) => {
        setNumberOfTags(tags.length);
    };

    return (
        <div className={getStyleContainer()}>

            <SearchComponent
                tags={tags}
                addTags={addTags}
                onChange={searchChanged}
            />

            <TagsComponent
                title="Current filter"
                tags={tags}
                clickTag={(tag) => deleteTag(tag)}
            />

            {
                sections.map(section =>
                    section.items.length > 0 &&
                    <SectionComponent
                        key={section.title}
                        title={section.title}
                        items={
                            <div>
                                {
                                    section.items.map(item =>
                                        <CardComponent
                                            key={item.title}
                                            title={item.title}
                                            tags={item.tags}
                                            location={item.location}
                                            description={item.description}
                                            image={item.image}
                                        />
                                    )
                                }
                            </div>
                        }
                    />
                )
            }

        </div>
    );
};

export default ProjectsComponent;
