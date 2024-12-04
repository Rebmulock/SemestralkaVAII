import React from "react";
import NavbarComponent from "../javascript/components/NavbarComponent.jsx";
import ContentBlockComponent from "../javascript/components/ContentBlockComponent.jsx";
import UserControlComponent from "../javascript/components/UserControlComponent.jsx";
import "../css/blueprint.css"

const BlueprintPage = () => {
    return (
        <>
            <NavbarComponent/>
            <div className="first-main main">
                <div className="nav-break"></div>

                <p className="main-text">Chapter First: Learn from scratch</p>

                <ContentBlockComponent/>

                <ContentBlockComponent/>

                <ContentBlockComponent/>
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

                <ContentBlockComponent/>

                <ContentBlockComponent/>
            </div>

            <UserControlComponent/>
        </>
    )
}

export default BlueprintPage;