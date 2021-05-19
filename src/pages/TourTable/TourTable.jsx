import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TourTable.scss";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import edit from "../../assets/edit.png";
import Modal from "@material-ui/core/Modal";
import github from "../../assets/github.png";
import Button from "../../components/Button/Button";
import { setEvent } from "../../redux/actions/eventsAction";
import { setAuthCheck } from "../../redux/actions/authAction";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    outline: "none",
    borderRadius: "25px",
    boxShadow: "0px 4px 0px 0px #f35f51",
  },
});
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    fontFamily: "Montserrat",
  };
}
const TourTable = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [marks, setMarks] = useState([]);
  const [tourInfo, setTourInfo] = useState([]);
  const [verdict, isVerdict] = useState(false);
  const [changeVerdict, isChangeVerdict] = useState(false);
  const [juriVerdict, setJuriVerdict] = useState({
    score: 1,
    comment: "good",
    id: "",
  });
  const [gitHub, setGitHub] = useState();
  const [git, isGit] = useState(false);
  const [status, isStatus] = useState(false);
  // const [aprove, isAprove] = useState();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([]);
  const [loader, isLoader] = useState(false);
  const [tournamentStatus, setTournamentStatus] = useState(true);
  const id = useSelector((state) => state.events.publicId);
  const authInfo = useSelector((state) => state.auth.authInfo);
  const classes = useStyles();

  const changeAprove = (aprove) => {
    axios
      .post(
        "https://dark-torch-268518.appspot.com/changeJobStatus",
        {
          publicID: id,
          gitURL: gitHub,
          status: aprove,
        },
        { headers: { auth: localStorage.getItem("token") } }
      )
      .then((res) => {
        dispatch(setEvent(id));
        setOpen(false);
        getTable();
      })
      .catch(function (err) {});
  };

  const assignTable = () => {
    axios
      .get(
        `https://dark-torch-268518.appspot.com/tournamentAssign?publicID=${id}`,
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(setEvent(id));
        getTable();
      })
      .catch(function (err) {});
  };

  const setVerdict = () => {
    axios
      .post(
        "https://dark-torch-268518.appspot.com/tornamentAddScore",

        {
          score: parseInt(juriVerdict.score),
          comment: juriVerdict.comment,
        },
        {
          headers: { auth: localStorage.getItem("token") },
          params: { id: juriVerdict.id, publicID: id },
        }
      )
      .then((res) => {
        dispatch(setEvent(id));
        setOpen(false);
        getTable();
      })
      .catch(function (err) {});
  };

  const changeVerdicted = () => {
    axios
      .post(
        "https://dark-torch-268518.appspot.com/changeScore",

        {
          score: parseInt(juriVerdict.score),
          comment: juriVerdict.comment,
        },
        {
          headers: { auth: localStorage.getItem("token") },
          params: { id: juriVerdict.id, publicID: id },
        }
      )
      .then((res) => {
        dispatch(setEvent(id));
        setOpen(false);
        getTable();
      })
      .catch(function (err) {});
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    isVerdict(false);
  };

  let arr = marks.filter((item) => {
    return item.name === authInfo.username;
  });

  const verdictItem = (
    <div style={modalStyle} className={classes.paper}>
      <div className="tableModal">
        <div className="tableModal__info">
          {arr.length >= 1 ? (
            <div style={{ width: "100%" }}>
              {arr.map((item, index) => (
                <div
                  style={{
                    border: "3px solid #243a7e",
                    borderRadius: "25px",
                    margin: "10px 25px",
                    padding: "25px",
                  }}
                >
                  <div className="modalContent">
                    <img
                      style={{
                        width: "60px",
                        height: '60px',
                        marginLeft: "5px",
                        borderRadius: "50%",
                        boxShadow:
                          "4px 0px 0px 0px #f7766b,-5px 0px 0px 0px #243a7e",
                      }}
                      src={item.image}
                      alt={item.image}
                    />
                    <span>{item.name}</span>
                    <span style={{ color: "#f35f51", fontWeight: "bold" }}>
                      {item.score} / 10
                    </span>
                  </div>
                  <span style={{ fontWeight: "bold" }}>
                    <h2>
                      {" "}
                      <i>{"{"}</i>
                      Comment
                      <i>{"} :"}</i>
                    </h2>{" "}
                    {item.comment}
                  </span>
                </div>
              ))}
              {changeVerdict && (
                <>
                  <h2>
                    {" "}
                    <i>{"{"}</i>
                    Comment
                    <i>{"} :"}</i>
                  </h2>
                  <input
                    value={juriVerdict.comment}
                    placeholder="comment"
                    onChange={(e) =>
                      setJuriVerdict({
                        ...juriVerdict,
                        comment: e.target.value,
                      })
                    }
                  />
                  <h2>
                    {" "}
                    <i>{"{"}</i>
                    Score
                    <i>{"} :"}</i>
                  </h2>
                  <select
                    value={juriVerdict.score}
                    onChange={(e) =>
                      setJuriVerdict({ ...juriVerdict, score: e.target.value })
                    }
                    name="select"
                  >
                    <option value={1}>1</option>
                    <option defaultValue value={2}>
                      2
                    </option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </>
              )}

              {!changeVerdict && (
                <Button
                  onClick={() => {
                    arr.map((item, index) => {
                      return setJuriVerdict({
                        ...juriVerdict,
                        score: item.score,
                        comment: item.comment,
                      });
                    });
                    isChangeVerdict(!changeVerdict);
                  }}
                  text="change verdict"
                ></Button>
              )}
              {changeVerdict && (
                <Button
                  onClick={() => {
                    isVerdict(false);
                    changeVerdicted();
                    isChangeVerdict(false);
                  }}
                  text="save"
                ></Button>
              )}
            </div>
          ) : (
            <div>
              <span style={{ display: "flex", alignItems: "center" }}>
                <h2>
                  {" "}
                  <i>{"{"}</i>
                  Verdict
                  <i>{"} :"}</i>
                </h2>
              </span>
              <h2>
                {" "}
                <i>{"{"}</i>
                Comment
                <i>{"}"}</i>
              </h2>
              <input
                value={juriVerdict.comment}
                placeholder="comment"
                onChange={(e) =>
                  setJuriVerdict({ ...juriVerdict, comment: e.target.value })
                }
              />
              <h2>
                {" "}
                <i>{"{"}</i>
                Score
                <i>{"} :"}</i>
              </h2>
              <select
                value={edit.office}
                onChange={(e) =>
                  setJuriVerdict({ ...juriVerdict, score: e.target.value })
                }
                name="select"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <Button onClick={() => setVerdict()} text="submit"></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {status ? (
        <div className="tableModal">
          <div className="tableModal__info">
            <span style={{ display: "flex", alignItems: "center" }}>
              <h2>
                {" "}
                <i>{"{"}</i>
                Name
                <i>{"} :"}</i>
              </h2>
              <span
                style={{
                  fontWeight: "bold",
                  marginTop: "3px",
                  textTransform: "uppercase",
                }}
              >
                {info.fullname}
              </span>
            </span>
            <span style={{ color: info.jobStatus ? "green" : "red" }}>
              {info.jobStatus ? "Aproved" : "Not aproved"}
            </span>
            {info.jobStatus && (
              <>
                <a
                  target="blank"
                  href={info.gitURL}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0px",
                  }}
                >
                  <img
                    style={{ width: "25px", marginRight: "15px" }}
                    src={github}
                    alt={github}
                  />
                  WATCH ON GITHUB
                </a>
              </>
            )}
            {tournamentStatus && info.userId === authInfo._id ? (
              <>
                {git ? (
                  <Button
                    onClick={() => {
                      isGit(!git);
                      changeAprove(true);
                    }}
                    text="save"
                  ></Button>
                ) : (
                  <Button
                    style={{ margin: "15px 0px" }}
                    onClick={() => {
                      isGit(!git);
                    }}
                    text="edit link github"
                  ></Button>
                )}

                {git && (
                  <input
                    value={gitHub}
                    placeholder="GitHub link"
                    onChange={(e) => setGitHub(e.target.value)}
                  />
                )}
                <Button
                  onClick={() => {
                    // isAprove(false);
                    changeAprove(false);
                  }}
                  text="cancel aprove"
                ></Button>
              </>
            ) : null}
          </div>
          <div className="modalHeader">
            <span
              style={{
                color: "#f35f51",
                fontWeight: "bold",
                paddingRight: "25px",
              }}
            >
              Score:
            </span>
          </div>
          {marks.map((item, index) => (
            <div
              style={{
                border: "3px solid #243a7e",
                borderRadius: "25px",
                margin: "10px 25px",
                padding: "25px",
              }}
            >
              <div className="modalContent">
                <img
                  style={{
                    width: "60px",
                    height: '60px',
                    marginLeft: "5px",
                    borderRadius: "50%",
                    boxShadow:
                      "4px 0px 0px 0px #f7766b,-5px 0px 0px 0px #243a7e",
                  }}
                  src={item.image}
                  alt={item.image}
                />
                <span>{item.name}</span>
                <span style={{ color: "#f35f51", fontWeight: "bold" }}>
                  {item.score} / 10
                </span>
              </div>
              <span style={{ fontWeight: "bold" }}>
                <h2>
                  {" "}
                  <i>{"{"}</i>
                  Comment
                  <i>{"} :"}</i>
                </h2>{" "}
                {item.comment}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span style={{ color: info.jobStatus ? "green" : "red" }}>
          {tournamentStatus && info.userId === authInfo._id ? (
            <div style={{ padding: "25px" }}>
              <Button
                onClick={() => {
                  changeAprove(true);
                }}
                text="aprove"
              ></Button>

              <input
                value={gitHub}
                placeholder="GitHub link"
                onChange={(e) => setGitHub(e.target.value)}
              />
            </div>
          ) : (
            <div className="tableModal">
              <div className="tableModal__info">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>
                    {" "}
                    <i>{"{"}</i>
                    Name
                    <i>{"} :"}</i>
                  </h2>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginTop: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {info.fullname}
                  </span>
                </span>
                <span style={{ color: info.jobStatus ? "green" : "red" }}>
                  {info.jobStatus ? "Aproved" : "Not aproved"}
                </span>
              </div>
            </div>
          )}
        </span>
      )}
    </div>
  );
  
  const getTable = () => {
    try {
      isLoader(true);
      axios
        .get(
          `https://dark-torch-268518.appspot.com/tornament?publicID=${id}`
        )
        .then((res) => {
          dispatch(setAuthCheck());
          setRows(res.data.users);
          setTourInfo(res.data.publicID);
          isLoader(false);
          setTournamentStatus(res.data.status);
        });
    } catch (e) {
      isLoader(true);
    }
  };
  useEffect(() => {
    getTable();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "50px",
      }}
      className="tourTable"
    >
      {loader ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: "15px",
            }}
          >
            {authInfo.tournaments &&
            authInfo.tournaments.findIndex((e) => e.publicID === tourInfo) <
              0 ? (
              <Button
                onClick={() => assignTable()}
                text="Assign tournament"
              ></Button>
            ) : null}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <i
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#c4efff",
                }}
              ></i>
              <span> - Your row</span>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              style={{ boxShadow: "0px 4px 0px 0px #f35f51" }}
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Avatar</TableCell>
                  <TableCell align="left">Office</TableCell>
                  <TableCell align="left">Score</TableCell>
                  <TableCell align="left">Status</TableCell>
                  {authInfo.role === "Juri" && (
                    <TableCell align="left">Verdict</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.sort((a, b) => {
                  if(b.userId === authInfo._id) return 1;
                  if(a.userId === authInfo._id) return -1;
                  if(a.score > b.score) {
                    return -1;
                  } else {
                    return 1;
                  }
                }).map((row, index) => (
                  <TableRow
                    style={{
                      backgroundColor: row.userId === authInfo._id && "#c4efff",
                    }}
                    key={row._id}
                  >
                    <TableCell component="th" scope="row">
                      {++index}
                    </TableCell>
                    <TableCell align="left">{row.fullname}</TableCell>
                    <TableCell align="left">
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          boxShadow:
                            "4px 0px 0px 0px #f7766b,-5px 0px 0px 0px #243a7e",
                        }}
                        src={row.image}
                        alt={row.image}
                      />
                    </TableCell>
                    <TableCell align="left">{row.office}</TableCell>
                    <TableCell align="left">{row.score} / 10</TableCell>
                    <TableCell align="left">
                      <div 
                        style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
                        onClick={() => {
                          handleOpen();
                          setMarks(row.marks);
                          setInfo(row);
                          isStatus(row.jobStatus);
                        }}
                      >
                        <span
                          style={{ cursor: "pointer" }}
                         
                        >
                          <span
                            style={{ color: row.jobStatus ? "green" : "red" }}
                          >
                            {row.jobStatus ? "Aproved" : "Not aproved"}
                          </span>
                        </span>
                        {row.userId === authInfo._id && tournamentStatus && <img style={{ width: "25px", cursor: "pointer" }} src={edit} alt='' />}
                      </div>
                    </TableCell>
                    {authInfo.office !== row.office &&
                      row.jobStatus &&
                      authInfo.role === "Juri" ? (
                        <TableCell align="right">
                          <img
                            onClick={() => {
                              isVerdict(true);
                              setMarks(row.marks);
                              handleOpen();
                              setJuriVerdict({
                                ...juriVerdict,
                                id: row.userId,
                              });
                            }}
                            style={{ width: "25px", cursor: "pointer" }}
                            src={edit}
                            alt={edit}
                          />
                        </TableCell>
                      )
                      : <TableCell />
                      }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {verdict ? verdictItem : body}
      </Modal>
    </div>
  );
};

export default TourTable;