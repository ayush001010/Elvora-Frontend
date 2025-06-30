// src/admin/PostList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/postApi.js";
import Loader from "../components/Loader";

import { Edit3, Trash2, Eye } from "lucide-react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/posts/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts || []);
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/posts/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-[#fdfaf6] h-screen max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Blog Posts</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white border border-black shadow-md rounded-lg p-4"
            >
              <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-4">
                <Link
                  to={`/edit/${post.slug}`}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Edit3 size={16} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 size={16} /> Delete
                </button>
                <Link
                  to={`/posts/${post.slug}`}
                  className="flex items-center gap-1 text-green-600 hover:underline"
                >
                  <Eye size={16} /> View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
