import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@nextui-org/react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className="bg-purple-600 w-fit m-1 rounded-md p-1"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon />
    </div>
  );
};

export default UserBadgeItem;
