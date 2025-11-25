//- import { useState } from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import TickerTape from "./components/TickerTape";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div>
      <TickerTape />
      <TopNav />
      <Quiz />
    </div>
  );
}

export default App;
