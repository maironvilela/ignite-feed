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
    avatarUrl:
      'https://robohash.org/fa702cd215a504d5069edbc7f623979f?set=set4&bgset=&size=400x400',
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
