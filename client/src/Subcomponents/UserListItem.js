import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../Context/Context";

const UserListItem = ({ suser, handleFunction }) => {
  // const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      {/* <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      /> */}
      <Box>
        <Text>{suser.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {suser.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
