import "./styles.css";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [city, setCity] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  function handleSearch(input) {
    setCity(input);
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  useEffect(() => {
    if (user && user.city) {
      setCity(user.city);
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        {isLogin ? (
          <Login
            onLogin={handleLogin}
            onSwitchRegister={() => setIsLogin(false)}
          />
        ) : (
          <Register switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;

