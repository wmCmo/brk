// 'use client';

// import { UserType } from "@/types/user";
// import { getLocalItem } from "@/hooks/useLocalItem";
// import { createContext, useEffect, useState } from "react";

// const UserContext = createContext<UserType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode; }) => {
//     const [user, setUser] = useState<UserType | undefined>(undefined);

//     useEffect(() => {
//         const localUser = getLocalItem('client');
//         if (localUser) setUser(localUser);
//     }, []);

//     return (
//         <UserContext.Provider value={user}>
//             {children}
//         </UserContext.Provider>
//     );
// };
