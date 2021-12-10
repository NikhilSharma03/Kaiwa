import React from 'react'
import "./Home.css";
import { Link } from "react-router-dom"
import ImgSrc from "./../../shared/ImgSrc"
import { useSelector } from "react-redux"

function Home() {
    const token = useSelector(state => state.user.token)

    return (
        <section className="home__container">
            <header className="home__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="home__user--button" to="/signup">{token ? "Chat" : "SignUp"}</Link>
            </header>
            <div className="home__content">
                <div className="home__content--left">
                    <h1>Get Started</h1>
                    <Link className="home__user--button" to="/login">{token ? "Chat" : "Login"}</Link>
                </div>
                <div className="home__content--right">
                    <img src={ImgSrc.HomeBanner} alt="banner" />
                </div>
            </div>
            <div className="home__footer"></div>
        </section>
    )
}

export default Home
