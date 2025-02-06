import React, {useEffect, useState} from "react";
import ContentBlockComponent from "../components/ContentBlockComponent.jsx";
import "../../css/blueprint.css"
import {sendApiRequest} from "../ApiRequest.jsx";

const BlueprintPage = () => {
    const [contentBlocks, setContentBlocks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendApiRequest(
                    "http://127.0.0.1:8000/api/blueprint/",
                    "GET",
                    null,
                    true);
                setContentBlocks(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        void fetchData();
    }, [])

    const groupBlocks = (blocks, groupSize) => {
        let groups = [];

        if (!blocks) {
            return [];
        }

        for (let i = 0; i < blocks.length; i += groupSize) {
            groups.push(blocks.slice(i, i + groupSize));
        }

        return groups;
    }

    const groupedBlocks = groupBlocks(contentBlocks, 3);

    return (
        <>
            <div className="first-main main">
                <div className="nav-break"></div>

                <p className="main-text">Chapter First: Learn from scratch</p>

                {groupedBlocks.map((group, index) => (
                    <div key={index} className="content-group">
                        {group.map((contentBlock, blockIndex) => (
                            <ContentBlockComponent key={blockIndex} data={contentBlock} />
                        ))}
                    </div>
                ))}
            </div>

            <div className="main-info main">
                <h2 className="info-title">Title of the info block</h2>
                <p className="info-content">
                    Ut rutrum eget mauris sed venenatis. Vivamus suscipit dictum nisl a venenatis. Praesent ut semper risus.
                    Maecenas posuere odio nec leo suscipit dictum. Pellentesque consequat gravida mauris sed lobortis. Donec
                    aliquam dignissim ante, nec fringilla leo aliquet laoreet. Sed sodales, est a suscipit mollis, sem velit
                    tempus velit, at mattis turpis turpis at lectus. Pellentesque vitae iaculis lectus. Vivamus ullamcorper
                    egestas aliquam. Mauris at leo pretium, tincidunt tortor eu, fermentum risus. Vestibulum dolor massa,
                    lacinia sed ex ut, interdum vehicula mauris. Donec volutpat cursus lectus. Nullam commodo sit amet diam
                    sed vehicula. Fusce aliquet dui ex, eget gravida lectus ornare vel. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In ut neque non justo suscipit posuere vitae sit amet metus. Etiam sed nunc
                    odio. Sed scelerisque lectus ac nisl porttitor, ut sagittis ligula commodo. Maecenas quis venenatis est.
                    Maecenas mattis ante laoreet feugiat consectetur. Maecenas non libero et sem imperdiet aliquam ac vel
                    felis. Nulla sagittis ante nec varius dignissim. Aenean tempor mi a nisi pulvinar, congue tincidunt odio
                    commodo. Nullam tempor tempus diam, eu pulvinar sapien ultrices in. </p>
                <p className="info-author">David Kolumber, CEO</p>
            </div>

            <div className="second-main main">
                <div className="nav-break"></div>

                <p className="main-text">Chapter Second: OHLC</p>
            </div>
        </>
    )
}

export default BlueprintPage;