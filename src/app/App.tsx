// App.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ErrorMe from "../components/error/error";

import styles from "./App.module.css";
import "./Scrollbar.css";

import Search from "../pages/search/Search";
import { Container } from "react-bootstrap";
const App: React.FC = () => {
  return (
    <Container>
      <div className={styles.all}>
        <span className="container-fluid mt-3"></span>
        <BrowserRouter>
          <Routes>
            <Route path="/:token/:accessCode" element={<Search />} />
            <Route path="*" element={<ErrorMe />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
