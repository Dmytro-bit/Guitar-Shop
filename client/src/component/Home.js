import React from "react";

import Nav from "./Nav"
import CatalogCardList from "./CatalogCardList"

import "../styles/home.scss"


class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state ={
            isAdmin: false
        }
    }

    componentDidMount = () =>
    {
        this.setState({isAdmin: localStorage.getItem("accessLevel") === "2"});
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
            </div>
           <div className="separator">Check out our stock!</div>
               <div className="catalog-container">
                   <div className="catalog-title-container">
                       <p className="catalog-title">OUR PRODUCTS</p>
                   </div>
                   <CatalogCardList isAdmin={this.state.isAdmin} />
               </div>
           </>
        )
    }


}

export default Home