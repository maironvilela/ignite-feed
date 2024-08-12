import React, { createContext, useState } from 'react';

type User = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

type UserContextProps = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: '2345678',
    avatarUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/662.jpg',
    name: 'Maria da Silva Oliveira',
    role: 'Departamento Pessoal'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
