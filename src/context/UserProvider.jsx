import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
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
                console.error('Erro ao verificar usuário:', error);
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
