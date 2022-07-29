// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFk1LvTViX5RRSCB0IEY3G7Bf5E_tPnpQ",
    authDomain: "fir-9kr.firebaseapp.com",
    projectId: "fir-9kr",
    storageBucket: "fir-9kr.appspot.com",
    messagingSenderId: "330963542034",
    appId: "1:330963542034:web:90edeefff9b4da92d0b8cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const fetchToken = (setTokenFound) =>
{
    return getToken(messaging, { vapidKey: 'GENERATED_MESSAGING_KEY' }).then((currentToken) =>
    {
        if (currentToken)
        {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else
        {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) =>
    {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}


export const onMessageListener = () =>
    new Promise((resolve) =>
    {
        onMessage(messaging, (payload) =>
        {
            resolve(payload);
        });
    });