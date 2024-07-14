import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../Subcomponents/Logic";
// import ChatLoading from "./ChatLoading";
import GroupChatModal from "../Subcomponents/GroupModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/Context";
import { AccesschatRoute } from "../utils/APIroutes";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  // const [chats, setChats] = useState(["aniket", "snikjnef", "sjfnkdnf"]);
  // const [selectedChat, setSelectedChat] = useState("kjdankj");

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    console.log("In chat menu method");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${AccesschatRoute}?userId=${user._id}`,
        config
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log("fetching");

    if (user) fetchChats();
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#36168c"
      h="100%"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        // pb={3}
        // px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        bg="brown"
        // d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        className="pb-3 px-3 text-yellow-600 text-lg md:text-xl font-semibold flex justify-between items-center w-full"
      >
        My Chats
        <GroupChatModal />
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#145230"
        w="100%"
        h="90%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {/* <Text>{chat}</Text> */}
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
                {/* {chat.latestMessage && (
                   <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <Text>no chats</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button } from "@nextui-org/react";
// import GroupChatModal from "../Subcomponents/GroupModal";
// // import { getSender } from "../config/ChatLogics";
// // import ChatLoading from "./ChatLoading";
// // import { ChatState } from "../Context/ChatProvider";
// // import GroupChatModal from "./miscellaneous/GroupChatModal";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);

//   // const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${loggedUser.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(user);
//     fetchChats();
//   }, [fetchAgain]);

//   return (
//     <div className="flex flex-col items-center p-3 bg-red-400 w-full md:w-1/3 rounded-lg border border-gray-300">
//       <div className="pb-3 px-3 text-yellow-600 text-lg md:text-xl font-semibold flex justify-between w-full">
//         My Chats
//         <GroupChatModal></GroupChatModal>
//       </div>
//       <div className="flex flex-col p-3 bg-yellow-500 w-full h-full rounded-lg overflow-y-hidden">
//         {/* {chats.length > 0 ? ( */}
//         <div className="overflow-y-scroll">
//           {/* {chats.map((chat) => ( */}
//           <div
//           // key={chat._id}
//           // className={`cursor-pointer bg-${selectedChat === chat ? "teal-500 text-white" : "gray-300 text-black"} px-3 py-2 rounded-lg`}
//           // onClick={() => setSelectedChat(chat)}
//           >
//             <div></div>
//             {/* {chat.latestMessage && ( */}
//             <div className="text-xs">
//               {/* <b>{chat.latestMessage.sender.name} : </b> */}
//               {/* {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content} */}
//             </div>
//             {/* )} */}
//           </div>
//           {/* ))} */}
//         </div>
//         {/* ) : (
//           <ChatLoading />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default MyChats;
