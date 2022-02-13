import './App.css';
import CalculatorContainer from "./components/CalculatorButtons/CalculatorContainer";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(false)
  
  return (
    <div className={`main ${theme ? 'dark' : ''}`}>
      <div className="App">
        <h1>React Simple Calculator</h1>
        <CalculatorContainer />
        <div style={{display: "grid", placeItems: "center"}}>
          <button style={{width: "fit-content", padding: "1em 3em"}} onClick={() => setTheme((prevTheme) => !prevTheme)}>
            {theme ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;