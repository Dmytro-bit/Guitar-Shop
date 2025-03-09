import React from "react";

import Nav from "./Nav";
import "../styles/aboutus.scss";

class About extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <><Nav />
                <div className="about-container">
                    <div className="about-section">
                        <div className="about-section-text-container">
                            <p className="about-section-text-title">Who We Are?</p>
                            <p className="about-section-text">
                                Welcome to <b>Guitar Hero</b> — your go-to destination for musical instruments and
                                gear. We're more than just a music store; we're a community of passionate musicians,
                                artists, and sound enthusiasts dedicated to helping you find your perfect sound.
                                Founded with a love for music and a mission to inspire creativity, we offer a carefully
                                curated selection of high-quality instruments, from classic guitars and keyboards to
                                modern DJ equipment and accessories. Whether you're a seasoned professional or just
                                starting your musical journey, we're here to support you every step of the way.
                                At [Your Shop Name], music is more than a product — it’s a way of life.
                            </p>
                        </div>
                        <div className="about-section-image-container">
                            <img src="../img/aboutus-img1.jpg" className="about-section-image" alt="music-shop-image"/>
                        </div>
                    </div>
                    <div className="about-section">
                        <div className="about-section-text-container">
                            <p className="about-section-text-title">What Is Our Mission?</p>
                            <p className="about-section-text">
                                At <b>Guitar Hero</b>, our mission is simple: to empower musicians of all levels by providing high-quality instruments, exceptional service, and a community where creativity thrives.
                                We believe music has the power to inspire, connect, and transform lives. That’s why we're dedicated to offering a carefully curated selection of instruments and gear — so whether you're picking up your first guitar or fine-tuning your studio setup, you have the tools to bring your sound to life.
                                Our goal is to be more than just a store — we want to be your musical partner, supporting your journey every step of the way.
                            </p>
                        </div>
                        <div className="about-section-image-container">
                            <img src="../img/aboutus-img2.jpg" className="about-section-image" alt="music-shop-image"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}

export default About