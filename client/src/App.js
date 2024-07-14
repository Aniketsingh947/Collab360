// import Sidebar from "./sidebar";
// import Navbar from "./Navbar";
// import MNavabr from "./MNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import RoutingComponent from "./RoutingComponent";
import TNavbar from "./Pages/TNavbar";
import Calendar from "./Calendar";
import Chat from "./Pages/TeamChatpage";
import ChatProvider from "./Context/Context";
// import Modal from "./Subcomponents/Nextcomp";
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";

// import Calendar from "./Calendar";
import SignupForm from "./Auth/Signup";
import Login from "./Auth/Login";
import UserDashboard from "./Pages/Dashboard";
export default function App() {
  return (
    <>
      <NextUIProvider>
        <Router>
          <ChatProvider>
            <TNavbar>
              <Routes>
                <Route
                  path="/signup"
                  element={
                    <ChakraProvider>
                      <SignupForm />
                    </ChakraProvider>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ChakraProvider>
                      <Login />
                    </ChakraProvider>
                  }
                />
                <Route path="/" element={<Calendar />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route
                  path="/groups"
                  element={
                    <ChakraProvider>
                      <Chat />
                    </ChakraProvider>
                  }
                />
                {/* <Route path="/comp" element={<Modal />} /> */}
              </Routes>
            </TNavbar>
          </ChatProvider>
        </Router>
      </NextUIProvider>
    </>
  );
}
