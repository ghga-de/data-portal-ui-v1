import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import authService, { fullName, User } from "../../services/auth";
import { fetchJson } from "../../utils/utils";

const USERS_URL = process.env.REACT_APP_SVC_USERS_URL;

/** User registration form */

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  let title: string = "";

  const postUserData = async () => {
    if (!user) return;
    const { lsId, name, email } = user;
    const userData = {
      ls_id: lsId, name, email,
      title: title || null
    };
    const response = await fetchJson(`${USERS_URL}`, "post", userData).catch(() => null);
    if (response && response.status === 201) {
      // TODO: should confirm that the user has been registered
      navigate("/profile");
      return;
    }
    alert("Could not register"); // TODO: nicer
    const lastUrl = sessionStorage.getItem("lastUrl");
    lastUrl ? window.location.href = lastUrl : navigate("/");
  };

  useEffect(() => {
    if (authService.user)
      setUser(authService.user);
    else
      authService.getUser().then(setUser);
  }, []);

  const handleTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    title = event.target.value;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    postUserData();
  };

  let content;
  if (user === undefined)
    content = "Loading user data...";
  else if (user === null) 
    content = <div style={{margin: "2em 0"}}>
        <Alert variant="danger">You are not logged in.</Alert>
      </div>;
  else
    content = (
      <div>
        <h1 style={{margin: "1em 0"}}>Welcome, {fullName(user)}!</h1>
        <p>Since you haven't used our data portal before,
          we ask you to confirm your user data and register with us.
        </p>
        <form onSubmit={handleSubmit}>
          <p>
            <label>Name:
            <input type="text" readOnly value={user.name} style={{width:"40em"}}/>
            </label>
          </p>
          <p>
            <label>E-Mail:
            <input type="text" readOnly value={user.email} style={{width:"40em"}}/>
            </label>
          </p>
          <p>
            <label>LifeScience ID:
            <input type="text" readOnly value={user.lsId} style={{width:"40em"}}/>
            </label>
          </p>
          <p>
            <label>Academic title:
            <select onChange={handleTitle}>
              <option value=""></option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
            </label>
          </p>
          <p>
            <input type="submit" value="Register" />
          </p>
        </form>
      </div>);

  return <Container className="mt-4"><Row><Col>{content}</Col></Row></Container>;
};

export default Register;
