import React from 'react';
import PropTypes from 'prop-types';

const ContentBlockComponent = ({ data }) => {
    const { title, content, image, image_alt } = data;

    return (
        <section className="content-block">
            <h2>{title}</h2>
            <div className="content">
                <img src={image} alt={image_alt}/>
                <p>{content}</p>
            </div>
        </section>
    );
};

ContentBlockComponent.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        image_alt: PropTypes.string.isRequired,
    }).isRequired,
};

export default ContentBlockComponent;
