import React from "react";
import "./tags.scss";

const TagsComponent = ({tags, clickTag, title}) =>
    (
        tags.length > 0 &&
        <div className="tags-container">
            {
                title &&
                <div className="tag-title">{title}</div>
            }

            {
                tags.map(suggestion => (
                    <div key={suggestion} onClick={() => clickTag(suggestion)} className="tag">
                        {suggestion}
                    </div>
                ))
            }
        </div>
    );

export default TagsComponent;
