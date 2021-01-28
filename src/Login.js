import React from 'react';
import './Login.css';
import {Button } from '@material-ui/core';
import { auth, provider} from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [state,dispatch] = useStateValue();

    const signIn= ()=>{
        auth
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user
                })
            })
            .catch((error) => alert(error.message))
    }


    return (
        <div className="login">
            <div className="login__container">
                {/* <img src="https://yt3.ggpht.com/a-/AAuE7mDBBS00E88tbJONrBTNiWDBhHSfBKSM3889QA=s900-mo-c-c0xffffffff-rj-k-no" alt="/" /> */}
                <h1>Nescii</h1>
                <h1>Sign in to Nescii</h1>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login;
