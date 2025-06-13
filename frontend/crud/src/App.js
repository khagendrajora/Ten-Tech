import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import EditBlog from "./pages/EditBlog";
import BlogDetail from "./pages/BlogDetail";

import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AddBlog from "./pages/AddBlog";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/userdetail/:user_id" element={<UserDetail />} />
        <Route
          path="/editblog/:blog_id"
          element={user ? <EditBlog /> : <Navigate to="/" />}
        />
        <Route
          path="/blogdetail/:blog_id"
          element={user ? <BlogDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/addblog"
          element={user ? <AddBlog /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
