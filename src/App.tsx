import Pokemon from "./modules/pokemon";
import "./App.css";
import Users from "./modules/users";

function App() {
  return (
    <div className="app-container">
      <Pokemon />
      <Users />
    </div>
  );
}

export default App;
