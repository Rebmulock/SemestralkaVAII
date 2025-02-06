import React, { useState } from "react";
import {sendApiRequest} from "../ApiRequest.jsx";
import "../../css/contentblockpage.css";
import {validateUsername} from "../InputValidator.jsx";

const CreateAnalysisBlockPage = () => {
     const [data, setData] = useState({
        instrument: '',
        image_url: '',
        image_alt: '',
    });

    const [image, setImage] = useState(null);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })

        if(!validateUsername(e.target.value)) {
            setError("Letters, numbers and underscores only!")
        } else {
            setError(null);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const currentDate = new Date().toISOString().split('T')[0];

        const formData = new FormData();
        formData.append('instrument', data.instrument);
        formData.append('date', currentDate);
        formData.append('image', e.target.image.files[0]);
        formData.append('image_alt', data.image_alt);

        try {
            const response = await sendApiRequest(
                "http://127.0.0.1:8000/api/analysis-blocks",
                'POST',
                formData,
                false
            );

            if (response.status >= 200 && response.status < 300) {
                setData({
                    instrument: '',
                    image_url: '',
                    image_alt: '',
                })

                setMessage("Content block created");
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    return (
        <main>
            <form className="content-block-form" onSubmit={handleSubmit}>
                <div>
                    <div className="content-block-title">
                        <label><h2>Instrument</h2></label>
                        <input
                            type="text"
                            name="instrument"
                            value={data.instrument}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="content-block-content">
                        <div className="content-image">
                            <label>
                                <input
                                    id="image-input"
                                    type="file"
                                    name="image"
                                    accept={"image/jpeg, image/jpg, image/png"}
                                    onChange={(e) => {
                                        handleImageChange(e);
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() => document.getElementById('image-input').click()}
                                >
                                    Select Image
                                </button>
                            </label>

                            <img className="image-preview" alt="preview image" src={image}/>

                            <label>Image Alternative Text</label>
                            <input
                                type="text"
                                name="image_alt"
                                value={data.image_alt}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {message && <p style={{color: "green"}}>{message}</p>}
                {error && <p style={{color: "red"}}>{error}</p>}
                <button type="submit">Create</button>
            </form>
        </main>
    )
}

export default CreateAnalysisBlockPage;