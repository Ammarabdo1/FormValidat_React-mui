import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Css/App.css";
import { FormValidate } from "./component/FormValidate";
import { UserPage } from "./component/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FormValidate />} />
          <Route path='/page' element={<UserPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
