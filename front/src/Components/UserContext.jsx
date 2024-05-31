import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get("http://localhost:4000/usuario/perfil", {
                    headers: {
                        Authorization: token,
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
