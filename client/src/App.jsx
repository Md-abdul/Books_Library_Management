import React from "react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <AllRoutes />
    </React.Fragment>
  );
}

export default App;
