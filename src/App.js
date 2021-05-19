import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TourTable from "./pages/TourTable/TourTable";
import Login from "./pages/Login/Login";
import { setAuthCheck, setProfileInfo } from "./redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Profile from "./pages/Profile/Profile";
import { setEvent, setEvents } from "./redux/actions/eventsAction";
import SignUp from "./pages/SignUp/SignUp";

import Test from "./components/test";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.auth);
  const authInfo = useSelector((state) => state.auth.authInfo);

  const name = useSelector((state) => state.auth.profileInfo.username);
  const events = useSelector((state) => state.events.events);
  const id = useSelector((state) => state.events.publicId);
  console.log(name, 13);
  console.log(events, 1111111);
  useEffect(() => {
    dispatch(setAuthCheck());
    dispatch(setProfileInfo());
    dispatch(setEvents());
    dispatch(setEvent(id));
  }, [dispatch, id]);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Navbar />
          <Switch>
            <Route path={`/${id}/table`} component={TourTable}></Route>
            <Route path="/login" component={Login}></Route>
            {/* <Route path={`/`} component={MainPage}></Route> */}
            <Route path={`/${id}`} component={MainPage}></Route>

            {/* <Route path={`/adminPanel`} component={SignUp}></Route> */}

            {isAuth ? (
              <Route
                path={`/profile/:${authInfo.username}`}
                component={Profile}
              ></Route>
            ) : (
              <Redirect to={`/${id}`}></Redirect>
            )}
            {authInfo.admin ? (
              <Route path={`/adminPanel`} component={SignUp}></Route>
            ) : (
              <Redirect to={`/${id}`}></Redirect>
            )}
            <Redirect from="/" to={`/${id}`}></Redirect>
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
