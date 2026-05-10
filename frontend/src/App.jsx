import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="/register"
            element={user ? <Home /> : <Register />}
          ></Route>
          <Route path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route path="/create" element={user ? <Create /> : <Login />}></Route>
          <Route path="/posts/:id" element={<Show />}></Route>
          <Route
            path="/posts/edit/:id"
            element={user ? <Update /> : <Login />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
