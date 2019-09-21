//functional HOC with useState hook
import React, { useState, useEffect } from 'react';
import AuthHelperMethods from "./funciones"
import { fetchTokenSuccess } from "../actions/loginActions"
import { useDispatch } from "react-redux"

function withCountState(Wrapped: any) {
    
    const Auth = new AuthHelperMethods();
    return function (...props: any) {
        const dispatch = useDispatch()
        const [count, setCount] = useState(0);
        const [loaded, setLoaded] = useState(false);
        useEffect(() => {
            let isLogged = Auth.loggedIn()
            if (!isLogged) {
                console.log("Not logged")
            }
            else {
                try {
                    const confirm = Auth.getConfirm()
                    console.log("confirmation is:", confirm);
                    dispatch(fetchTokenSuccess(confirm.Nombre, confirm.Usuario))
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
            console.log("confirmed!")
            return (
                <Wrapped history={props.history} {...props} />
            )
        }
        else {
            console.log("not confirmed!")
            return null
        }
    }
}

export default withCountState