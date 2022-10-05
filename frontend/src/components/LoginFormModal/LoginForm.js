import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../DemoUser";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log("DATA for login", data)
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
    <h2 className = "title">Log in</h2>
    <form onSubmit={handleSubmit} className = "formContainer">
      <div className = 'errors'>
        {errors.map((error, idx) => (
          <div>{error}</div>
        ))}
      </div>
      
        <input
        placeholder = "Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      
        
        <input
        placeholder = "Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      
      <button className = 'loginButton' type="submit">Log In</button>
      <DemoUser />
    </form>
    </>
  );
}

export default LoginForm;