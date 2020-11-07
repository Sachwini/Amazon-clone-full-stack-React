import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="homes">
            <div className="home_container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>
                <div className="home_row">
                    <Product
                    id="12321341" 
                    title="Beauty picks"
                    price={29.5}
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
                    rating={5}
                    />
                    <Product
                    id="49538094"
                    title="AmazonBasics Underseat, Carry-On Rolling Travel Luggage Bag with Wheels, 14 Inches"
                    price={62}
                    image="https://m.media-amazon.com/images/I/91qC+UYYwIL._AC_UL320_.jpg"
                    rating={4}
                    />
                    {/* product */}
                    {/* product */}
                </div>
                <div className="home_row">
                <Product
                id="4903850"
                title="AmazonBasics All-Season Cotton Weighted Blanket"
                price={65.5}
                image="https://m.media-amazon.com/images/I/81IpTYEmcmL._AC_UL320_.jpg"
                rating={4}/>
                <Product
                id="23445930"
                title="AmazonBasics Humidifier with Night Light and Aroma Diffuser - 4-Liter, White"
                price={29.5}
                image="https://m.media-amazon.com/images/I/71JHDQfKgUL._AC_UL320_.jpg"
                rating={3}/>
                <Product
                id="3254354345"
                title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                price={598.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"/>
                    {/* product */}
                    {/* product */}
                    {/* product */}
                </div>
                <div className="home_row">
                <Product
               id="90829332"
               title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
               price={1094.98}
               rating={4}
               image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"/>

                    {/* product */}
                </div>
            </div>
        </div>
    )
}

export default Home

