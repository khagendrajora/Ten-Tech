import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { API } from "../Config/config";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export const Nav = () => {
  const navigate = useNavigate();

  //   const handleLogout = () => {
  //     axios
  //       .post(`${API}/signout`)
  //       .then(() => {
  //         localStorage.removeItem("user");
  //         toast.success("Logout Successful");
  //         setTimeout(() => {
  //           navigate("/login");
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         console.error("Logout failed:", err);
  //         toast.error("Logout failed");
  //       });
  //   };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <nav className="navbar">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand ">
            Content Management System
          </Link>
          <button
            className="btn btn-primary me-3"
            onClick={() => {
              localStorage.removeItem("user");
              toast.success("Logout Successful");
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }}
          >
            Logout
          </button>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </>
  );
};
