import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import Header from "../components/Header";
import MyChats from "../components/MyChats";
import { Usecontext } from "../context/AuthContext";

const Home = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = Usecontext();

  return (
    <>
      {user && (
        <div>
          <Header />
          <div className="chat_wrapper container">
            <MyChats fetchAgain={fetchAgain} />
            <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
