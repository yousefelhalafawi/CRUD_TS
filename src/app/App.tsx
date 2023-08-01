// App.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ErrorMe from "../components/error/error";

import styles from "./App.module.css";
import "./Scrollbar.css";

import Search from "../pages/search/Search";
const App: React.FC = () => {
  return (
    <div className={styles.all}>
      <span className="container-fluid mt-3"></span>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="*" element={<ErrorMe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
