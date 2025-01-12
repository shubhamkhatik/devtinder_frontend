import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Provider } from "react-redux";
import RTKstore from "./utils/RTKstore";

function App() {
  return (
    <Provider store={RTKstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* child Route start */}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            {/* child Route close */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
