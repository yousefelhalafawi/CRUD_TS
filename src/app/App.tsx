import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorMe from "../components/error/error";

import styles from "./App.module.css";
import "./Scrollbar.css";

import Search from "../pages/users/searchUsers/Search";
import { Container } from "react-bootstrap";
import DefaultComponent from "../components/default/default";
import Home from "../pages/home/home";
import NavBar from "../components/navBar/navbar";
import SearchDepartments from "../pages/departments/searchDepartment/SearchDepartment";
import SearchProject from "../pages/projects/searchProject/SearchProject";
const App: React.FC = () => {
  return (
    <Container>
      <div className={styles.all}>
        <span className="container-fluid mt-3"></span>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<DefaultComponent />} />
            <Route path="/home/:token" element={<Home />} />
            <Route path="/home/" element={<Home />} />

            <Route path="/Usersearch" element={<Search />} />
            <Route path="/DepartmentSearch" element={<SearchDepartments />} />
            <Route path="/ProjectSearch" element={<SearchProject />} />

            <Route path="*" element={<ErrorMe />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
