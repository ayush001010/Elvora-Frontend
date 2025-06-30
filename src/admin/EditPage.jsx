// src/pages/EditPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import axios from "../api/postApi.js";
import Loader from "../components/Loader";
import { Pencil } from "lucide-react";

const EditPage = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!quill) return;

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${slug}`);
        const { post } = data;

        setTitle(post.title);
        quill.root.innerHTML = post.content;
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, quill]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!quill) {
        setLoading(false);
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, [quill]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const content = quill.root.innerHTML;
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/posts/${slug}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-posts");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center justify-start px-4 py-10 space-y-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-md rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Pencil size={24} className="text-yellow-600" />
          <h1 className="text-2xl font-semibold">Edit Post</h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {error && (
              <p className="text-red-500 bg-red-100 border border-red-300 px-4 py-2 mb-4 rounded">
                {error}
              </p>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div ref={quillRef} style={{ height: 240 }} />
              </div>

              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                Update Post
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPage;
