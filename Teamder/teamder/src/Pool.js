import React, { useState } from 'react';
import axios from 'axios';
import './Pool.css';

function Pool() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://2rgx4kaz2m.execute-api.us-east-1.amazonaws.com/deploy/pool_interaction', inputs)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    return (
        <div className="Form">
            <form onSubmit={handleSubmit}>
                <label>Pool Action (Put Delete):
                <input
                        type="text"
                        name="action"
                        onChange={handleChange}
                        placeholder="action"
                        value={inputs.action || ""} />

                    <br />
                </label>
                <label>Enter course_id:

                    <input
                        type="text"
                        name="course_id"
                        onChange={handleChange}
                        placeholder="course_id"
                        value={inputs.course_id || ""} />

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
                <button type="submit">Submit</button>
            </form>
        </div >
    )
}

export default Pool






