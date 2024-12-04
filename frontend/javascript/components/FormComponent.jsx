import React from 'react';
import {useNavigate} from "react-router-dom";
import "../../css/homepage-form.css"

const FormComponent = () => {
    const options = [{
            id: "beginner",
            text: "Unlock the best blueprint for beginners",
            imgSrc: "images/graduation-cap-royal-purple.svg",
            imgAlt: "graduation cap",
            url: "/blueprint",
        }, {
            id: "others",
            text: "Scale my trading from experience to consistent profit",
            imgSrc: "images/money-bill-trend-up-royal-purple.svg",
            imgAlt: "money bill",
            url: "/scaling",
        }
    ];

    const navigate = useNavigate();

    const formOptions = options.map(option => (
        <label key={option.id} className="option" onClick={() => navigate(option.url)} htmlFor={option.id}>
            <input type="radio" id={option.id} name="option-radio" />

            <span className="option-radio"></span>

            <span className="option-content">
                <img className="option-img" src={option.imgSrc} alt={option.imgAlt} />
                <span className="option-text">{option.text}</span>
            </span>

        </label>
    ))

    return (
        <form>
            <fieldset className="choices-container">
                <legend className="choices-title">Choose what best describes your goal:</legend>
                {formOptions}
            </fieldset>
        </form>
    );
};

export default FormComponent;
