import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Meme from "./components/Meme.jsx";
import UserList from "./components/UserList.jsx";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.jsx";
import MemeList from "./components/MemeList/MemeList.jsx";
import MemeCard from "./components/MemeList/MemeCard.jsx";
import GenerateMemeButton from "./components/MemeList/GenerateMemeButton.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h2>MemeGen</h2>
      </div>
      <div className="card">
        <GenerateMemeButton />
        <MemeList />
        {/*<MemeGenerator />*/}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
