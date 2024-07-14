// import React from "react";

// const UserProfile = ({ user, onUpdateProfile }) => {
//   return (
//     <div className="mr-auto max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
//       <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
//         <img
//           className="w-24 h-24 rounded-full object-cover"
//           src={user.profilePicture}
//           alt="Profile"
//         />
//         <div>
//           <h2 className="text-2xl font-semibold">{user.name}</h2>
//           <p className="text-gray-600">Email: {user.email}</p>
//           <p className="text-gray-600">Hiring Date: {user.hiringDate}</p>
//           <p className="text-gray-600">Roles: {user.roles.join(", ")}</p>
//           <button
//             onClick={onUpdateProfile}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
//           >
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OngoingProjects = ({ projects }) => {
//   return (
//     <div className="mx-auto bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-4">Ongoing Projects</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
//                 Project Name
//               </th>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
//                 Manager's Name
//               </th>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
//                 Completion Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
//                   {project.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
//                   {project.manager}
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
//                   {project.completionStatus}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const UserDashboard = () => {
//   const user = {
//     // profilePicture: 'https://via.placeholder.com/150',
//     name: "John Doe",
//     email: "johndoe@example.com",
//     hiringDate: "2021-05-10",
//     roles: ["Developer", "Team Lead"],
//   };

//   const projects = [
//     { name: "Project Alpha", manager: "Jane Smith", completionStatus: "70%" },
//     { name: "Project Beta", manager: "John Doe", completionStatus: "50%" },
//     // Add more projects as needed
//   ];

//   const handleUpdateProfile = () => {
//     // Handle profile update logic here
//     console.log("Update Profile button clicked");
//   };

//   return (
//     <div>
//       <UserProfile user={user} onUpdateProfile={handleUpdateProfile} />
//       <OngoingProjects projects={projects} />
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import UpdateProfileModal from "../Subcomponents/UpdateProfileModal";
import { Fetchproject } from "../utils/APIroutes";
import { ChatState } from "../Context/Context";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const UserProfile = ({ user, onUpdateProfile }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-6 mr-auto max-w-3xl border-t-4 border-blue-500">
      <div className="flex flex-col sm:flex-row items-center gap-4 ">
        <img
          className="w-24 h-24 rounded-full object-cover"
          // src={user.profilePicture}
          alt="Profile"
        />
        <div className="details text-center sm:text-left">
          <h2 className="text-2xl font-semibold ">{user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Hiring Date: </p>
          <p className="text-gray-600">Roles: </p>
          <UpdateProfileModal user={user} onUpdate={onUpdateProfile} />
        </div>
      </div>
    </div>
  );
};

const OngoingProjects = ({ projects }) => {
  return (
    <div className="mx-auto bg-white shadow-xl rounded-lg p-6 border-t-4 border-blue-500">
      <h2 className="text-2xl font-semibold mb-4">Ongoing Projects</h2>
      <div className="overflow-y-auto" style={{ maxHeight: "250px" }}>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Manager's Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Completion Status
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.groupName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.groupAdmin}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.completionStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [curuser, setCuruser] = useState({
    profilePicture: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    hiringDate: "2021-05-10",
    roles: ["Developer", "Team Lead"],
    token: "your-token-here", // Ensure this is set properly
  });
  const [project, setProject] = useState([]);
  const { user, setUser } = ChatState();
  const toast = useToast();
  const fetchproject = async () => {
    if (!user) return;
    console.log(user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${Fetchproject}`, config);
      console.log(data);
      setProject(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Project",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchproject();
  }, [user]);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    console.log(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  return (
    user && (
      <div>
        <UserProfile user={user} onUpdateProfile={handleUpdateProfile} />
        <OngoingProjects projects={project} />
      </div>
    )
  );
};

export default UserDashboard;
