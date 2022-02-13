import "./App.css";
import CalculatorContainer from "./components/Calculator/CalculatorContainer";
import { useState } from "react";

function App() {
	const [theme, setTheme] = useState(false);

	return (
		<div className={`main ${theme ? "dark" : ""}`}>
			<div className="App">
				<h1>Simple Calculator</h1>
				<CalculatorContainer />
				<div className="themeButtons">
					<button className="lightAndDarkThemeButtons" onClick={() => setTheme(false)}>
						Light
					</button>
					<button className="lightAndDarkThemeButtons" onClick={() => setTheme(true)}>
						Dark
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;