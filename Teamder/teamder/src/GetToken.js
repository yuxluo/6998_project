import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = { UserPoolId: "us-east-1_GThDwTlRp", ClientId: "590mpekdc590uttgc4jaj92kmr" };
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// React
export const cognitoUser = userPool.getCurrentUser();
if (cognitoUser != null) {
    console.log(cognitoUser);
    cognitoUser.getSession((err, session) => {
        if (err) {
            console.log(err);
        } else if (!session.isValid()) {
            console.log("Invalid session.");
        } else {
            console.log("IdToken: " + session.getIdToken().getJwtToken());
        }
    });
} else {
    console.log("User not found.");
}

