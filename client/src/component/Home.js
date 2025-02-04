import React from "react";

import "../home.scss"


class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div id="hero-container">
                <div id="hero">
                    {/* TODO
                        * Make responsive */}
                    <div id="heading-container">
                        <h1 id="heading">GUITAR HERO</h1>
                    </div>
                    <div id="paragraph-container">
                        <h1 id="paragraph">Find the perfect sound with our premium selection of musical instruments. From beginners to professionals, we have everything you need to bring your music to life.</h1>
                    </div>
                    {/* TODO
                        * Make the button an anchor link */}
                    <button id="catalog-button">CATALOG</button>
                    <video autoPlay muted loop id="background">
                        <source src="../video/background.mp4"/>
                    </video>
                    <div class="video-overlay"></div>


                </div>
            </div>
        )
    }


}

export default Home