import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API } from "../Config/config";
import { FaTrash, FaPenAlt, FaBook } from "react-icons/fa";
import { Nav } from "../components/Nav";

export const Home = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/bloglist`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.log(err));
  });

  const Delete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the blog?"
    );
    if (confirmed) {
      axios
        .delete(`${API}/blogdelete/${id}`)
        .then((res) => {
          toast.success("Blog deleted");
          setBlog(blog.filter((i) => i._id !== id));
        })
        .catch((err) => {
          toast.error("failed to delete");
        });
    }
  };
  const Edit = (id) => {
    navigate(`/editblog/${id}`);
  };
  const Read = (id) => {
    navigate(`/blogdetail/${id}`);
  };
  const Add = () => {
    navigate("/addblog");
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />

      <Nav />

      <div className="item-list">
        <div className="data">
          <button className="btn-create" onClick={() => Add()}>
            Add Blog
          </button>
          <table className="table  table-bordered table-striped">
            <thead className="">
              <tr className="">
                <th>Title</th>
                <th>Content</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blog &&
                blog.map((blog, i) => (
                  <tr key={i}>
                    <td>{blog.title}</td>
                    <td>{blog.content}</td>
                    <td>{blog.date}</td>
                    <td>
                      {" "}
                      <img
                        src={`http://localhost:5000/uploads/${blog.image}`}
                        alt="Blog"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <div className="action">
                        <button
                          className="btn btn-primary"
                          onClick={() => Read(blog._id)}
                        >
                          <FaBook />
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => Edit(blog._id)}
                        >
                          <FaPenAlt />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => Delete(blog._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
