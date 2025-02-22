import React from "react";

import Nav from "./Nav"
import CardList from "./CardList"

import "../styles/products.scss"

class Products extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <><Nav />
        
            <div><CardList /></div></>
        )
    }


}

export default Products