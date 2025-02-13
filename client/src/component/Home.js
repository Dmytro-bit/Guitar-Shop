import React from "react";

import Nav from "./Nav"

import "../styles/home.scss"


class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
           <><Nav /> 
            <div id="hero-container">
                <div id="hero">
                    <div id="text-container">
                        <div id="inner-text-container">
                            <div id="heading-container">
                                <h1 id="heading">GUITAR HERO</h1>
                            </div>
                            <div id="paragraph-container">
                                <h1 id="paragraph">Find the perfect sound with our premium selection of musical instruments. From beginners to professionals, we have everything you need to bring your music to life.</h1>
                            </div>
                        </div>
                        {/* TODO
                            * Make the button an anchor link */}
                        <div id="catalog-button-container"><button id="catalog-button">CATALOG</button></div>
                    </div>
                    <video autoPlay muted loop id="background">
                        <source src="../video/background.mp4"/>
                    </video>
                    <div className="video-overlay"></div>
                </div>
            </div></>
        )
    }


}

export default Home