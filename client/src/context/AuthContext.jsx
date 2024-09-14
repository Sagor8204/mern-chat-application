import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [notifications, setNotificatios] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  const data = {
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotificatios,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const Usecontext = () => {
  return useContext(Context);
};

export default ContextProvider;
