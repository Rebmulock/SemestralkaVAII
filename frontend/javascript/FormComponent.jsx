const FormComponent = () => {
    const options = [{
            id: "beginner",
            text: "Unlock the best blueprint for beginners",
            imgSrc: "images/graduation-cap-royal-purple.svg",
            imgAlt: "graduation cap",
            url: "pages/blueprint.html",
        }, {
            id: "others",
            text: "Scale my trading from experience to consistent profit",
            imgSrc: "images/money-bill-trend-up-royal-purple.svg",
            imgAlt: "money bill",
            url: "pages/scaling.html",
        }
    ];

    const formOptions = options.map(option => (
        <label key={option.id} className="option" onClick={() => (window.location.href = option.url)} htmlFor={option.id}>
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
