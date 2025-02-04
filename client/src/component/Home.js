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
                    <div id="heading-container">
                        <h1 id="heading">GUITAR HERO</h1>
                    </div>
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