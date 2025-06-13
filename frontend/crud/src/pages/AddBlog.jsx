import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API } from "../Config/config";
import "react-toastify/dist/ReactToastify.css";
import { Nav } from "../components/Nav";

const AddBlog = () => {
  const [blogData, setData] = useState({
    title: "",
    content: "",
    date: "",
    image: "",
  });
  const { title, content, date, image } = blogData;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setData({
      ...blogData,

      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("image", event.target.image.files[0]);

      const response = await axios.post(`${API}/addBlog`, formData, Config);
      if (response) {
        toast.success("Blog added successfully");
      } else {
        toast.error(response.error);
      }
      setData({
        title: "",
        content: "",
        date: "",
        image: "",
      });
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-right" />
      <Nav />
      <div className="uploaduser-container">
        <form
          className="upload-userForm"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
        >
          <h1 className="page-name">Add New Blog</h1>
          <div className="upload-userform">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Title of the blog"
              onChange={handleChange("title")}
              value={title}
            />
          </div>

          <div className="upload-userform">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              className="form-control"
              id="content"
              placeholder="Content of the blog"
              onChange={handleChange("content")}
              value={content}
            />
          </div>

          <div className="upload-userform">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              id="date"
              placeholder="Date of the blog"
              onChange={handleChange("date")}
              value={date}
            />
          </div>
          <div className="upload-userform">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="image"
              placeholder="Image of the blog"
              onChange={handleChange("image")}
            />
          </div>

          <button className="btn btn-primary mt-4" type="submit">
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
