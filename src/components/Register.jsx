import { useState } from "react";
import "./styles.css";

// eslint-disable-next-line react/prop-types
function Register({switchToLogin}) {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    city: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (res.ok) {
        switchToLogin();
      }else{
        console.error("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-auto p-6 m-6 text-lg">
      <form onSubmit={handleSubmit} className="flex flex-col p-5 m-3">
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formdata.username}
          onChange={handleChange}
          className="my-4 rounded-lg w-96 h-20 pl-3"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          className="my-4 rounded-lg w-96 h-20 pl-3"
        />
        <select
          name="city"
          value={formdata.city}
          onChange={handleChange}
        >
          <option value="">Select Your Location</option>
          <option value="hanoi">HA NOI</option>
          <option value="hochiminh">HO CHI MINH</option>
        </select>
        <button type="submit" className="my-3">Register</button>
      </form>
      <button onClick={switchToLogin}>have a account?</button>
    </div>
  );
}
export default Register;
