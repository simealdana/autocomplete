import Pokemon from "./modules/pokemon";
import "./App.css";
import Users from "./modules/users";

function App() {
  return (
    <div className="app-container">
      <div>
        <h3>Pokemon AutoComplete:</h3>
        <p>Info from external API</p>
        <Pokemon />
      </div>

      <div className="autocomplete-container">
        <h3>Users Autocomplete:</h3>
        <p>Info from external API</p>
        <Users />
      </div>
    </div>
  );
}

export default App;
