import React, { Component } from 'react'
//import styles from './componentsA.css'
import styles from './componentA.module.css';

export default class componentsA extends Component {
    render() {
        return (
            <div className={styles.root}>
                Hola!
            </div>
        )
    }
}

