import React from 'react';

const ServiceCardComponent = () => {
    const services = [
        {
            title: 'Class: One-To-Many',
            imgSrc: '../images/people-group-royal-purple.svg',
            imgAlt: 'group of many people',
            pros: 'Low cost',
            cons: 'No time for personal problem-solving',
            price: 100,
            buttonText: 'Buy now',
        },
        {
            title: 'Class: One-To-Five',
            imgSrc: '../images/people-five-royal-purple.svg',
            imgAlt: 'group of five people',
            pros: 'More personal approach',
            cons: 'Each participant may have varying levels of experience and needs',
            price: 400,
            buttonText: 'Buy now',
        },
        {
            title: 'Class: One-To-One',
            imgSrc: '../images/people-single-royal-purple.svg',
            imgAlt: 'single person',
            pros: 'Our attention is reserved exclusively for you',
            cons: 'Limited availability.',
            price: 500,
            buttonText: 'Qualify now',
        },
    ];

    const serviceCards = services.map(service => (
        <div className="col-md-4 mb-4">
            <div className="card h-100 d-flex">
                <div className="card-body d-flex flex-column">
                    <p className="main-text">{service.title}</p>
                    <img className="d-block mx-auto" src={service.imgSrc}
                         alt={service.imgAlt}/>
                    <p className="card-text"><strong>Pros: </strong>{service.pros}</p>
                    <p className="card-text"><strong>Cons: </strong>{service.cons}</p>
                    <p className="card-text mt-auto"><span><strong>Price:</strong> ${service.price}</span>
                        <button className="btn btn-primary btn-qualify">{service.buttonText}</button>
                    </p>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="row">
            {serviceCards}
        </div>
    )
}

export default ServiceCardComponent;