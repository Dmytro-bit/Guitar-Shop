import React from "react";

import "../nav.scss"

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: ["Home", "Catalog", "Products", "About"],
            active: "Home"
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <ul className="navbar">
                    {this.state.options.map((item, index) => (
                        <li key={index} id={item === this.state.active ? "active" : "inactive"}>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Nav