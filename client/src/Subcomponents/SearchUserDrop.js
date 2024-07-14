import React from "react";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { AccesschatRoute } from "../utils/APIroutes";
import { ChatState } from "../Context/Context";

export default function SearchDropdown({
  searchResults,
  open,
  anchorEl,
  onClose,
}) {
  const { user, chats, setChats, setSelectedChat } = ChatState();
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      // setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        AccesschatRoute,
        { userId, user },
        config
      );
      console.log(data);
      console.log("searchuserDropaccessChat");

      if (!chats.find((c) => c._id === data._id)) {
        console.log("chat already there");
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      // setLoadingChat(false);
      onClose();
    } catch (error) {
      // toast({
      //   title: "Error fetching the chat",
      //   description: error.message,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };
  console.log(searchResults);
  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <MenuItem>No user found</MenuItem>;
    }

    return searchResults.map((user, index) => {
      // console.log(user); // Log each user
      return (
        <MenuItem key={index} onClick={() => accessChat(user._id)}>
          {user.name}
        </MenuItem>
      ); // Render user as MenuItem
    });
  };

  return (
    <Menu
      id="search-results-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {renderSearchResults()}
    </Menu>
  );
}
