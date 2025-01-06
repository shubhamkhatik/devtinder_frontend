import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path="/" element={<Feed/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/connections" element={<Connections/>} />
        <Route path="/requests" element={<Requests/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
