import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Seasons from "container/seasons/Seasons";


function App() {
  const navigate = useNavigate(); 

  return (
    <div className="bc-cl">
      <Routes>
        <>
          <Route path="products" exact element={<Seasons />} />  
        
          <Route path="/" element={<Navigate replace to="/products" />} />
        </>
      </Routes>
    </div>
  );
}

export default App;
