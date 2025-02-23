import React from "react";

import Card from "./Card"

import "../styles/cardlist.scss"

class CardList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [
                {
                images: ["../img/fenderTest.jpeg", ""],
                name: "Fender 70th Anniversary Stratocaster",
                price: 599,
                inStock: true,
                chars: {
                    Shape: "Stratocaster",
                    Strings: "6",
                    Frets: "22",
                    Body: "Mahogany",
                    Pickups: "Single"
                }
            },
            {
                images: ["../img/guitar-test.png", ""],
                name: "Gibson Les Paul Standard 50s HCS",
                price: 2499,
                inStock: false,
                chars: {
                    Shape: "Les Paul",
                    Strings: "6",
                    Frets: "22",
                    Body: "Mahogany",
                    Pickups: "Humbuckers"
                }
            },
            {
                images: ["../img/jacksonTest.jpeg", ""],
                name: "Jackson JS32T Kelly",
                price: 333,
                inStock: true,
                chars: {
                    Shape: "Explorer",
                    Strings: "6",
                    Frets: "24",
                    Body: "Poplar",
                    Pickups: "Humbuckers"
                }
            },
            {
                images: ["../img/ibanezTest.jpg", ""],
                name: "Ibanez RG470AHM-BMT ",
                price: 555,
                inStock: true,
                chars: {
                    Shape: "Superstrat",
                    Strings: "6",
                    Frets: "24",
                    Body: "Ash",
                    Pickups: "2 Humbuckers, 1 single"
                }
            },
        ]
        }
    }

    render() {
        return (
                <div id="cards-container">
                    {this.state.products.map((product, index) => (
                            <div className="card" key={index}><Card 
                            images={product.images} 
                            name={product.name} 
                            price={product.price} 
                            inStock={product.inStock} 
                            chars={product.chars} 
                        /></div>
                    ))}
                </div>
        );
    }
}

export default CardList