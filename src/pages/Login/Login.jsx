import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./Login.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setAuthCheck } from "../../redux/actions/authAction";
const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const auth = (event) => {
    event.preventDefault();
    axios
      .post("https://dark-torch-268518.appspot.com/userLogin", {
        username: login.username,
        password: login.password,
      })
      .then((res) => {
        dispatch(setAuth(true));
        localStorage.setItem("token", res.data.token);
        dispatch(setAuthCheck());
        history.push("/");
      })
      .catch(function (err) {
        console.log("q");
      });
  };

  return (
    <div className="login">
      <h2>
        <i>{"{"}</i>
        Log In<i>{"}"}</i>
      </h2>
      <form className="form__login" onSubmit={(event) => auth(event)}>
        <input
          value={login.username}
          placeholder="login"
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />
        <input
          type="password"
          value={login.password}
          placeholder="password"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <Button type="submit" text="log in">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
