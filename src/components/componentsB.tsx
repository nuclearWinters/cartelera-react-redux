import React, { Component } from 'react'
import styles from "./componentB.module.css"

export default class componentsB extends Component {
    render() {
        return (
            <div className={styles.root}>
                Hola!
            </div>
        )
    }
}

