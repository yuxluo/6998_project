import React, { useState } from 'react';
import axios from 'axios';
import { cognitoUser } from './GetToken';
import './GetUserInfo.css';

function GetUserInfo() {

    const [Value, setValue] = useState();


    const submitButton = () => {

        cognitoUser.getSession((err, session) => {
            if (err) {
                console.log(err);
            } else if (!session.isValid()) {
                console.log("Invalid session.");
            } else {
                console.log("IdToken: " + session.getIdToken().getJwtToken());
                axios.post('https://2rgx4kaz2m.execute-api.us-east-1.amazonaws.com/deploy/get_user_info', { "id_token": session.getIdToken().getJwtToken() })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        setValue(res.data)
                    })
            }
        });

    }

    return (
        <div className='Info'>
            <h3>{Value}</h3>
            <button onClick={submitButton}>My Info</button>
        </div>
    )
}

export default GetUserInfo






