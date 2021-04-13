import React from "react"
import Navbar from "../component/Navbar"

export default class Logout extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1>Ini Halaman Logout</h1>
            </div>
        )
    }
}
