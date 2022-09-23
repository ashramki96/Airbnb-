import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser(){
    const dispatch = useDispatch()

    const loginDemoUser = (e) => {
        e.preventDefault()
        dispatch(sessionActions.login({
            credential: "Demo-lition",
            password: "password"
        }))
    }

    return (
        <button onClick = {loginDemoUser}>Login as Demo User</button>
    )
}

export default DemoUser