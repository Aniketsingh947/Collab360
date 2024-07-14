import React from "react";
import { useState } from "react";
import MyChats from "../Components/ChatMenu";
import Chatbox from "../Components/ChatBox";

function TeamChatpage() {
  const [fetchAgain, setFetchAgain] = useState(false);
  // const { user } = ChatState();

  return (
    <div style={{ width: "100%", height: "576px", backgroundColor: "black" }}>
      {/* {user && <SideDrawer />} */}
      <div className="justify-between flex w-full h-full overflow-auto">
        <MyChats fetchAgain={fetchAgain} />
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
}

export default TeamChatpage;
