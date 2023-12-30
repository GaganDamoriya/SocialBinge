import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  userId: string | null;
  username: string | null;
  email: string | null;
  bookMarks: [];
  follower: [];
  following: [];
  // Add more properties as needed
}

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: null,
    username: null,
    email: null,
    bookMarks: [],
    follower: [],
    following: [],
  });

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
