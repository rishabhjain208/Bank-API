import React from "react";
import "./App.css";
import BankList from "./components/BankList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bank API</h1>
        <BankList />
      </header>
    </div>
  );
}

export default App;
