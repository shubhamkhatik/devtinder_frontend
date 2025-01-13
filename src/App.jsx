import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Provider } from "react-redux";
import RTKstore from "./utils/RTKstore";
import Body from "./components/Body";

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
          <Route path="*" element={<div>Page not found! 404</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
