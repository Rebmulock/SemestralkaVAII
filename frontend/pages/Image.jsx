import React, { useState } from "react";
import {sendApiRequest} from "../javascript/ApiRequest.jsx";
import "../css/imagepage.css";

const ImagePage = () => {
    const [data, setData] = useState({
        title: '',
        content: '',
        image_url: '',
        image_alt: '',
    });

    const [image, setImage] = useState(null);

    const [error, setError] = useState([]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', e.target.image.files[0]);
        formData.append('image_alt', data.image_alt);

        try {
            const response = await sendApiRequest(
                "http://127.0.0.1:8000/api/blueprint/",
                'POST',
                formData,
                false
            );

            if (response) {
                console.log(response.data);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    maxLength={100}
                    required
                />

                <label>Content</label>
                <input
                    type="text"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                />

                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    accept={"image/jpeg, image/jpg, image/png"}
                    onChange={(e) => {
                        handleImageChange(e);
                    }}
                />
                <img className="image-preview" alt="preview image" src={image}/>

                <label>Image Alternative Text</label>
                <input
                    type="text"
                    name="image_alt"
                    value={data.image_alt}
                    onChange={handleChange}
                />
            </div>

            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit">Create</button>
        </form>
    )
}

export default ImagePage;