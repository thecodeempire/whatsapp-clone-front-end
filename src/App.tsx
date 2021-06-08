import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Home from "./Home";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("token") == null);
  return auth ? <Auth setAuth={setAuth} /> : <Home setAuth={setAuth} />;
}

export default App;
