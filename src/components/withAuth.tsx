//functional HOC with useState hook
import React, { useState, useEffect } from 'react';
import AuthHelperMethods from "./funciones"

function withCountState(Wrapped: any) {
    const Auth = new AuthHelperMethods();
    return function (...props: any) {
        const [count, setCount] = useState(0);
        const [confirm, setConfirm] = useState(null);
        const [loaded, setLoaded] = useState(false);
        useEffect(() => {
            if (!Auth.loggedIn()) {
                console.log("Not logged")
            }
            else {
                try {
                    const confirm = Auth.getConfirm()
                    console.log("confirmation is:", confirm);
                    setConfirm(confirm)
                    setLoaded(true)
                }
                catch (err) {
                    console.log(err);
                    Auth.logout()
                }
            }
        }, [])
        props['count'] = count;
        props['setCount'] = setCount;
        ///return <Wrapped  />;
        if (loaded === true) {
            if (confirm) {
                console.log("confirmed!")
                return (
                    <Wrapped history={props.history} {...props} confirm={confirm} />
                )
            }
            else {
                console.log("not confirmed!")
                return null
            }
        }
        else {
            return null
        }
        
    }
}

export default withCountState

/*import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';

export default function withAuth(AuthComponent) {
    
    const Auth = new AuthHelperMethods();

    return class AuthWrapped extends Component {
       
        state = {
            confirm: null,
            loaded: false
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const confirm = Auth.getConfirm()
                    console.log("confirmation is:", confirm);
                    this.setState({
                        confirm: confirm,
                        loaded: true
                    })
                }
                catch (err) {
                    console.log(err);
                    Auth.logout()
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.loaded == true) {
                if (this.state.confirm) {
                    console.log("confirmed!")
                    return (
                        <AuthComponent history={this.props.history} confirm={this.state.confirm} />
                    )
                }
                else {
                    console.log("not confirmed!")
                    return null
                }
            }
            else {
                return null
            }
        }
    }
}*/