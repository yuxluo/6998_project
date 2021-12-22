import React, { useState } from 'react';
import axios from 'axios';
import './PutUserInfo.css';

function PutUserInfo() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('https://2rgx4kaz2m.execute-api.us-east-1.amazonaws.com/deploy/put_user_info', inputs)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>Enter your firstname:
                <input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        placeholder="First Name"
                        value={inputs.firstname || ""} />

                    <br />
                </label>
                <label>Enter your lastname:

                    <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        placeholder="Last Name"
                        value={inputs.lastname || ""} />

                    <br />
                </label>
                <label>Enter your email:

                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="email"
                        value={inputs.email || ""} />

                    <br />
                </label>
                <label>Enter your online status:

                    <input
                        type="text"
                        name="online"
                        onChange={handleChange}
                        placeholder="online"
                        value={inputs.online || ""} />

                    <br />
                </label>
                <label>Enter your uni:

                    <input
                        type="text"
                        name="uni"
                        onChange={handleChange}
                        placeholder="uni"
                        value={inputs.uni || ""} />

                    <br />
                </label>
                <label>Enter your skill 1-5 for skill level, please enter at lease 3 skills:

                    <input
                        type="text"
                        name="skill"
                        onChange={handleChange}
                        placeholder="skill"
                        value={inputs.skill || ""} />

                    <br />

                </label>
                <button type="submit">Submit</button>
            </form>
        </div >
    )
}

export default PutUserInfo






