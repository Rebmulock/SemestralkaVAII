import React from 'react';

const ContentBlockComponent = () => {
    const blockProps = {
        title: "Title of the content block",
        text: "Aenean id consectetur nibh, ac fermentum dui. Morbi et ex id est convallis vulputate eu vitae nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla faucibus vulputate ipsum, quis aliquam nisl consectetur vel. Sed id varius purus. Quisque id nulla at risus pharetra sagittis. Proin pretium eros non felis elementum, sit amet cursus neque interdum. Quisque at cursus leo, ac vulputate mauris. Nam a ligula nec lectus ullamcorper pellentesque. Suspendisse commodo nisl nec enim vulputate, ac semper purus interdum. Mauris quis placerat arcu. Donec eros arcu, elementum ac lorem sit amet, pretium tristique dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum a condimentum enim.",
        imgSrc: "../../images/logo-circle-royal_purple.svg",
        imgAlt: "white logo in purple circle",
    };

    return (
        <section className="content-block">
            <h2>{blockProps.title}</h2>
            <div className="content">
                <img src={blockProps.imgSrc} alt={blockProps.imgAlt}/>
                <p>{blockProps.text}</p>
            </div>
        </section>
    );
};

export default ContentBlockComponent;
