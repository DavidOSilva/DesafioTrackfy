import React, { useState } from "react";
import { AuthContext } from "./Contexts";

export default function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        isLoggedIn, setIsLoggedIn,
        user, setUser,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 