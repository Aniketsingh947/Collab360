// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "./Logic";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import { MessageSend } from "../utils/APIroutes";
// import Lottie from "react-lottie";
// import animationData from "./typing.json";
// import io from "socket.io-client";
// import UpdateGroupChatModal from "./UpdateGroupChatModal";
// import { ChatState } from "../Context/Context";
// const ENDPOINT = "http://localhost:8080"; // "https://talk-a-tive.herokuapp.com"; -> After deployment

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);
//   const toast = useToast();
//   const socket = useRef(null);

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { user, notification, setNotification, selectedChat, setSelectedChat } =
//     ChatState();
//   // console.log(user);

//   useEffect(() => {
//     if (user) {
//       socket.current = io(ENDPOINT); // Establishing the socket connection
//       socket.current.emit("setup", user); // Setting up the user on the socket
//       socket.current.on("connected", () => setSocketConnected(true)); // Handling connection event
//       socket.current.on("typing", () => setIsTyping(true)); // Handling typing event
//       socket.current.on("stop typing", () => setIsTyping(false)); // Handling stop typing event
//     }

//     // Cleanup function
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect(); // Disconnecting the socket when the component unmounts
//       }
//     };
//   }, [user]);

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `${MessageSend}/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   const sendMessage = async (event) => {
//     console.log(`${newMessage}--${user}--${selectedChat}`);
//     if (event.key === "Enter" && newMessage) {
//       console.log("sending");
//       if (socket) {
//         socket.emit("stop typing", selectedChat._id);
//       }
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setNewMessage("");
//         const { data } = await axios.post(
//           MessageSend,
//           {
//             content: newMessage,
//             chatId: selectedChat,
//             user: user,
//           },
//           config
//         );
//         console.log(data);
//         socket.emit("new message", data);
//         // console.log("happening");
//         setMessages([...messages, data]);
//       } catch (error) {
//         console.log(error);
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on("message received", (newMessageReceived) => {
//         if (
//           !selectedChatCompare ||
//           selectedChatCompare._id !== newMessageReceived.chat._id
//         ) {
//           if (!notification.includes(newMessageReceived)) {
//             setNotification([newMessageReceived, ...notification]);
//             setFetchAgain(!fetchAgain);
//           }
//         } else {
//           setMessages([...messages, newMessageReceived]);
//         }
//       });
//     }
//   }, [socket]);

//   // useEffect(() => {
//   //   if (user) {
//   //     socket = io(ENDPOINT);
//   //     // console.log(`usser ${user}`);
//   //     socket.emit("setup", user);
//   //     socket.on("connected", () => setSocketConnected(true));
//   //     socket.on("typing", () => setIsTyping(true));
//   //     socket.on("stop typing", () => setIsTyping(false));

//   //     socket.on("message recieved", (newMessageRecieved) => {
//   //       if (
//   //         !selectedChatCompare || // if chat is not selected or doesn't match current chat
//   //         selectedChatCompare._id !== newMessageRecieved.chat._id
//   //       ) {
//   //         if (!notification.includes(newMessageRecieved)) {
//   //           setNotification([newMessageRecieved, ...notification]);
//   //           setFetchAgain(!fetchAgain);
//   //         }
//   //       } else {
//   //         setMessages([...messages, newMessageRecieved]);
//   //       }
//   //     });
//   //   }
//   //   // eslint-disable-next-line
//   // }, []);

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat;
//     // eslint-disable-next-line
//   }, [selectedChat]);

//   // useEffect(() => {
//   //   socket.on("message recieved", (newMessageRecieved) => {
//   //     if (
//   //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
//   //       selectedChatCompare._id !== newMessageRecieved.chat._id
//   //     ) {
//   //       if (!notification.includes(newMessageRecieved)) {
//   //         setNotification([newMessageRecieved, ...notification]);
//   //         setFetchAgain(!fetchAgain);
//   //       }
//   //     } else {
//   //       setMessages([...messages, newMessageRecieved]);
//   //     }
//   //   });
//   // });

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             display="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               display={{ base: "flex", md: "none" }}
//               icon={<ArrowBackIcon />}
//               onClick={() => setSelectedChat("")}
//             />
//             {/* {messages &&
//               (!selectedChat.isGroupChat ? (
//                 <> */}
//             {/* {getSender(user, selectedChat.users)} */}
//             {/* {selectedChat} */}
//             {/* <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}
//                   /> */}
//             {/* </>
//               ) : ( */}
//             {/* <> */}
//             {/* {selectedChat.toUpperCase()} */}
//             <UpdateGroupChatModal
//             // fetchMessages={fetchMessages}
//             // fetchAgain={fetchAgain}
//             // setFetchAgain={setFetchAgain}
//             />
//             {/* </>
//               ))} */}
//           </Text>
//           <Box
//             display="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (
//               <div className="messages">
//                 <ScrollableChat messages={messages} />
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}
//               id="first-name"
//               isRequired
//               mt={3}
//             >
//               {istyping ? (
//                 <div>
//                   <Lottie
//                     options={defaultOptions}
//                     height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (
//                 <></>
//               )}
//               <Input
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (
//         // to get socket.io on same page
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           h="100%"
//         >
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;

import { useEffect, useState, useRef } from "react";
import { FormControl, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Lottie from "react-lottie";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { ChatState } from "../Context/Context";
import { getSender, getSenderFull } from "./Logic";
import animationData from "./typing.json";
import { MessageSend } from "../utils/APIroutes";
import "./styles.css";

const ENDPOINT = "http://localhost:8080"; // Update this if needed
var selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const socket = useRef(null);

  //*******************
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("test event", (data) => {
  //       console.log("Test event received:", data);
  //     });

  //     // Cleanup function
  //     return () => {
  //       socket.current.off("test event");
  //     };
  //   }
  // }, []);
  //*********************** */

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, notification, setNotification, selectedChat, setSelectedChat } =
    ChatState();

  useEffect(() => {
    console.log("ouside socket useffect");
    console.log(user);
    if (user) {
      socket.current = io(ENDPOINT);
      socket.current.emit("setup", user);
      socket.current.on("connected", () => {
        setSocketConnected(true);
        console.log("yup");
      });
      socket.current.on("typing", () => setIsTyping(true));
      socket.current.on("stop typing", () => setIsTyping(false));
    }

    // return () => {
    //   if (socket.current) {
    //     socket.current.disconnect();
    //   }
    // };
  }, [user]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${MessageSend}/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      if (socket.current) {
        console.log("joining");
        socket.current.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      if (socket.current) {
        socket.current.emit("stop typing", selectedChat._id);
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          MessageSend,
          {
            content: newMessage,
            chatId: selectedChat,
            user: user,
          },
          config
        );
        socket.current.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    console.log("outside of useefffect");
    console.log(socket.current);
    if (socketConnected && socket.current) {
      socket.current.on("message recieved", (newMessageRecieved) => {
        console.log("client listening to new message");
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notification.includes(newMessageRecieved)) {
            setNotification([newMessageRecieved, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      });
    }
    // if (socket.current.connected) {
    //   socket.current.on("message received", (newMessageReceived) => {
    //     console.log("client listening to new message");
    //     if (
    //       !selectedChatCompare ||
    //       selectedChatCompare._id !== newMessageReceived.chat._id
    //     ) {
    //       if (!notification.includes(newMessageReceived)) {
    //         setNotification([newMessageReceived, ...notification]);
    //         setFetchAgain(!fetchAgain);
    //       }
    //     } else {
    //       setMessages([...messages, newMessageReceived]);
    //     }
    //   });
    // }
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (selectedChat.isGroupChat ? (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ) : (
                <>
                  {getSender(user, selectedChat.users).toUpperCase()}
                  {/* <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  /> */}
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="yellow"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : null}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
