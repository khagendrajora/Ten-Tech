import { useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../Config/config";
import axios from "axios";

const BlogDetail = () => {
  const params = useParams();
  const id = params.blog_id;
  const [blog, setBlog] = useState();
  console.log(blog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/blogdetail/${id}`);
        setBlog(res.data);
      } catch (error) {
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <>
      <ToastContainer theme="colored" position="top-right" />
      <Nav />
      {blog && (
        <div className="blog-detail-container">
          <div className="blog-detail-card">
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-date">
              {new Date(blog.date).toLocaleDateString()}
            </p>
            <img
              src={`http://localhost:5000/uploads/${blog.image}`}
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-content">{blog.content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
