import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LogIn from "./pages/login/Login";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import AddFriend from "./components/addfriend/AddFriend";
import CommentPage from "./components/commentpage/CommentPage";

function App() {
  const { user } = useContext(AuthContext);
  // const [progress,setProgress]=useState(0);

  // const setProgressBar=(p)=>{

  //   setProgress(p);

  // };

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" element={user ? <Home /> : <Messenger />} /> */}
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <LogIn />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/all" element={!user ? <Navigate to="/"/>:<AddFriend/>}/>
        <Route
          exact
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger/>}
        />
        <Route
          exact
          path="/commentsection/:postId"
          element={!user ? <Navigate to="/" /> : <CommentPage/>}
        />
      </Switch>
    </Router>
  );
}

export default App;
