import { Button } from "@material-ui/core";
import { createRef, useState } from "react";
import "./Auth.css";
import { register, login, forgotPassword } from "./services/auth";

interface IProps {
  setAuth: (val: boolean) => void;
}

function Auth({ setAuth }: IProps) {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [loginState, setLoginState] = useState<
    "Login" | "Register" | "Forgot Password"
  >("Login");
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const imageRef = createRef<HTMLInputElement>();

  function addError(err: string) {
    setErr(err);
    setIsLoading(false);
    setTimeout(() => {
      setErr("");
    }, 5000);
  }

  function auth() {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    const image = imageRef?.current?.value;
    const email = emailRef?.current?.value;

    if (
      username != null &&
      password != null &&
      username.length > 0 &&
      password.length > 0
    ) {
      if (loginState === "Login") {
        setIsLoading(true);
        login(username, password)
          .then((token) => {
            console.log(token);
            setAuth(false);
            setIsLoading(false);
          })
          .catch((error) => addError(error.message));
      } else if (loginState === "Register") {
        if (email != null && email.length > 0) {
          setIsLoading(true);
          register({ username, password, email, image })
            .then((token) => {
              console.log(token);
              setAuth(false);
            })
            .catch((error) => addError(error.message));
        } else {
          addError("Email cannot be empty");
        }
      } else {
        setIsLoading(true);
        forgotPassword(username, password)
          .then(() => {
            setIsLoading(false);
            setMessage("Success! Now. Go and check your email");
            setTimeout(() => setMessage(""), 100000);
          })
          .catch((err: Error) => addError(err.message));
      }
    } else {
      addError("Username or password cannot be empty");
    }
  }

  return (
    <div className="auth">
      <div className="auth__body">
        <h1 className="auth__header">{loginState}</h1>
        {isLoading && <p style={{ textAlign: "center" }}>Loading....</p>}
        <form className="auth__form">
          <p>
            <input type="text" ref={usernameRef} placeholder="Username.." />
          </p>
          {loginState === "Register" && (
            <>
              <p>
                <input type="email" ref={emailRef} placeholder="Email.." />
              </p>
              <p>
                <input type="text" ref={imageRef} placeholder="imageURL.." />
              </p>
            </>
          )}
          <p>
            <input
              type="password"
              ref={passwordRef}
              placeholder={
                loginState === "Login" ? "Password.." : "Forgot Password..."
              }
            />
          </p>
          <p>
            <Button color="primary" variant="contained" onClick={auth}>
              {loginState}
            </Button>
          </p>
        </form>

        {
          <b
            className="auth__footer"
            onClick={() =>
              setLoginState(loginState === "Login" ? "Register" : "Login")
            }
          >
            {loginState === "Login"
              ? "No Account? Register.."
              : "Already Have an Account? Login.."}
          </b>
        }
        {loginState === "Login" && (
          <p
            className="auth__footer"
            onClick={() => setLoginState("Forgot Password")}
          >
            Forgot Password
          </p>
        )}
        {message.length > 0 && <p>{message}</p>}
        {err.length ? <p className="auth__error">{err}</p> : null}
      </div>
    </div>
  );
}

export default Auth;
