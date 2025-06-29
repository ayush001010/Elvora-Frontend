import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import PostList from "./admin/PostList";
import CreatePost from "./admin/CreatePost";
import EditPage from "./admin/EditPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Listen to token changes from login/logout
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen to storage changes (even across tabs)
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Header />
      {/* Toastify Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/post-page" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:slug" element={<PostPage />} />

        {/* Protected Routes */}
        <Route path="/my-posts" element={token ? <PostList /> : <Navigate to="/login" />} />
        <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/edit/:slug" element={token ? <EditPage /> : <Navigate to="/login" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
