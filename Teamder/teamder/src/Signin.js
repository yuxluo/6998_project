import React from 'react'
import { Link } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
Amplify.configure(awsconfig)


function Signin({ signOut }) {
    return (
        <Link to={"/signout"}>
            <Authenticator socialProviders={['amazon', 'apple', 'facebook', 'google']}>
                {({ signOut, user }) => (
                    <main>
                        <h1>Hello {user.username}</h1>
                        <button onClick={signOut}>Sign out</button>
                    </main>
                )}
            </Authenticator>
        </Link>

    );
}

export default Signin