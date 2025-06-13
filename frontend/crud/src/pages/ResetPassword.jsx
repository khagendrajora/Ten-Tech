import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../Config/config";
import "react-toastify/dist/ReactToastify.css";
import { Nav } from "../components/Nav";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const params = useParams();
  const token = params.token;
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //reset password
    fetch(`${API}/resetpassword/${token}`, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error("failed to reset ");
          console.log(data.error);
        } else {
          setPassword("");
          toast.success("Password has been reset uccessfully");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Nav />
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <form className="shadow p-3">
              <h2 className="text-center text-muted">Reset Password</h2>
              <div className="mb-2">
                <label htmlfor="password">Password</label>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
