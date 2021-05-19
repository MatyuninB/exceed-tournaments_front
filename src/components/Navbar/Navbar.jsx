import React, { useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";
import drop from "../../assets/drop.svg";
import { Link } from "react-router-dom";
import { setAuth } from "../../redux/actions/authAction";

import { useDispatch, useSelector } from "react-redux";
import {
  setEvent,
  setMainPage,
  
} from "../../redux/actions/eventsAction";
import logout from "../../assets/logout.svg";
const Navbar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const [dropDown, isDropDown] = useState(false);
  const isAuth = useSelector((state) => state.auth.auth);
  const name = useSelector((state) => state.auth.profileInfo.username);
  const authInfo = useSelector((state) => state.auth.authInfo);
  console.log(authInfo, 888);
  return (
    <>
      <div className="navbar">
        <div className="navbar__content">
          <div className="navbar__content_nav">
            <span onClick={() => isDropDown(!dropDown)}>
              EVENTS{" "}
              <img
                style={{
                  transform: dropDown ? "rotate(-90deg)" : "rotate(90deg)",
                }}
                src={drop}
                alt={drop}
              />{" "}
            </span>
          </div>
          <Link to="/">
            <img src={logo} alt={logo} />
          </Link>

          <div className="navbar__content_auth">
            <Link
              style={{ display: "flex", alignItems: "center" }}
              to={`/profile/${name}`}
            >
              {isAuth && (
                <span style={{ marginRight: "20px" }}>{authInfo.fullname}</span>
              )}
              {isAuth && (
                <img
                  style={{
                    width: "40px",
                    height: '40px',
                    borderRadius: "50%",
                    boxShadow:
                      "4px 0px 0px 0px #f7766b,-5px 0px 0px 0px #243a7e",
                  }}
                  src={authInfo.image}
                  alt={authInfo.image}
                ></img>
              )}
            </Link>
            {isAuth ? (
              <img
                src={logout}
                alt={logout}
                onClick={() => {
                  dispatch(setAuth(false));
                  localStorage.clear();
                }}
              ></img>
            ) : (
              <Link to="/login">
                <span>LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          dropDown
            ? "navbar__content_nav-dropdown vision"
            : "navbar__content_nav-dropdown"
        }
      >
        <div className="content">
          {events.map((item, index) => (
            <Link
              to={`/${item.publicID}`}
              onClick={() => {
                dispatch(setMainPage(item.publicID));
                dispatch(setEvent(item.publicID));
                isDropDown(false);
              }}
              style={{ color: "white" }}
            >
              <span>{item.title}</span>
            </Link>
          ))}
          {/* <span>2021</span>
          <span>2020</span>
          <span>2019</span>
          <span>2018</span> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
