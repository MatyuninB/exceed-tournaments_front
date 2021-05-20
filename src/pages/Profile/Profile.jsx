import React, { useEffect, useState } from "react";
import { setAuthCheck, setProfileInfo } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import axios from "axios";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.auth.profileInfo);
  const [editShow, isEditShow] = useState(false);
  const [file, setFile] = useState();
  const authInfo = useSelector((state) => state.auth.authInfo);
  const [image, setImage] = useState();
  const [error, setErr] = useState('');
  const [edit, setEdit] = useState({
    fullname: profileInfo.fullname,
    office: profileInfo.office,
  });

  const handleImage = (event) => {
    const formFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(formFile);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setFile(formFile);
  };

  const onImageSubmit = (image) => {
    const formData = new FormData();
    formData.append(image, image);
    axios
      .post("https://dark-torch-268518.appspot.com/editImage", formData, {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((res) => {
        dispatch(setAuthCheck());
        dispatch(setProfileInfo());
        setImage();
        setFile();
      })
      .catch((err) => console.log(err));
  };

  const sendEdit = () => {
    if(edit.fullname !== '') {
      axios
        .post(
          "http://exceed-tournaments.herokuapp.com/userUpdate",
          {
            fullname: edit.fullname,
            office: edit.office,
          },
          { headers: { auth: localStorage.getItem("token") } }
        )
        .then((res) => {
          isEditShow(false);
        })
        .catch(function (err) {});
    } else {
      setErr("Name can't be empty");
      const clear = () => {setErr('')};
      setTimeout(clear, 5000);
    }
  };

  useEffect(() => {
    dispatch(setProfileInfo());
  }, [dispatch, editShow]);

  return (
    <div className="profile">
      <div className="profile__left">
        <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: "250px",
              height: "250px",
              overflow: 'hidden',
              borderRadius: "50%",
              boxShadow: "4px 0px 0px 0px #f7766b,-5px 0px 0px 0px #243a7e",
              }}>
          <img
            style={{
              height: "250px",
            }}
            src={(image && image) || profileInfo.image}
            alt={(image && image) || profileInfo.image}
          />
        </div>
        <div className="profile__left_btns">
          {image && (
            <Button
              style={{ marginBottom: "25px" }}
              onClick={() => onImageSubmit(file)}
              text="save avatar"
            ></Button>
          )}
          {authInfo.admin ? (
            <Button
              to="/adminPanel"
              style={{ marginBottom: "25px" }}
              text="admin panel"
            ></Button>
          ) : null}
          <input
            type="file"
            id="input__file"
            onChange={(e) => handleImage(e)}
            style={{ display: "none" }}
          />
          {!image && <label htmlFor="input__file">change avatar</label>}
          {!editShow && (
            <Button
              style={{ marginRight: "15px" }}
              onClick={() => isEditShow(!editShow)}
              text="Edit profile"
            ></Button>
          )}
          {editShow && (
            <Button
              style={{ marginTop: "25px" }}
              onClick={() => sendEdit()}
              text="Save profile"
            ></Button>
          )}
        </div>
      </div>
      <div className="profile__right">
        <div className="profile__right-row">
          {error && <p style={{color: 'red'}}>{error}</p>}
          <h2>
            {" "}
            <i>{"{"}</i>
            Name
            <i>{"}"}</i>
          </h2>
          {editShow ? (
            <input
              value={edit.fullname}
              placeholder="Full Name"
              onChange={(e) => setEdit({ ...edit, fullname: e.target.value })}
            />
          ) : (
            <span>{profileInfo.fullname}</span>
          )}
        </div>
        <div className="profile__right-row">
          <h2>
            {" "}
            <i>{"{"}</i>
            Office
            <i>{"}"}</i>
          </h2>
          {/* {editShow ? (
            <select
              value={edit.office}
              onChange={(e) => setEdit({ ...edit, office: e.target.value })}
              name="select"
            >
              <option value="Греческая">Греческая</option>
              <option value="Александровская" selected>
                Александровская
              </option>
              <option value="Чехова">Чехова</option>
            </select>
          ) : (
            <span>{profileInfo.office}</span>
          )} */}
          <span>{profileInfo.office}</span>
        </div>
        <div className="profile__right-row">
          <h2>
            {" "}
            <i>{"{"}</i>
            Role
            <i>{"}"}</i>
          </h2>
          <span>{profileInfo.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
