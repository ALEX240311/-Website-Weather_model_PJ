import { useState } from "react";
import "./styles.css";

function Login({ onLogin, onSwitchRegister }) {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result); 
        onLogin(result);
      } else {
        console.error("Failed to login:", await res.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center w-auto items-center p-6 m-6 text-lg">
      <form onSubmit={handleSubmit} className="flex flex-col p-5 m-3">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={formdata.username}
          className="my-4 rounded-lg w-96 h-20 pl-3"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={formdata.password}
          className="my-4 rounded-lg w-96 h-20 pl-3"
        />
        <button type="submit" className="my-3">Login</button>
      </form>
      <button onClick={onSwitchRegister}>Don't have a account?</button>
      <div></div>
    </div>
  );
}

export default Login;
