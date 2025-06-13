import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../Config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Nav } from "../components/Nav";

const EditBlog = () => {
  const params = useParams();
  const id = params.blog_id;
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/blogdetail/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setDate(res.data.date);
        setExistingImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);

      if (image) {
        formData.append("image", image); // new image
      } else {
        formData.append("existingImage", existingImage); // fallback to old one
      }

      const response = await axios.put(`${API}/blogupdate/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        toast.success("Blog Updated Successfully");
        navi("/");
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <ToastContainer theme="colored" position="top-right" />
      <Nav />
      <div className="container">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="shadow p-3"
        >
          <h3 className="text-center text-muted">Update Blog</h3>
          <div className="mb-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="content">Content:</label>
            <textarea
              type="text"
              name="content"
              id="content"
              className="form-control"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {existingImage && (
              <img
                src={`http://localhost:5000/uploads/${existingImage}`}
                alt="Current"
                className="mt-2"
                style={{ width: "150px", borderRadius: "6px" }}
              />
            )}
          </div>

          <div className="mb-2">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
