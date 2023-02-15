import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button, Overlay, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import authService, { User } from "../../services/auth";
import lsLogin from "../../assets/loginLS/ls-login.png";
import { NavLink } from "react-router-dom";

const LoginButton = () => {
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getUser().then(setUser);
    document.addEventListener("auth", (e) =>
      setUser((e as CustomEvent).detail)
    );
  }, []);

  function onLogin() {
    // memorize the last URL when the login button was clicked
    sessionStorage.setItem("lastUrl", window.location.href);
  }

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const logout = async () => {
    await authService.logout();
    setUser(null);
    window.location.reload();
  };

  
    return (<div>{user ? (
        <>
          <OverlayTrigger
            trigger="click"
            key="profile"
            placement="bottom-end"
            overlay={
              <Popover
                id={"ProfilePopover"}
                className="border border-2 border-tertiary"
              >
                <Popover.Body className="text-center fs-6 px-4">
                    <p>
                        You are logged in as:
                        <br/>
                        {user.title} {user.name}
                    </p>
                  <p className="mt-4">
                    <NavLink to="/profile">View profile</NavLink>
                  </p>
                  <p className="mt-3">
                    <a
                      href="https://profile.aai.lifescience-ri.eu/profile"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Manage your<br/>LS Login Account
                    </a>
                    .
                  </p>
                  <Button
                    variant="secondary"
                    className="text-white mt-4"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </Popover.Body>
              </Popover>
            }
          >
            <button
              className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
              style={{
                borderRadius: "50%",
                width: "46px",
                height: "46px",
                marginTop: "-4px",
              }}
              title="Login"
              ref={target}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              onMouseDown={() => setShow(!show)}
              onClick={onLogin}
            >
              <div
                className="bg-quinary justify-content-center align-items-center d-flex text-tertiary"
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              >
                {user.name.split(" ").map((x) => x[0])}
              </div>
            </button>
          </OverlayTrigger>
          <Overlay target={target.current} show={show} placement="left">
            {(props) => (
              <Tooltip id="loggedintooltip" {...props}>
                You are logged in!
              </Tooltip>
            )}
          </Overlay>
        </>
      ) : (
        <>
          <OverlayTrigger
            trigger="click"
            key="login"
            placement="bottom-end"
            overlay={
              <Popover
                id={"LoginPopover"}
                className="border border-2 border-tertiary"
              >
                <Popover.Body className="fs-8 text-center">
                  <p>
                    You do not need an account to browse our datasets, but
                    if you wish to request or upload data, you must log in
                    via Life Science Login (LS Login).
                  </p>
                  <p>
                    LS Login lets you authenticate using your existing
                    accounts at third parties (your home university,
                    research institute or a commercial service) and link it
                    to your LS ID. Alternatively, you can also activate an
                    LS account with username and password.
                  </p>
                  <button className="p-0 border-0">
                    <img
                      src={lsLogin}
                      alt="LS Login"
                      width="200px"
                      onClick={() => authService.login()}
                    />
                  </button>
                </Popover.Body>
              </Popover>
            }
          >
            <button
              className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
              style={{
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                marginTop: "-3px",
              }}
              title="Login"
              ref={target}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              onMouseDown={() => setShow(!show)}
            >
              <div
                className="bg-primary justify-content-center align-items-center d-flex text-tertiary"
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="m-0"
                  transform="grow-3"
                />
              </div>
            </button>
          </OverlayTrigger>
          <Overlay target={target.current} show={show} placement="left">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Log In
              </Tooltip>
            )}
          </Overlay>
        </>
      )}</div>)
}

export default LoginButton
