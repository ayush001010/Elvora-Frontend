// src/admin/CreatePost.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../api/postApi.js";
import Loader from "../components/Loader";
import { Pencil } from "lucide-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "list",
    "bullet",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/posts/create",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-posts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Pencil className="text-yellow-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Create New Post</h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            <input
              type="text"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />

            <div className="quill-container">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                Publish Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
