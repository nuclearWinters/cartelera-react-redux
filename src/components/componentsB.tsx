import React, { Component } from 'react'
import styles from "./componentB.module.css"
import stylessass from "./prueba.module.scss"

export default class componentsB extends Component {
    render() {
        return (
            <div className={stylessass.root}>
                Hola!
            </div>
        )
    }
}

