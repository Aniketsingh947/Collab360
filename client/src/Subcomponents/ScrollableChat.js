import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Box, Text } from "@chakra-ui/layout";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
  isSameSenderMargin,
} from "./Logic";
import { ChatState } from "../Context/Context";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  // console.log(messages);
  // console.log("messages");

  return (
    <>
      {user ? (
        <>
          <ScrollableFeed>
            {messages &&
              messages.map((m, i) => (
                <div style={{ display: "flex" }} key={m._id}>
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <Tooltip
                      label={m.sender.name}
                      placement="bottom-start"
                      hasArrow
                    >
                      {/* <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={m.sender.name}
                        src={m.sender.pic}
                      /> */}
                    </Tooltip>
                  )}
                  <span
                    style={{
                      backgroundColor: `${
                        m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                      }`,
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                      borderRadius: "20px",
                      padding: "5px 15px",
                      maxWidth: "75%",
                    }}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
          </ScrollableFeed>
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

export default ScrollableChat;
