import { Button } from "@material-ui/core";
import { createRef, useState } from "react";
import "./Auth.css";
import { register, login } from "./services/auth";

interface IProps {
  setAuth: (val: boolean) => void;
}

function Auth({ setAuth }: IProps) {
  const [err, setErr] = useState("");
  const [isLogin, setLogin] = useState(true);
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  function addError(err: string) {
    setErr(err);
    setTimeout(() => {
      setErr("");
    }, 5000);
  }

  function auth() {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    if (
      username != null &&
      password != null &&
      username.length > 0 &&
      password.length > 0
    ) {
      if (isLogin) {
        login(username, password)
          .then((token) => {
            console.log(token);
            setAuth(false);
          })
          .catch((error) => addError(error.message));
      } else {
        register(username, password)
          .then((token) => {
            console.log(token);
            setAuth(false);
          })
          .catch((error) => addError(error.message));
      }
    } else {
      addError("Username or password cannot be empty");
    }
  }

  return (
    <div className="auth">
      <div className="auth__body">
        <h1 className="auth__header">{isLogin ? "Login" : "Register"}</h1>
        <form className="auth__form">
          <p>
            <input type="text" ref={usernameRef} placeholder="Username.." />
          </p>
          <p>
            <input type="password" ref={passwordRef} placeholder="Password.." />
          </p>
          <p>
            <Button color="primary" variant="contained" onClick={auth}>{isLogin ? "Login" : "Register"}</Button>
          </p>
        </form>
        <b className="auth__footer" onClick={() => setLogin(!isLogin)}>
          {isLogin
            ? "No Account? Register.."
            : "Already Have an Account? Login.."}
        </b>
        {err.length ? <p className="auth__error">{err}</p> : null}
      </div>
    </div>
  );
}

export default Auth;
