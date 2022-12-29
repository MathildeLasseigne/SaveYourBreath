import { useState, useContext, createContext } from 'react';

const authContext = createContext();
const codespaceUrl = "https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev";

function useAuth() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    return {
        user,
        setUser,
        error,
        async login(username, password) {
            const data = {
                username: username,
                password: password
            }
            return await fetch(codespaceUrl+'/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.ok ? (response.json()) : (response.json().then((error) => { throw error; })))
                /*{
                    
                    if (!response.ok) { // server status in the range 200-299
                        
                    }
                    return (response.json(), isError);
                }) */
                .then((data) => {
                    console.log('fetch login success:', data);
                    console.log('username is ', data.username);
                    console.log('role is ', data.role);
                    setUser({
                        id: data.id,
                        username: data.username,
                        role: data.role
                        });
                })
                .catch((error) => {
                    console.error('could not fetch /login, error:', error);
                    setError(error);
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
