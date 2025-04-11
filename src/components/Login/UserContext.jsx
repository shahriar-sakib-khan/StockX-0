import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Load user data from localStorage when the app starts
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    
    const [user, setUser] = useState(storedUser);

    // Whenever the user state changes, update localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // Save user data
        } else {
            localStorage.removeItem("user"); // Clear data if user logs out
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
