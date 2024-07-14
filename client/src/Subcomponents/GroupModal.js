import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { useState, useRef } from "react";
import axios from "axios";
import { ChatState } from "../Context/Context";
import UserBadgeItem from "./UserBadgeItem";
import { AllUserRoute, CreateGroup } from "../utils/APIroutes";
import UserListItem from "./UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const socket = useRef(null);
  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    console.log(query);
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${AllUserRoute}${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error("Failed to load search results:", error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log("Please fill all fields");
      return;
    }
    const usersIncludingCurrentUser = [...selectedUsers, user];
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        CreateGroup,
        {
          name: groupChatName,
          users: JSON.stringify(usersIncludingCurrentUser.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setSelectedUsers([]);
      // socket.current.emit("newgroup");
      // onClose();
      console.log("New Group Chat Created!");
    } catch (error) {
      console.error("Failed to create the chat:", error.response.data);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Group Chat
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="w-full flex flex-wrap">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </div>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    .filter((suser) => suser._id !== user._id)
                    .map((suser) => (
                      <UserListItem
                        key={suser._id}
                        suser={suser}
                        handleFunction={() => handleGroup(suser)}
                      />
                    ))
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Create Group
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
