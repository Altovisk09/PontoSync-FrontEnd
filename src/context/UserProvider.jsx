import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            if (user !== null) {
                return; 
            }

            const cookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));

            if (!cookie) {
                setUser(null);
                return;
            }

            try {
                const response = await fetch('https://ponto-sync-back-end.vercel.app/api/user', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        };

        checkUser();
    }, []); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
