import React from 'react';
import './projects.scss';
import SectionComponent from "../section";
import CardComponent from "../card";

const ProjectsComponent = () => {
    return (
        <div className="projects">

            <SectionComponent
                title="Enirve"
                items={(
                    <div>
                        <CardComponent
                            title="API"
                            tags={['Typescript', 'NodeJS', 'Express', 'MongoDB']}
                            location="https://github.com/Aleix1379/enirve-api"
                            description="API Rest for Enirve."
                        />
                    </div>
                )}
            />

        </div>
    );
};

export default ProjectsComponent;
