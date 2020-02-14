import React from 'react';
import './secion.scss';

const SectionComponent = ({title, items}) => {
    return (
        <div className="section">

            {title && <div className="section-title">
                {title}
            </div>
            }

            {items}

        </div>
    );
};

export default SectionComponent;
