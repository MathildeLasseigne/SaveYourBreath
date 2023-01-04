import { useState, useContext, createContext } from 'react';

const authContext = createContext();

const codespacesUrl = "http://localhost:8080";
// if using github codespaces
//const codespacesUrl = "https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev";

function useAuth() {
    const [user, setUser] = useState(null);
    const [gpxData, setGpxData] = useState([]);
    const [error, setError] = useState(null);
    const [favouriteTracks, setFavouriteTracks] = useState([]);

    return {
        user,
        setUser,
        gpxData,
        setGpxData,
        error,
        favouriteTracks,
        setFavouriteTracks,
        async initializeGpxData() {
            return fetch(codespacesUrl + '/tracks/all')
                .then((response) => response.ok ? (response.json()) : (response.json().then((error) => { throw error; })))
                .then((data) => {
                    if (gpxData.includes(data)) {
                        console.log("data already in gpxData");
                    } else {
                        setGpxData(data);
                    }
                    console.log('gpx data fetched', data);
                })
                .catch((error) => {
                    console.log("could not fetch gpx data: ", error);
                });
        },
        async login(username, password) {
            const data = {
                username: username,
                password: password
            }
            return fetch(codespacesUrl + '/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.ok ?
                    (response.json())
                    : (response.json().then((error) => { throw error; })))
                .then((data) => {
                    console.log('fetch login success:', data);
                    console.log('username is ', data.username);
                    console.log('role is ', data.role);
                    setUser({
                        id: data.id,
                        username: data.username,
                        role: data.role
                    });
                    // clean up error message if exists
                    if (error) {
                        setError(null);
                    }
                })
                .catch((error) => {
                    console.error('could not fetch /login, error:', error);
                    setError(error);
                });
        },
        async register(username, password) {
            const data = {
                username: username,
                password: password
            }
            return fetch(codespacesUrl + '/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.ok ?
                    (response.json())
                    : (response.json().then((error) => { throw error; })))
                .then((data) => {
                    console.log('fetch register success:', data);
                    return 200;
                })
                .catch((error) => {
                    console.error('could not fetch /register, error:', error);
                    return 400;
                });
        },
        logout() {
            setUser(null);
        }
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
