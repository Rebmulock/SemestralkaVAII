import React, {useEffect, useState} from "react";
import "../../css/freecoursepage.css"
import {sendApiRequest} from "../ApiRequest.jsx";

const FreeCoursePage = () => {
    const [data, setData] = useState([]);

    const fetchAnalysisBlocks = async () => {
        try {
            const response = await sendApiRequest(
                        'http://127.0.0.1:8000/api/analysis-blocks',
                        'GET',
                        null,
                        false);

                setData(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        void fetchAnalysisBlocks();
    }, []);

    return (
        <div className="main-body">
            <div className="main-container">
                <p className="container-title">Analysis</p>

                <div className="container-content">
                    {data.length > 0 ? (
                        data.map((block, index) => (
                            <div key={index} className="analysis-block">
                                <h3>{block.instrument}</h3>
                                <p>Date: {block.date}</p>
                                {block.image && (
                                    <img
                                        src={block.image}
                                        alt={block.image_alt}
                                        className="analysis-image"
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No analysis blocks available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FreeCoursePage;