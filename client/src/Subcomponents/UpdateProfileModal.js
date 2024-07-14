import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
} from "@nextui-org/react";
import axios from "axios";
import { Profileupdate } from "../utils/APIroutes";

const UpdateProfileModal = ({ user, onUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [loading, setLoading] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        Profileupdate,
        { name, email, profilePicture },
        config
      );
      onUpdate(data);
      setLoading(false);
      onOpenChange(false); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update profile:", error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Update Profile
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <div className="mt-4">
                  <Avatar src={profilePicture} size="lg" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="mt-2"
                  />
                </div>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="bordered"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
