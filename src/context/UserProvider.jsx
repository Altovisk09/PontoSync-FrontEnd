import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.userData);

                    if (data.userData.repsId && data.userData.repsId.length > 0) {
                        const employeesResponse = await fetch(`${import.meta.env.VITE_URL}/api/employees`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({ repsId: data.userData.repsId }), 
                        });

                        if (employeesResponse.ok) {
                            const employeesData = await employeesResponse.json();
                            setEmployees(employeesData);
                            console.log(employeesData)
                        } else {
                            console.error('Erro ao obter funcionários:', employeesResponse.statusText);
                        }
                    }
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

    const isAuthenticated = user !== null;
    return (
        <UserContext.Provider value={{ user, setUser, employees, setEmployees, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};
